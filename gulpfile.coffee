#!/usr/bin/env coffee

# region header

camelize = require 'camelize'
gulpPlugins = require('gulp-load-plugins')()
for pluginName in ['gulp', 'event-stream', 'streamqueue', 'path']
    global[camelize pluginName] = require pluginName

errorHandler = (error) ->
    # Output an error message
    gulpPlugins.util.log gulpPlugins.util.colors.red(
        'Error (' + error.plugin + '): ' + error.message)
    # Emit the end event, to properly end the task.
    this.emit 'end'
nativeGulpSRC = gulp.src
gulp.src = ->
    nativeGulpSRC.apply(gulp, arguments)
    .pipe gulpPlugins.plumber errorHandler

# endregion

# region configuration

ROOT_PATH = './'
CONFIGURATION =
    rootPath: ROOT_PATH
    distributionPath: ROOT_PATH + 'build/'
    jade: compile_debug: false, debug: false, pretty: false
    coffee: {}
    htmlMinifier:
        caseSensitive: false, collapseBooleanAttributes: true
        collapseWhitespace: false, conservativeCollapse: true
        keepClosingSlash: false, minifyCSS: true, minifyJS: true
        minifyURLs: true, preserveLineBreaks: true
        preventAttributesEscaping: false, removeAttributeQuotes: true
        removeCDATASectionsFromCDATA: true, removeComments: true
        removeCommentsFromCDATA: true, removeEmptyAttributes: true
        removeEmptyElements: false, removeIgnored: true
        removeOptionalTags: true, removeRedundantAttributes: true
        removeScriptTypeAttributes: true, removeStyleLinkTypeAttributes: true
        useShortDoctype: true
    prettyData: preserve_comments: false, type: 'minify'
    uglify:
        compress:
            booleans: true, cascade: true, comparisons: true
            conditionals: true, dead_code: true, drop_debugger: true
            evaluate: true, global_defs: {}, hoist_funs: true
            hoist_vars: false, if_return: true, join_vars: true, loops: true
            properties: true, sequences: true, side_effects: true
            unsafe: false, unused: true, warnings: false
        mangle: true
    minifyCss:
        advanced: true, aggressive_merging: true, compatibility: 'ie8'
        keep_breaks: false, keep_special_comments: 0, media_merging: true
        process_import: true, relative_to: ROOT_PATH, restructuring: true
        root: ROOT_PATH, rounding_precision: -1, shorthand_compacting: true
        target: ROOT_PATH
    sass: paths: [ROOT_PATH]
    less: paths: [ROOT_PATH]
    hash:
        build_dir: ROOT_PATH, src_path: ROOT_PATH, verbose: true
        query_name: 'md5', hash: 'md5', exts: [
            '.jpg', '.jpeg', '.png', '.svg', '.ico', '.gif', '.tiff', '.bmp'
            '.webp', '.midi', '.mpeg', '.ogg', '.m4a', '.webm', '.3gpp'
            '.mp2t', '.mp4', '.mpeg', '.mov', '.qt', '.flv', '.m4v', '.mng'
            '.asf', '.wmv', '.woff', '.woff2', '.eot', '.ttf', '.java', '.zip'
            '.rar', '.7z', '.txt', '.html', '.css', '.pdf', '.rtf', '.ps'
            '.doc', '.docx', '.js', '.pl', '.py', '.xml', '.csv', '.json'
            '.kml'
        ]
    assetLocations:
        cascadingStyleSheet: []
        sass: []
        less: ['less/documentation-1.0.less']
        # TODO define ordering!
        javaScript: ['javaScript/**/*.js']
        coffeeScript: ['coffeeScript/**/*.coffee']
        jade: ['*.jade']
        html: ['*.html']
        data: ['data/**/*.@(json|xml)']
        image: ['image/**']
