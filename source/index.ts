// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module documentation-website */
'use strict'
/* !
    region header
    [Project page](https://torben.website/documentationwebsite)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {
    camelCaseToDelimited, createDomNodes,
    extend, getText,
    globalContext,
    Logger,
    Mapping,
    NOOP,
    ProcedureFunction
} from 'clientnode'
import {func, object} from 'clientnode/property-types'
import {property} from 'web-component-wrapper/decorator'
import {WebComponentAPI} from 'web-component-wrapper/type'
import {Web} from 'web-component-wrapper/Web'

import {DefaultOptions, Options} from './type'
// endregion
// region declaration
declare const LANGUAGES: Array<string>
// endregion
export const log = new Logger({name: 'documentation-website'})
// region plugins/classes
/**
 * This plugin holds all needed methods to extend a whole documentation site.
 * @property _defaultOptions - Options extended by the options given to the
 * initializer method.
 * @property _defaultOptions.selectors - Object with a mapping of needed dom
 * node descriptions to their corresponding selectors.
 * @property _defaultOptions.showExample - Options object to configure code
 * example representation.
 * @property _defaultOptions.showExample.pattern - Regular expression to
 * introduce a code example section.
 * @property _defaultOptions.showExample.domNodeName - Dom node name to
 * indicate a declarative example section.
 * @property _defaultOptions.showExample.htmlWrapper - HTML example wrapper.
 * @property _defaultOptions.section - Configuration object for section
 * switches between the main page and legal notes descriptions.
 * @property options - Finally configured given options.
 */
export class WebDocumentation<
    TElement = HTMLElement,
    ExternalProperties extends Mapping<unknown> = Mapping<unknown>,
    InternalProperties extends Mapping<unknown> = Mapping<unknown>
> extends Web<TElement, ExternalProperties, InternalProperties> {
    static _name = 'WebDocumentation'

    static _defaultOptions: DefaultOptions = {
        selectors: {
            aboutThisWebsiteLink: 'a[href="#about-this-website"]',
            aboutThisWebsiteSection: '.section__about-this-website',

            codeWrapper: 'pre',
            code: 'code',

            homeLink: 'a[href="#home"]',
            mainSection: '.section__main',

            headlines:
                '.section__main h1, .section__main h2, ' +
                '.section__main h3, .section__main h4, ' +
                '.section__main h5, .section__main h6',
            tableOfContent: '.doc-toc',
            tableOfContentLinks: '.doc-toc ul li a[href^="#"]'
        },

        showExample: {
            domNodeName: '#comment',
            htmlWrapper: `
                <div class="show-example-wrapper">
                    <h3>
                        Example:
                        <!--deDE:Beispiel:-->
                        <!--frFR:Exemple:-->
                    </h3>
                </div>
            `,
            pattern: '^ *showExample(: *([^ ]+))? *$'
        }
    }

    readonly self = WebDocumentation

    // region domNodes
    aboutThisWebsiteLinkDomNodes: NodeListOf<HTMLElement> | null = null
    aboutThisWebsiteSectionDomNode: HTMLDivElement | null = null

    codeWrapperDomNodes: NodeListOf<HTMLElement> | null = null
    codeDomNodes: NodeListOf<HTMLElement> | null = null

    homeLinkDomNodes: NodeListOf<HTMLElement> | null = null
    mainSectionDomNode: HTMLElement | null = null

    headlineDomNodes: NodeListOf<HTMLElement> | null = null
    tableOfContentDomNode: HTMLElement | null = null
    tableOfContentLinkDomNodes: NodeListOf<HTMLAnchorElement> | null = null
    // endregion
    @property({type: object})
        options = {} as Options

    @property({type: func})
        onExamplesLoaded: ProcedureFunction = NOOP
    // region public
    /// region live-cycle
    /**
     * Defines dynamic getter and setter interface and resolves configuration
     * object. Initializes the map implementation.
     */
    constructor() {
        super()
        /*
            Babels property declaration transformation overwrites defined
            properties at the end of an implicit constructor. So we have to
            redefined them as long as we want to declare expected component
            interface properties to enable static type checks.
        */
        this.defineGetterAndSetterInterface()
    }
    /**
     * Triggered when ever a given attribute has changed and triggers to update
     * configured dom content.
     * @param name - Attribute name which was updates.
     * @param newValue - New updated value.
     */
    onUpdateAttribute(name: string, newValue: string) {
        super.onUpdateAttribute(name, newValue)

        if (name === 'options')
            this.options = extend<Options>(
                true,
                {} as Options,
                this.self._defaultOptions,
                this.options
            )
    }
    /**
     * Updates controlled dom elements.
     * @param reason - Why an update has been triggered.
     */
    async render(reason?: string): Promise<void> {
        await super.render(reason)

        if (Object.keys(this.options).length === 0)
            this.onUpdateAttribute('options', '{}')

        this.grabDomNodes()

        if (globalContext.location && !globalContext.location.hash)
            globalContext.location.hash =
                this.homeLinkDomNodes?.item(0)
                    .getAttribute('href') ?? ''

        if (this.aboutThisWebsiteSectionDomNode)
            this.aboutThisWebsiteSectionDomNode.style.display = 'none'

        /*
            NOTE: We have to render examples first to avoid having dots in
            example code.
        */
        this._showExamples()
        this._makeCodeEllipsis()

        this._generateTableOfContentsLinks()
    }
    /// endregion
    grabDomNodes(): void {
        this.aboutThisWebsiteLinkDomNodes = this.root.querySelectorAll(
            this.options.selectors.aboutThisWebsiteLink
        )
        this.aboutThisWebsiteSectionDomNode = this.root.querySelector(
            this.options.selectors.aboutThisWebsiteSection
        )

        this.codeWrapperDomNodes =
            this.root.querySelectorAll(this.options.selectors.codeWrapper)
        this.codeDomNodes =
            this.root.querySelectorAll(this.options.selectors.code)

        this.homeLinkDomNodes =
            this.root.querySelectorAll(this.options.selectors.homeLink)
        this.mainSectionDomNode =
            this.root.querySelector(this.options.selectors.mainSection)

        this.headlineDomNodes =
            this.root.querySelectorAll(this.options.selectors.headlines)
        this.tableOfContentDomNode =
            this.root.querySelector(this.options.selectors.tableOfContent)
    }
    // endregion
    // region protected methods
    /// region event handler
    /**
     * This method triggers if all examples loaded.
     * @returns Returns the current instance.
     */
    async _onExamplesLoaded(): Promise<void> {
        /*
            NOTE: After injecting new dom nodes we have to grab them for
            further controller logic.
        */
        this.grabDomNodes()

        // New injected dom nodes may take effect on language handler.
        if (
            this.startUpAnimationIsComplete &&
            this._activateLanguageSupport &&
            !this.languageHandler
        )
            this.languageHandler = (
                await $(this.$domNodes.parent as unknown as HTMLBodyElement)
                    .Internationalisation(this.options.language)
            ).data('Internationalisation') as Internationalisation
    }
    /**
     * This method triggers if we change the current section.
     * @param sectionName - New section which should be switched to.
     * @param event - Triggered event object.
     */
    _onSwitchSection(sectionName: string, event?: Event): void {
        const hashReference = `#${sectionName}`
        const $target = $(hashReference)
        if (sectionName && $target.length) {
            event?.preventDefault()

            const offset = $target.offset()
            if (offset)
                $('html, body')
                    .stop()
                    .animate(
                        {scrollTop: offset.top},
                        {
                            ...this.options.scrollToTop.options,
                            complete: () => {
                                if (window.location.hash !== hashReference)
                                    window.location.hash = hashReference
                            }
                        }
                    )
        } else
            this.scrollToTop()

        if (sectionName === 'about-this-website')
            this.$domNodes.mainSection.fadeOut(
                this.options.section.main.fadeOutOptions
            )
        else
            this.$domNodes.aboutThisWebsiteSection.fadeOut(
                this.options.section.aboutThisWebsite.fadeOutOptions
            )

        super._onSwitchSection(sectionName)
    }
    /**
     * This method triggers if all startup animations are ready.
     * @returns Promise resolving when language handler has been initialized.
     */
    async _onStartUpAnimationComplete(): Promise<void> {
        /*
            NOTE: We reference "Internationalisation" here to make sure that
            static tree shaking includes this module.
        */
        if (
            /* eslint-disable @typescript-eslint/no-unnecessary-condition */
            Internationalisation &&
            /* eslint-enable @typescript-eslint/no-unnecessary-condition */
            this._activateLanguageSupport &&
            !this.languageHandler
        )
            this.languageHandler = (
                await $(this.$domNodes.parent as unknown as HTMLBodyElement)
                    .Internationalisation(this.options.language)
            ).data('Internationalisation') as Internationalisation

        if ($.global.location)
            this.$domNodes.tableOfContentLinks
                .add(this.$domNodes.aboutThisWebsiteLink)
                .filter(
                    'a[href="' +
                    $.global.location.href.substring(
                        $.global.location.href.indexOf('#')
                    ) +
                    '"]'
                )
                .trigger('click')

        void super._onStartUpAnimationComplete()
    }
    /// endregion
    /**
     * Generates a table of contents via creating links referring to headlines.
     */
    _generateTableOfContentsLinks(): void {
        if (!this.tableOfContentDomNode)
            return

        let listItems = '<ul>'
        let level = 0
        let firstLevel = 0
        let first = true
        for (const domNode of this.headlineDomNodes ?? []) {
            if ($(domNode).closest('.show-example-wrapper').length)
                return

            const newLevel: number =
                parseInt(domNode.nodeName.replace(/\D/g, ''))

            if (first)
                firstLevel = newLevel

            if (newLevel > level)
                listItems += '<ul>'
            else if (newLevel < level)
                listItems += '</ul>'

            listItems += `
                <li>
                    <a href="#${domNode.getAttribute('id') ?? 'unknown'}">
                        ${domNode.innerText}
                    </a>
                </li>
            `

            level = newLevel
            first = false
        }
        // Close remaining inner lists.
        while (level < firstLevel) {
            listItems += '</ul>'
            level += 1
        }

        listItems += '</ul>'

        this.tableOfContentDomNode.append(listItems)

        this.tableOfContentLinkDomNodes =
            this.tableOfContentDomNode.querySelectorAll<HTMLAnchorElement>('a')

        this.tableOfContent.sytle.display = 'initial'
    }
    /**
     * This method makes dotes after code lines which are too long. This
     * prevents line wrapping.
     */
    _makeCodeEllipsis(): void {
        const lengthLimit = 89 // 79

        for (const domNode of this.codeDomNodes ?? []) {
            let newContent = ''
            const codeLines: Array<string> = domNode.innerHTML.split('\n')

            let subIndex = 0
            for (const value of codeLines) {
                /*
                    NOTE: Wrap a div object to grantee that $ will accept the
                    input.
                */
                const excess: number =
                    getText(createDomNodes(`<div>${value}</div>`)).length -
                    lengthLimit
                if (excess > 0)
                    newContent += this._replaceExcessWithDots(value, excess)
                else
                    newContent += value
                if (subIndex + 1 !== codeLines.length)
                    newContent += '\n'

                subIndex += 1
            }

            domNode.innerHTML = newContent
        }
    }
    /**
     * Replaces given html content with a shorter version trimmed by given
     * amount of excess.
     * @param content - String to trim.
     * @param excess - Amount of excess.
     * @returns Returns the trimmed content.
     */
    _replaceExcessWithDots(content: string, excess: number): string {
        // Add space for ending dots.
        excess += 3
        let newContent = ''
        const $content: $T = $(`<wrapper>${content}</wrapper>`)
        for (const domNode of $content.contents().get().reverse()) {
            const $wrapper: $T = $(domNode).wrap('<wrapper>').parent() as $T

            const textContent: string = domNode.textContent || ''

            let contentSnippet: string = $wrapper.html()
            if (!contentSnippet)
                contentSnippet = textContent

            if (excess)
                if (textContent.length < excess) {
                    excess -= textContent.length
                    contentSnippet = ''
                } else if (textContent.length >= excess) {
                    /*
                        NOTE: We have to ensure that no HTML tag will be
                        shorten: We work on "textContent" property only.
                    */
                    // @ts-expect-error writing into "textContent" is safe.
                    domNode.textContent =
                        textContent.substring(
                            0, textContent.length - excess - 1
                        ) +
                        '...'

                    excess = 0

                    contentSnippet = $wrapper.html()
                    if (!contentSnippet)
                        contentSnippet = domNode.textContent
                }
            newContent = contentSnippet + newContent
        }

        return newContent
    }
    /**
     * Shows marked example codes directly in browser.
     */
    _showExamples(): void {
        this.$domNodes.parent?.find(':not(iframe)')
            .contents()
            .each((index: number, domNode: Node): void => {
                if (
                    domNode.nodeName === this.options.showExample.domNodeName
                ) {
                    const match: null | RegExpMatchArray =
                        (domNode.textContent || '').match(
                            new RegExp(this.options.showExample.pattern)
                        )
                    if (match) {
                        const $codeDomNode: $T<Node> = $(domNode).next()

                        let code: string = $codeDomNode
                            .find(this.$domNodes.codeWrapper)
                            .text()

                        if (!code)
                            code = $codeDomNode.text()

                        try {
                            if (match.length > 2 && match[2])
                                if (
                                    ['javascript', 'javascripts', 'js']
                                        .includes(match[2].toLowerCase())
                                )
                                    $codeDomNode.after(
                                        $('<script>')
                                            .attr('type', 'text/javascript')
                                            .text(code)
                                    )
                                else if ([
                                    'css', 'cascadingstylesheet',
                                    'cascadingstylesheets', 'stylesheet',
                                    'stylesheets', 'sheet', 'sheets', 'style',
                                    'styles'
                                ].includes(match[2].toLowerCase()))
                                    $codeDomNode.after(
                                        $('<style>')
                                            .attr('type', 'text/css')
                                            .text(code)
                                    )
                                else if (match[2].toLowerCase() === 'hidden')
                                    $codeDomNode.after(code)
                                else
                                    $codeDomNode.after(
                                        $(
                                            this.options.showExample
                                                .htmlWrapper
                                        ).append(code)
                                    )
                            else
                                $codeDomNode.after(
                                    $(this.options.showExample.htmlWrapper)
                                        .append(code)
                                )
                        } catch (error) {
                            log.critical(
                                `Error while integrating code "${code}":`,
                                String(error)
                            )
                        }
                    }
                }
            })

        this.fireEvent('examplesLoaded')
    }
    // endregion
}
export const api: WebComponentAPI<
    HTMLElement, Mapping<unknown>, Mapping<unknown>, typeof Web
> = {
    component: WebDocumentation,
    register: (
        tagName: string = camelCaseToDelimited(WebDocumentation._name)
    ) => {
        customElements.define(tagName, WebDocumentation)
    }
}
export default WebDocumentation

if ((globalContext as Mapping<boolean>).AUTO_DEFINE_WEB_DOCUMENTATION)
    api.register()
// endregion
