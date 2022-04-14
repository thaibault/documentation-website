// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module deploy */
'use strict'
/* !
    region header
    [Project page](https://torben.website/website-utilities)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {execSync} from 'child_process'
import Tools from 'clientnode'
import {createReadStream, createWriteStream} from 'fs'
import {marked} from 'marked'
import {basename, resolve} from 'path'
import pygmentize from 'pygmentize-bundled'
import {createGunzip} from 'zlib'
// endregion
marked.use({
    // A prefix url for any relative link.
    baseUrl: '',
    // If true, add <br> on a single line break (copies GitHub behavior on
    // comments, but not on rendered markdown files). Requires gfm be true.
    breaks: false,
    // If true, use approved GitHub Flavored Markdown (GFM) specification.
    gfm: true,
    // If true, include an id attribute when emitting headings (h1, h2, h3,
    // etc).
    headerIds: true,
    // A string to prefix the id attribute when emitting headings (h1, h2, h3,
    // etc).
    headerPrefix: 'doc-',
    // A function to highlight code blocks, see Asynchronous highlighting.
    highlight: (
        code:string,
        language:string,
        callback:(error?:Error, result:string) => void
    ) => {
        pygmentize(
           {lang: language, format: 'html'},
           code,
           (error?:Error, result:unknown):void => {
               callback(error, result.toString())
           }
        )
    },
    // A string to prefix the className in a <code> block. Useful for syntax
    // highlighting.
    langPrefix: 'language-',
    // If true, autolinked email address is escaped with HTML character
    // references.
    mangle: true,
    // If true, conform to the original markdown.pl as much as possible. Don't
    // fix original markdown bugs or behavior. Turns off and overrides gfm.
    pedantic: false,
    // An object containing functions to render tokens to HTML. See
    // extensibility for more details.
    // // renderer: new Renderer(),
    // A function to sanitize the HTML passed into markdownString.
    sanitizer: null,
    // If true, the parser does not throw any exception.
    silent: false,
    // If true, use smarter list behavior than those found in markdown.pl.
    smartLists: true,
    // If true, use "smart" typographic punctuation for things like quotes and
    // dashes.
    smartypants: true,
    // An object containing functions to create tokens from markdown. See
    // extensibility for more details.
    // tokenizer: new Tokenizer(),
    // A function which is called for every token. See extensibility for more
    // details.
    walkTokens: null,
    // If true, emit self-closing HTML tags for void elements (<br/>, <img/>,
    // etc.) with a "/" as required by XHTML.
    xhtml: true
})

const run = (command:string, options = {}):string =>
    execSync(command, {encoding: 'utf-8', shell: '/bin/bash', ...options})

// region globals
/// region locations
const DOCUMENTATION_BUILD_PATH = 'build/'
const DATA_PATH = 'data/'
const API_DOCUMENTATION_PATHS = ['apiDocumentation/', '/api/']
let API_DOCUMENTATION_PATH_SUFFIX = '${name}/${version}/'
const DISTRIBUTION_BUNDLE_FILE_PATH = `${DATA_PATH}distributionBundle.zip`
const DISTRIBUTION_BUNDLE_DIRECTORY_PATH = `${DATA_PATH}distributionBundle`
/// endregion
const BUILD_DOCUMENTATION_PAGE_COMMAND = [
    '/usr/bin/env', 'yarn', 'build', '${parameterFilePath}'
]
const BUILD_DOCUMENTATION_PAGE_PARAMETER_TEMPLATE =
    '{{' +
    'module:{{preprocessor:{{ejs:{{options:{{locals:{serializedParameter}}}}}}}}},' +
    /*
        NOTE: We habe to disable offline features since the domains cache is
        already in use for the main home page.
    */
    'offline:null' +
    '}}'
const CONTENT = ''
const DOCUMENTATION_REPOSITORY = 'git@github.com:"thaibault/documentationWebsite"'
const MARKDOWN_EXTENSIONS = [
    'toc',
    'codehilite',
    'extra',
    'headerid',
    'meta',
    'sane_lists',
    'wikilinks',
    'nl2br'
]
const PROJECT_PAGE_COMMIT_MESSAGE = 'Update project homepage content.'
let SCOPE = {name: '__dummy__', version: '1.0.0'}
// endregion

if (
    run('git branch').includes('* master') && 
    run('git branch --all').includes('gh-pages')
) {
    try {
        SCOPE = require('./package.json')
    } catch (error) {
        // Use default scope.
    }

    API_DOCUMENTATION_PATH_SUFFIX = Tools.stringEvaluate(
        API_DOCUMENTATION_PATH_SUFFIX, SCOPE
    ).result

    const temporaryDocumentationFolderPath = 'documentationWebsite'
    if (await Tools.isDirectory(temporaryDocumentationFolderPath))
        run(`rm --force --recursive '${temporaryDocumentationFolderPath}'`)

    console.info('Compile all readme markdown files to html.')

    for (const filePath of await Tools.walkDirectoryRecursively('./'))
        addReadme(filePath)

    CONTENT = marked.parse(CONTENT)

    distributionBundleFilePath = createDistributionBundleFile()
    if (await Tools.isFile(distributionBundleFilePath)) {
        run(`mkdir --parents '${DATA_PATH}'`)
        run(`mv '${distributionBundleFilePath' '${data_location}'`)
    }

    let hasAPIDocumentationCommand =
        SCOPE.scripts &&
        Object.prototype.hasOwnProperty.call(SCOPE.scripts, 'document')
    if (hasAPIDocumentationCommand)
        try {
            run('yarn document')
        } catch (error) {
            hasAPIDocumentationCommand = false
        }

    run('git checkout gh-pages')
    run('git pull')

    const apiDocumentationDirectoryPath = `.${API_DOCUMENTATION_PATHS[1]}`
    if (await Tools.isDirectory(apiDocumentationDirectoryPath))
        run(`rm --force --recursive '${apiDocumentationDirectoryPath}'`)

    run(
        `mv '${API_DOCUMENTATION_PATHS[0]}' '${apiDocumentationDirectoryPath}'`
    )

    const localDocumentationWebsitePath =
        `../${basename(temporaryDocumentationFolderPath)}`
    if (await Tools.isDirectory(localDocumentationWebsitePath)) {
        run(`mkdir --parents '${temporaryDocumentationFolderPath}'`)

        for (const filePath of await Tools.walkDirectoryRecursively(
            localDocumentationWebsitePath
        ))
            copyRepositoryFile(
                filePath, resolve(temporaryDocumentationFolderPath, filePath)
            )

        const nodeModulesDirectoryPath =
            resolve(localDocumentationWebsitePath, 'node_modules')
        if (await Tools.isDirectory(nodeModulesDirectoryPath)) {
            temporaryDocumentationNodeModulesDirectoryPath =
                resolve(temporaryDocumentationFolderPath, 'node_modules')
            /*
                We copy just recursively reference files.

                NOTE: Symlinking doesn't work since some node modules
                need the right absolute location to work.

                NOTE: Coping complete "node_modules" folder takes to
                long.

                NOTE: Mounting "node_modules" folder needs root
                privileges.
            */
            run(`
                cp
                --dereference
                --recursive
                --reflink=auto
                '${nodeModulesDirectoryPath}'
                '${temporaryDocumentationNodeModulesDirectoryPath}'
            `)
        } else:
            run('yarn --production=false')

        const currentWorkingDirectoryPathBackup = './'

        run('yarn clear', {cwd: temporaryDocumentationFolderPath})
    } else
        run(`
            unset GIT_WORK_TREE;
            git clone '${DOCUMENTATION_REPOSITORY}';
            yarn --production=false
        `)

    generateAndPushNewDocumentationPage(
        temporaryDocumentationFolderPath,
        distributionBundleFilePath,
        hasAPIDocumentation,
        temporaryDocumentationNodeModulesDirectoryPath
    )

    if (await Tools.isDirectory(existingAPIDocumentationDirectoryPath)
        run(`
            rm
                --force
                --recursively
                '${existingAPIDocumentationDirectoryPath}'
        `)
}

/**
 * Renders a new index.html file and copies new assets to generate a new
 * documentation homepage.
 */
const generateAndPushNewDocumentationPage(
    temporaryDocumentationFolderPath:string,
    distributionBundleFilePath:null|string,
    hasAPIDocumentation:boolean,
    temporaryDocumentationNodeModulesDirectoryPath:string
):void => {
    console.info('Update documentation design.')

    if (distributionBundleFilePath) {
        const newDistributionBundleFilePath =
            temporaryDocumentationFolderPath +
            DOCUMENTATION_BUILD_PATH +
            DISTRIBUTION_BUNDLE_FILE_PATH

        run(`mkdir --parents '${newDistributionBundleFilePath}'`)
        run(`
            mv
                '${distributionBundleFilePath}'
                '${newDistributionBundleFilePath}'`
        )

        const newDistributionBundleDirectoryPath =
            temporaryDocumentationFolderPath +
            DOCUMENTATION_BUILD_PATH +
            DISTRIBUTION_BUNDLE_DIRECTORY_PATH

        run(`mkdir --parents '${newDistributionBundleDirectoryPath}'`)

        createReadStream(distributionBundleFilePath)
            .pipe(createGunzip())
            .pipe(createWriteStream(newDistributionBundleDirectoryPath))
    }

    const faviconPath = 'favicon.png'
    if (await Tools.isFile(favicon))
        run(`
            cp
                '${faviconPath}'
                '${temporaryDocumentationFolderPath}/source/image/favicon.ico'
        `)

    const parameter:Mapping<unknown> = {}
    // TODO
    for (const key, value of Object.entries(SCOPE.documentationWebsite || {}))
        parameter = builtins.dict(builtins.map(lambda item: (
            String(item[0]).camel_case_to_delimited.content.upper(), item[1]
        ), SCOPE.get('documentationWebsite', {}).items()))
    if 'TAGLINE' not in parameter and 'description' in SCOPE:
        parameter['TAGLINE'] = SCOPE['description']
    if 'NAME' not in parameter and 'name' in SCOPE:
        parameter['NAME'] = SCOPE['name']

    console.debug(`Found parameter "${Tools.represent(parameter)}".`)

    api_documentation_path = None
    if has_api_documentation:
        api_documentation_path = '%s%s' % (
            API_DOCUMENTATION_PATH[1], API_DOCUMENTATION_PATH_SUFFIX)
        if not FileHandler(location='%s%s' % (
            FileHandler().path, api_documentation_path
        )).is_directory():
            api_documentation_path = API_DOCUMENTATION_PATH[1]
    parameter.update({
        'CONTENT': CONTENT,
        'CONTENT_FILE_PATH': None,
        'RENDER_CONTENT': False,
        'API_DOCUMENTATION_PATH': api_documentation_path,
        'DISTRIBUTION_BUNDLE_FILE_PATH': DISTRIBUTION_BUNDLE_FILE_PATH if (
            distribution_bundle_file and
            distribution_bundle_file.is_file()
        ) else None
    })
# # python3.5
# #     parameter = Dictionary(parameter).convert(
# #         value_wrapper=lambda key, value: value.replace(
# #             '!', '#%%%#'
# #         ) if builtins.isinstance(value, builtins.str) else value
# #     ).content
    parameter = Dictionary(parameter).convert(
        value_wrapper=lambda key, value: value.replace(
            '!', '#%%%#'
        ) if builtins.isinstance(value, builtins.unicode) else value
    ).content
# #
    if __logger__.isEnabledFor(logging.DEBUG):
        BUILD_DOCUMENTATION_PAGE_COMMAND = \
            BUILD_DOCUMENTATION_PAGE_COMMAND[:-1] + [
                '-debug'
            ] + BUILD_DOCUMENTATION_PAGE_COMMAND[-1:]
    serialized_parameter = json.dumps(parameter)
    parameter_file = FileHandler(location=make_secure_temporary_file('.json')[
        1])
    parameter_file.content = \
        BUILD_DOCUMENTATION_PAGE_PARAMETER_TEMPLATE.format(
            serializedParameter=serialized_parameter, **SCOPE)
    for index, command in builtins.enumerate(BUILD_DOCUMENTATION_PAGE_COMMAND):
        BUILD_DOCUMENTATION_PAGE_COMMAND[index] = \
            BUILD_DOCUMENTATION_PAGE_COMMAND[index].format(
                serializedParameter=serialized_parameter,
                parameterFilePath=parameter_file._path,
                **SCOPE)
    __logger__.debug('Use parameter "%s".', serialized_parameter)
    __logger__.info('Run "%s".', ' '.join(BUILD_DOCUMENTATION_PAGE_COMMAND))
    current_working_directory_backup = FileHandler()
    temporary_documentation_folder.change_working_directory()
    Platform.run(
        command=BUILD_DOCUMENTATION_PAGE_COMMAND[0],
        command_arguments=BUILD_DOCUMENTATION_PAGE_COMMAND[1:], error=False,
        log=True)
    current_working_directory_backup.change_working_directory()
    parameter_file.remove_file()
    for file in FileHandler():
        if not (file in (temporary_documentation_folder, FileHandler(
            location='.%s' % API_DOCUMENTATION_PATH[1]
        )) or is_file_ignored(file)):
            file.remove_deep()
    documentation_build_folder = FileHandler(location='%s%s' % (
        temporary_documentation_folder.path, DOCUMENTATION_BUILD_PATH
    ), must_exist=True)
    documentation_build_folder.iterate_directory(
        function=copy_repository_file, recursive=True,
        source=documentation_build_folder, target=FileHandler())
    if (Platform.run(
        "/usr/bin/env sudo umount '%s'" %
            temporary_documentation_node_modules_directory.path,
        native_shell=True, error=False, log=True
    )['return_code'] == 0):
        temporary_documentation_folder.remove_deep()
    Platform.run(
        (
            '/usr/bin/env git add --all',
            '/usr/bin/env git commit --message "%s" --all' %
                PROJECT_PAGE_COMMIT_MESSAGE,
            '/usr/bin/env git push',
            '/usr/bin/env git checkout master'
        ),
        native_shell=True,
        error=False,
        log=True
    )
}

@JointPoint
# # python3.5 def create_distribution_bundle_file() -> FileHandler:
def create_distribution_bundle_file():
    '''Creates a distribution bundle file as zip archiv.'''
    if not SCOPE['scripts'].get('build:export', SCOPE['scripts'].get(
        'build', False
    )) or Platform.run('/usr/bin/env yarn %s' % (
        'build:export' if SCOPE['scripts'].get('build:export') else 'build'
    ), error=False, log=True)['return_code'] == 0:
        __logger__.info('Pack to a zip archive.')
        distribution_bundle_file = FileHandler(
            location=make_secure_temporary_file()[1])
        current_directory_path = FileHandler()._path
        file_path_list = SCOPE.get('files', [])
        if 'main' in SCOPE:
            file_path_list.append(SCOPE['main'])
        if len(file_path_list) == 0:
            return None
        with zipfile.ZipFile(
            distribution_bundle_file.path, 'w'
        ) as zip_file:
            for file_path in file_path_list:
                file = FileHandler(location=file_path)
                __logger__.debug(
                    'Add "%s" to distribution bundle.', file.path)
                zip_file.write(file._path, file.name)
                if file.is_directory() and not is_file_ignored(file):
                    def add(sub_file):
                        if is_file_ignored(sub_file):
                            return None
                        __logger__.debug(
                            'Add "%s" to distribution bundle.', sub_file.path)
                        zip_file.write(sub_file._path, sub_file._path[len(
                            current_directory_path):])
                        return True
                    file.iterate_directory(function=add, recursive=True)
        return distribution_bundle_file


@JointPoint
# # python3.5 def is_file_ignored(file: FileHandler) -> builtins.bool:
def is_file_ignored(file):
    return (
        file.basename.startswith('.') or
        file.basename == 'dummyDocumentation' or
        file.is_directory() and file.name in [
            'node_modules', 'build', '__pycache__'
        ] or file.is_file() and (
            file.name in ['params.json'] or file.extension in ('pyc', 'pyo')))


@JointPoint
# # python3.5
# # def copy_repository_file(
# #     file: FileHandler, source:FileHandler, target: FileHandler: FileHandler
# # ) -> (builtins.bool, builtins.type(None)):
def copy_repository_file(file, source, target):
# #
    '''Copy the website documentation design repository.'''
    if not (is_file_ignored(file) or file.name == 'readme.md'):
        new_path = FileHandler(location='%s/%s' % (
            target.path,  file.path[builtins.len(source.path):]
        )).path
        __logger__.debug('Copy "%s" to "%s".', file.path, new_path)
        if file.is_file():
            file.copy(target=new_path)
        else:
            FileHandler(location=new_path, make_directory=True)
        return True


const add_readme = (filePath:string):boolean => {
    '''Merges all readme file.'''
    global CONTENT

    if not is_file_ignored(file):
        if file.basename == 'readme':
            __logger__.info('Handle "%s".', file.path)
            if CONTENT:
                CONTENT += '\n'
            CONTENT += file.content

        return True
}
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