CONFIGURATION.hashHTML = CONFIGURATION.hash
CONFIGURATION.hashHTML.regex = ///
    (href|src)\s*=\s*(?:
        (")([^"]*)
        |
        (')([^']*)
        |
        ([^'"\s>]+)
    )
    |
    url\s*\((
        ?:(")([^"]+)
        |
        (')([^']+)
        |
        ([^'"\)]+)
    )
    |
    (["']?templateurl["']?:\s*["'])([^"']+)
///ig
CONFIGURATION.hashHTML.analyze = (match) ->
    quote = match[2] or match[4] or match[7] or match[9] or ''
    link = match[3] or match[5] or match[6]
    if link
        # "href" or "src" match
        return {
            prefix: "#{match[1]}=#{quote}"
            link: link
            suffix: ''
        }
    if match[12] and match[13]
        # "templateUrl" match
        return {
            prefix: match[12]
            link: match[13]
            suffix: ''
        }
    # css matches are implemented as fallback
    return {
        prefix: "url(#{quote}"
        link: match[8] or match[10] or match[11]
        suffix: ''
    }

# endregion

# region converter

html = (source) ->
    (if Object.prototype.toString.call(
        source
    ) is '[object Object]' then source else gulp.src source)
jade = (source) ->
    (if Object.prototype.toString.call(
        source
    ) is '[object Object]' then source else gulp.src source)
    .pipe gulpPlugins.jade CONFIGURATION.jade
cascadingStyleSheet = (source) ->
    (if Object.prototype.toString.call(
        source
    ) is '[object Object]' then source else gulp.src source)
sass = (source) ->
    (if Object.prototype.toString.call(
        source
    ) is '[object Object]' then source else gulp.src source)
    .pipe(gulpPlugins.sass CONFIGURATION.sass)
less = (source) ->
    (if Object.prototype.toString.call(
        source
    ) is '[object Object]' then source else gulp.src source)
    .pipe gulpPlugins.less CONFIGURATION.less
javaScript = (source) ->
    (if Object.prototype.toString.call(
        source
    ) is '[object Object]' then source else gulp.src source)
coffeeScript = (source) ->
    (if Object.prototype.toString.call(
        source
    ) is '[object Object]' then source else gulp.src source)
    .pipe gulpPlugins.coffee CONFIGURATION.coffee

# endregion

# region tasks

toData = (destination) ->
    gulp.src(CONFIGURATION.assetLocations.data)
    .pipe(gulpPlugins.size showFiles: true)
    .pipe(gulpPlugins.prettyData CONFIGURATION.prettyData)
    .pipe(gulpPlugins.replace /^(\)]}',)/, '$1\n')
    .pipe(gulpPlugins.size showFiles: true)
    .pipe gulpPlugins.if destination?, gulp.dest(
        destination or CONFIGURATION.rootPath)
gulp.task 'data', -> toData CONFIGURATION.distributionPath
toCascadingStyleSheet = (destination) ->
    streamqueue(
        {objectMode: true}
        cascadingStyleSheet CONFIGURATION.assetLocations.cascadingStyleSheet
        sass CONFIGURATION.assetLocations.sass
        less CONFIGURATION.assetLocations.less
    )
    .on('error', ->)
    .pipe(gulpPlugins.concat 'main.css')
    .pipe(gulpPlugins.size showFiles: true)
    .pipe(gulpPlugins.minifyCss CONFIGURATION.minifyCss)
    .pipe(gulpPlugins.hashSrc CONFIGURATION.hash)
    .pipe(gulpPlugins.size showFiles: true)
    .pipe gulpPlugins.if destination?, gulp.dest(
        destination or CONFIGURATION.rootPath)
gulp.task 'cascadingStyleSheet', -> toCascadingStyleSheet(
    CONFIGURATION.distributionPath + 'cascadingStyleSheet/')
toJavaScript = (destination) ->
    streamqueue(
        {objectMode: true}
        javaScript CONFIGURATION.assetLocations.javaScript
        coffeeScript CONFIGURATION.assetLocations.coffeeScript)
    .on('error', ->)
    .pipe(gulpPlugins.ngAnnotate())
    .pipe(gulpPlugins.concat 'main.js')
    .pipe(gulpPlugins.size showFiles: true)
    .pipe(gulpPlugins.uglify CONFIGURATION.uglify)
    .pipe(gulpPlugins.size showFiles: true)
    .pipe gulpPlugins.if destination?, gulp.dest(
        destination or CONFIGURATION.rootPath)
gulp.task 'javaScript', -> toJavaScript(
    CONFIGURATION.distributionPath + 'javaScript/')
toHTML = (destination) ->
    streamqueue(
        {objectMode: true}
        html CONFIGURATION.assetLocations.html
        jade CONFIGURATION.assetLocations.jade)
    .on('error', ->)
    .pipe(gulpPlugins.size showFiles: true)
    .pipe(gulpPlugins.htmlMinifier(CONFIGURATION.htmlMinifier))
    .pipe(gulpPlugins.hashSrc CONFIGURATION.hashHTML)
    .pipe(gulpPlugins.size showFiles: true)
    .pipe gulpPlugins.if destination?, gulp.dest(
        destination or CONFIGURATION.rootPath)
gulp.task 'html', -> toHTML CONFIGURATION.distributionPath

gulp.task 'default', ['html', 'javaScript', 'cascadingStyleSheet', 'data']

# endregion

# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion
