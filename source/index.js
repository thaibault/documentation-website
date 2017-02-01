// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module homePage */
'use strict'
/* !
    region header
    [Project page](http://torben.website)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {$} from 'website-utilities'
import type {DomNode, $DomNode} from 'clientnode'
/* eslint-disable max-len */
// IgnoreTypeCheck
import 'imports?jQuery=jquery!imports?$=jquery!imports?window=>{jQuery: jQuery}!swipe'
/* eslint-enable max-len */
// endregion
// region declaration
declare var OFFLINE:boolean
// endregion
// region plugins/classes
/**
 * This plugin holds all needed methods to extend a whole homepage.
 * @extends website-utilities:Website
 * @property static:_name - Defines this class name to allow retrieving them
 * after name mangling.
 * @property _options - Options extended by the options given to the
 * initializer method.
 * @property _options.trackingCode {string} - Tracking code for collection
 * users meta data.
 * @property _options.maximumFooterHeightInPercent {number} - Indicates when
 * the footer should stick to the bottom.
 * @property _options.scrollInLinearTime {boolean} - Indicates whether
 * animated scrolling should be accelerate and brake or not.
 * @property _options.backgroundDependentHeightSections {Array.<string>} - A
 * list: of section names which dimensions depend on their background image.
 * @property _options.maximumBackgroundDependentHeight {number} - Upper range
 * bound until a dynamic background image adjust is needed.
 * @property _options.menuHighlightAnimation {Object} - Options for menu
 * highlight animation.
 * @property _options.hideMobileMenuAfterSelection {boolean} - Indicates
 * whether the mobile menu should be hide after a menu item was selected.
 * @property _options.domNode {Object} - Mapping if needed dom node
 * descriptions to their corresponding selectors.
 * @property _options.carousel {Object} - Options for the integrated section
 * carousel.
 * @property _options.dimensionIndicator {Object} - Options for the injectable
 * dimension indicator.
 * @property _options.dimensionIndicator.template {string} - Markup for
 * injectable dimension indicator to show current media query mode.
 * @property _options.dimensionIndicator.effectOptions {Object} - Options for
 * showing and hiding the dimension indicator between a dimension change.
 * @property _options.dimensionIndicator.effectOptions.showAnimation {Object} -
 * Options for the show animation.
 * @property _options.dimensionIndicator.effectOptions.hideAnimation {Object} -
 * Options for the hide animation.
 * @property _options.aboutThisWebsiteSection {Object} - Animation options for
 * showing and hiding the about this website section.
 * @property _options.aboutThisWebsiteSection.showAnimation {Object} - Show
 * options.
 * @property _options.aboutThisWebsiteSection.hideAnimation {Object} - Hide
 * options.
 * @property _oldSectionHeightInPixel - Old section height needed for section
 * switch animations.
 * @property _sectionTopMarginInPixel - Distance to window top from the section
 * body.
 * @property _initialContentHeightAdaptionDone - Indicates whether initial main
 * content height has been adapted.
 * @property _initialMenuHightlightDone - Indicates whether initial menu
 * highlighting has been done.
 * @property _loadingCoverRemoved - Indicates whether startup loading cover has
 * been removed.
 */
export default class HomePage extends $.Website.class {
    // region static properties
    static _name:string = 'HomePage'
    // endregion
    // region dynamic properties
    $domNodes:{[key:string]:$DomNode}
    _oldSectionHeightInPixel:number
    _sectionTopMarginInPixel:number
    _initialContentHeightAdaptionDone:boolean
    _initialMenuHightlightDone:boolean
    _loadingCoverRemoved:boolean;
    // endregion
    // region public methods
    // / region special
    /**
     * Initializes the interactive web application.
     * @param options - An options object.
     * @param oldSectionHeightInPixel - Initial section height needed for
     * section switch animations.
     * @param sectionTopMarginInPixel - Distance to window top from the section
     * body.
     * @param initialContentHeightAdaptionDone - Indicates whether initial
     * main content height has been adapted.
     * @param initialMenuHightlightDone - Indicates whether initial menu
     * highlighting has been done.
     * @param loadingCoverRemoved - Indicates whether startup loading cover has
     * been removed.
     * @returns Returns the current instance.
     */
    initialize(
        options:Object = {}, oldSectionHeightInPixel:number = 200,
        sectionTopMarginInPixel:number = 0,
        initialContentHeightAdaptionDone:boolean = false,
        initialMenuHightlightDone:boolean = false,
        loadingCoverRemoved:boolean = false
    ):HomePage {
        this._oldSectionHeightInPixel = oldSectionHeightInPixel
        this._sectionTopMarginInPixel = sectionTopMarginInPixel
        this._initialContentHeightAdaptionDone =
            initialContentHeightAdaptionDone
        this._initialMenuHightlightDone = initialMenuHightlightDone
        this._loadingCoverRemoved = loadingCoverRemoved
        this._options = {
            trackingCode: 'UA-40192634-1',
            maximumFooterHeightInPercent: 50,
            scrollInLinearTime: true,
            backgroundDependentHeightSections: ['about'],
            maximumBackgroundDependentHeight: 750,
            menuHighlightAnimation: {easing: 'linear'},
            hideMobileMenuAfterSelection: true,
            domNode: {
                carousel: 'section.carousel.slide',
                section: 'section.carousel.slide div.carousel-inner div.item',
                logoLink:
                    'header.navbar-wrapper div.navbar.navbar-inverse ' +
                    'div.navbar-header a.navbar-brand',
                navigationButton:
                    'header.navbar-wrapper div.navbar.navbar-inverse ' +
                    'div.navbar-collapse ul.nav.navbar-nav li a',
                aboutThisWebsiteButton:
                    'div.footer footer a[href="#about-this-website"]',
                aboutThisWebsiteSection: 'section.about-this-website',
                dimensionIndicator:
                    'header.navbar-wrapper div.navbar.navbar-inverse ' +
                    'div.navbar-header a.navbar-brand ' +
                    'span.dimension-indicator',
                footer: 'div.footer',
                menuHighlighter:
                    'header.navbar-wrapper div.navbar.navbar-inverse ' +
                    'div.navbar-collapse div.navbar-highlighter',
                mobileCollapseButton:
                    'header.navbar-wrapper div.navbar.navbar-inverse ' +
                    'div.navbar-header button.navbar-toggle',
                navigationWrapper:
                    'header.navbar-wrapper div.navbar.navbar-inverse ' +
                    'div.navbar-collapse'
            },
            carousel: {
                startSlide: 0,
                speed: 400,
                auto: 0,
                continuous: false,
                disableScroll: false,
                stopPropagation: false
            },
            dimensionIndicator: {
                template: `
                    <span class="glyphicon glyphicon-resize-horizontal"></span>
                    <span>{1}</span>
                `,
                effectOptions: {
                    showAnimation: [{opacity: 1}, {duration: 'fast'}],
                    hideAnimation: [{opacity: 0}, {duration: 'fast'}]
                }
            },
            aboutThisWebsiteSection: {
                showAnimation: [{opacity: 1}, {duration: 'fast'}],
                hideAnimation: [{opacity: 0}, {duration: 'fast'}]
            }
        }
        let initialOnSwitchedCallback:Function
        let initialOnEnsuredCallback:Function
        let initialOnSwitchCallback:Function
        let initialOnEnsureCallback:Function
        let initialLanguageHideAnimationAlwaysCallback:Function
        if (options.language) {
            initialOnSwitchedCallback = options.language.onSwitched
            initialOnEnsuredCallback = options.language.onEnsureded
            initialOnSwitchCallback = options.language.onSwitch
            initialOnEnsureCallback = options.language.onEnsure
            if (
                options.language.textNodeParent &&
                'hideAnimation' in options.language.textNodeParent &&
                typeof options.language.textNodeParent[
                    1
                ].hideAnimation === 'object' &&
                'always' in options.language.textNodeParent.hideAnimation[1]
            )
                initialLanguageHideAnimationAlwaysCallback =
                    options.language.textNodeParent.hideAnimation[1].always
        }
        const self:HomePage = this
        this.constructor.extendObject(true, options, {language: {
            onSwitched: function(...parameter:Array<any>):boolean {
                const result:any = !initialOnSwitchedCallback || (
                    initialOnSwitchedCallback &&
                    initialOnSwitchedCallback.call(this, ...parameter))
                /*
                    Only adapt menu highlighter if a section is currently
                    selected.
                */
                self._highlightMenuEntry(false)
                let showAnimationOptions:Array<Object> = [{opacity: 1}]
                if (self.languageHandler)
                    showAnimationOptions = self.languageHandler._options
                        .textNodeParent.showAnimation
                if (self.$domNodes.navigationButton.parent('li').filter(
                    '.active'
                ).length)
                    self.$domNodes.menuHighlighter.animate(
                        ...showAnimationOptions)
                self._adaptContentHeight()
                return result
            },
            onEnsured: function(...parameter:Array<any>):boolean {
                const result:any = !initialOnEnsuredCallback || (
                    initialOnEnsuredCallback.call(...parameter))
                /*
                    Only adapt menu highlighter if a section is currently
                    selected.
                */
                self._highlightMenuEntry(false)
                self._adaptContentHeight()
                return result
            },
            onSwitch: function(
                oldLanguage:string, newLanguage:string
            ):boolean {
                const result:any = !initialOnSwitchCallback || (
                    initialOnSwitchCallback.call(
                        this, oldLanguage, newLanguage))
                // Add language toggle button functionality.
                let hideAnimationOptions:Array<Object> = [{opacity: 0}, {}]
                let showAnimationOptions:Array<Object> = [{opacity: 1}, {}]
                if (self.languageHandler) {
                    hideAnimationOptions = self.languageHandler._options
                        .textNodeParent.hideAnimation
                    showAnimationOptions = self.languageHandler._options
                        .textNodeParent.showAnimation
                }
                self.$domNodes.menuHighlighter.animate(...hideAnimationOptions)
                hideAnimationOptions = hideAnimationOptions.slice()
                hideAnimationOptions[1] = this.constructor.extendObject(true, {
                }, hideAnimationOptions[1], {always: function():any {
                    let result:any
                    if (initialLanguageHideAnimationAlwaysCallback)
                        result = initialLanguageHideAnimationAlwaysCallback
                            .call(this, oldLanguage, newLanguage)
                    const $oldLanguageLinkDomNode:$DomNode = $(this)
                    $oldLanguageLinkDomNode.attr(
                        'href', `#language-${oldLanguage}`
                    ).text(oldLanguage.substr(0, 2)).animate(
                        ...showAnimationOptions)
                    return result
                }})
                const $newLanguageLinkDomNode:$DomNode = $(
                    `a[href="#language-${newLanguage}"]`)
                $newLanguageLinkDomNode.animate(...hideAnimationOptions)
                // Adapt curriculum vitae link.
                self._adaptCurriculumVitaeLink(oldLanguage, newLanguage)
                return result
            },
            onEnsure: (oldLanguage:string, newLanguage:string):any => {
                const result:any = !initialOnEnsureCallback || (
                    initialOnEnsureCallback.call(
                        this, oldLanguage, newLanguage))
                // Add language toggle button functionality.
                $(`a[href="#language-${newLanguage}"]`).attr(
                    'href', `#language-${oldLanguage}`
                ).text(oldLanguage.substr(0, 2))
                self._adaptCurriculumVitaeLink(oldLanguage, newLanguage)
                return result
            }
        }})
        super.initialize(options)
        // Disable tab functionality to prevent inconsistent carousel states.
        this.on(this.$domNodes.parent, 'keydown', (event:Object):void => {
            if (event.keyCode === this.constructor.keyCode.TAB)
                event.preventDefault()
        })
        this.$domNodes.aboutThisWebsiteSection.hide().css(
            'position', 'absolute')
        if (!(
            'location' in $.global && $.global.location.hash &&
            this.$domNodes.navigationButton.parent('li').children(
                this.$domNodes.navigationButton
            ).add(this.$domNodes.aboutThisWebsiteButton).filter(
                `[href="${$.global.location.hash}"]`
            ).length
        ))
            $.global.location.hash = this.$domNodes.navigationButton.parent(
                'li'
            ).filter('.active').children(this.$domNodes.navigationButton).attr(
                'href')
        this._initializeSwipe()
        if ('location' in $.global)
            this.fireEvent(
                'switchSection', false, this, $.global.location.hash.substring(
                    '#'.length))
        this.on(this.$domNodes.window, 'resize', this.getMethod(
            this._adaptContentHeight))
        return this
    }
    // / endregion
    // endregion
    // region protected methods
    // / region event
    /**
     * Switches the language dependent curriculum vitae links.
     * @param oldLanguage - Old language.
     * @param newLanguage - New language.
     * @returns - Returns the current instance.
     */
    _adaptCurriculumVitaeLink(
        oldLanguage:string, newLanguage:string
    ):HomePage {
        const $curriculumVitaeLink:$DomNode = $(
            'a[href*="curriculumVitae"].hidden-xs')
        if (!$curriculumVitaeLink.data(oldLanguage))
            $curriculumVitaeLink.data(oldLanguage, $curriculumVitaeLink.attr(
                'href'))
        if (!$curriculumVitaeLink.data(newLanguage))
            $curriculumVitaeLink.data(
                newLanguage, $curriculumVitaeLink.data(oldLanguage).substr(
                    0, $curriculumVitaeLink.data(oldLanguage).lastIndexOf(
                        '.'
                    ) - oldLanguage.length
                ) + newLanguage.substr(0, 2).toUpperCase(
                ) + newLanguage.substr(2).toLowerCase(
                ) + $curriculumVitaeLink.data(oldLanguage).substr(
                    $curriculumVitaeLink.data(oldLanguage).lastIndexOf('.')))
        $curriculumVitaeLink.attr('href', $curriculumVitaeLink.data(
            newLanguage))
        return this
    }
    /**
     * This method triggers if the responsive design switches to another
     * resolution mode.
     * @param oldMode - Old media query mode.
     * @param newMode - New media query mode.
     * @returns Returns the current instance.
     */
    _onChangeMediaQueryMode(oldMode:string, newMode:string):HomePage {
        // Determine top margin for background image dependent sections.
        this.$domNodes.section.children().css('margin-top', '')
        if ('getComputedStyle' in $.global)
            this._sectionTopMarginInPixel = parseInt(
                $.global.getComputedStyle($('h1')[1], ':before').height, 10)
        // Show responsive dimension indicator switching.
        this._options.dimensionIndicator.effectOptions.showAnimation[
            1
        ].always = ():HomePage =>
            /*
                Adapt menu highlighter after changing layout and dimension
                indicator.
            */
            this._highlightMenuEntry(false)
        this._options.dimensionIndicator.effectOptions.hideAnimation[
            1
        ].always = ():$DomNode => this.$domNodes.dimensionIndicator.html(
            this.constructor.stringFormat(
                this._options.dimensionIndicator.template, newMode)
        ).animate(
            ...this._options.dimensionIndicator.effectOptions.showAnimation)
        this.$domNodes.dimensionIndicator.stop().animate(
            ...this._options.dimensionIndicator.effectOptions.hideAnimation)
        return super._onChangeMediaQueryMode(oldMode, newMode)
    }
    /**
     * This method triggers if the responsive design switches to extra small
     * mode.
     * @returns Returns the current instance.
     */
    _onChangeToExtraSmallMode():HomePage {
        // Resets the image dependent section heights.
        this.$domNodes.section.children().css('height', 'auto')
        return this
    }
    /**
     * Switches to given section.
     * @param sectionName - Location to switch to.
     * @returns Returns the current instance.
     */
    _onSwitchSection(sectionName:string):HomePage {
        if (['next', 'prev'].includes(sectionName))
            sectionName = this._determineRelativeSections(sectionName)
        const hash:string = `#${sectionName}`
        if (hash === this.$domNodes.aboutThisWebsiteButton.attr('href')) {
            if ('location' in $.global)
                $.global.location.hash = hash
            this._handleSwitchToAboutThisWebsite()
            this._adaptContentHeight()
        } else {
            let sectionFound:boolean = false
            this.$domNodes.navigationButton.each((
                index:number, button:DomNode
            ):void => {
                const $button:$DomNode = $(button)
                let $sectionButton:$DomNode = $button.parent('li')
                if (!$sectionButton.length)
                    $sectionButton = $button
                /*
                    NOTE: We need both brackets to follow the right logical
                    execution order.
                */
                if ($button.attr('href') === hash || (
                    hash === '#' && ((
                        this._currentMediaQueryMode === 'extraSmall' &&
                        $button.attr('href') === '#contact'
                    ) || (
                        this._currentMediaQueryMode !== 'extraSmall' &&
                        index === 0
                    ))
                )) {
                    if ('location' in $.global)
                        $.global.location.hash = $button.attr('href')
                    sectionFound = true
                    if (!$sectionButton.hasClass('active'))
                        this._performSectionSwitch(
                            sectionName, index, $sectionButton)
                } else
                    $sectionButton.removeClass('active')
            })
            // If no section could be determined initialize the first one.
            if (!sectionFound) {
                const forceSection:string =
                    this.$domNodes.navigationButton.first().attr(
                        'href'
                    ).substring('#'.length)
                this.debug(`Force section "${forceSection}".`)
                return this._onSwitchSection(forceSection)
            }
        }
        if (!this._initialContentHeightAdaptionDone)
            this._adaptContentHeight()
        return super._onSwitchSection(sectionName)
    }
    // / endregion
    // / region helper
    /**
     * Switches to given section.
     * @param sectionName - Section name to switch to.
     * @param index - Index of section to switch to.
     * @param $sectionButton - The current section button.
     * @returns Returns the current instance.
     */
    _performSectionSwitch(
        sectionName:string, index:number, $sectionButton:$DomNode
    ):HomePage {
        this.$domNodes.aboutThisWebsiteSection.animate(
            ...this._options.aboutThisWebsiteSection.hideAnimation)
        this.debug(`Switch to section "${sectionName}".`)
        $sectionButton.addClass('active')
        if (this._viewportIsOnTop) {
            this.$domNodes.carousel.data('Swipe').slide(index)
            this._adaptContentHeight()
            return this._highlightMenuEntry()
        }
        return this.scrollToTop(():void => {
            this.$domNodes.carousel.data('Swipe').slide(index)
            this._adaptContentHeight()
            this._highlightMenuEntry()
        })
    }
    /**
     * Switches to about this website section.
     * @returns Returns the current instance.
     */
    _handleSwitchToAboutThisWebsite():HomePage {
        if ('location' in $.global)
            this.debug(
                'Switch to section "' +
                `${$.global.location.hash.substring('#'.length)}".`)
        this.scrollToTop()
        this.$domNodes.menuHighlighter.animate(
            ...this._options.aboutThisWebsiteSection.hideAnimation)
        this.$domNodes.section.animate(
            ...this._options.aboutThisWebsiteSection.hideAnimation)
        // TODO bei umstellung auf animate statt fadeIn und fadeOut ist display
        // nicht mehr richtig gesetzt..
        this.$domNodes.aboutThisWebsiteSection.css('display', 'block')
        this.$domNodes.aboutThisWebsiteSection.animate(
            ...this._options.aboutThisWebsiteSection.showAnimation)
        this.$domNodes.navigationButton.parent('li').removeClass('active')
        return this
    }
    /**
     * This method is complete if last startup animation was initialized.
     * @param parameter - Forwards all given arguments to registered start
     * up animation complete handler callback.
     * @returns Returns the current instance.
     */
    _onStartUpAnimationComplete(...parameter:Array<any>):HomePage {
        super._onStartUpAnimationComplete(...parameter)
        return this._highlightMenuEntry()._adaptContentHeight()
    }
    /**
     * This method triggers after window is loaded. It overwrites the super
     * method to wait for removing the loading cover until section height is
     * adapted.
     * @param parameter - Forwards all given arguments to registered callbacks.
     * @returns Returns the current instance.
     */
    _removeLoadingCover(...parameter:Array<any>):HomePage {
        if (
            this._initialContentHeightAdaptionDone &&
            !this._loadingCoverRemoved
        ) {
            this._loadingCoverRemoved = true
            super._removeLoadingCover(...parameter)
        }
        return this
    }
    /**
     * Highlights current menu entry.
     * @param transition - Indicates whether to use configured transition.
     * @returns Returns the current instance.
     */
    _highlightMenuEntry(transition:boolean = true):HomePage {
        if (
            this._currentMediaQueryMode !== 'extraSmall' && this.windowLoaded
        ) {
            const $sectionButton:$DomNode =
                this.$domNodes.navigationButton.parent('li').filter('.active')
            const sectionButtonPosition:?{
                left:number;
                top:number;
            } = $sectionButton.position()
            if (sectionButtonPosition && sectionButtonPosition.left)
                if (this._initialMenuHightlightDone && transition) {
                    this.constructor.extendObject(
                        true, this._options.menuHighlightAnimation, {
                            left: $sectionButton.position().left,
                            width: $sectionButton.width(),
                            duration: this._options.carousel.speed
                        })
                    this.$domNodes.menuHighlighter.stop().animate(
                        ...this._options.aboutThisWebsiteSection.showAnimation
                    ).animate(this._options.menuHighlightAnimation)
                } else {
                    this._initialMenuHightlightDone = true
                    this.$domNodes.menuHighlighter.stop().animate(
                        ...this._options.aboutThisWebsiteSection.showAnimation
                    ).css({
                        left: $sectionButton.position().left,
                        width: $sectionButton.width()
                    })
                }
        }
        return this
    }
    /**
     * Adapt the carousel height to current main section height.
     * @returns Returns the new generated swipe instance.
     */
    _adaptContentHeight():HomePage {
        if ('location' in $.global && $.global.location.hash) {
            const $currentSection:?$DomNode = this.$domNodes.section.add(
                this.$domNodes.aboutThisWebsiteSection
            ).filter(`.${$.global.location.hash.substr(1)}`)
            if ($currentSection && $currentSection.length) {
                let newSectionHeightInPixel:number =
                    this._determineSectionHeightInPixel($currentSection)
                if (
                    newSectionHeightInPixel &&
                    newSectionHeightInPixel !== this._oldSectionHeightInPixel
                ) {
                    this._oldSectionHeightInPixel = newSectionHeightInPixel
                    /* TODO
                    newSectionHeightInPixel =
                        this._adaptBackgroundDependentHeight(
                            newSectionHeightInPixel, $currentSection)
                    */
                    // First stop currently running animations.
                    if (this.startUpAnimationIsComplete) {
                        this.$domNodes.footer.stop(true)
                        this.$domNodes.carousel.stop(true)
                    }
                    let transitionMethod:string = 'css'
                    if (this._initialContentHeightAdaptionDone)
                        transitionMethod = 'animate'
                    /*
                        NOTE: If current section is "about-this-website" we
                        place it in front of last selected section and position
                        footer absolutely.
                    */
                    if (
                        'location' in $.global &&
                        $.global.location.hash === '#about-this-website'
                    ) {
                        // Move footer from last known position.
                        this.$domNodes.footer.css({
                            position: 'absolute',
                            top: this.$domNodes.carousel.height()})
                        this.$domNodes.footer[transitionMethod]({
                            top: newSectionHeightInPixel
                        }, {
                            duration: this._options.carousel.speed
                        })
                        this.$domNodes.carousel.height(newSectionHeightInPixel)
                    } else
                        this._adaptSectionHeight(
                            transitionMethod, newSectionHeightInPixel,
                            $currentSection)
                }
                if (!this._initialContentHeightAdaptionDone) {
                    this._initialContentHeightAdaptionDone = true
                    if (!this._loadingCoverRemoved)
                        this._removeLoadingCover()
                }
            }
        }
        return this
    }
    /**
     * Adapts the new section height after window resizing or section switch.
     * @param transitionMethodName - Method name to perform adaption.
     * @param newSectionHeightInPixel - Section height to adapt to.
     * @param $currentSection - The current section dom node.
     * @returns Returns the current instance.
     */
    _adaptSectionHeight(
        transitionMethodName:string, newSectionHeightInPixel:number,
        $currentSection:$DomNode
    ):HomePage {
        this.$domNodes.footer.css({position: 'relative', top: 0})
        let newPseudoCarouselHeightInPixel:number = newSectionHeightInPixel
        // Make smooth transition till viewport ending.
        if (transitionMethodName === 'animate') {
            if (this.$domNodes.carousel.height(
            ) > this.$domNodes.window.height())
                /*
                    If section height is larger than current viewport pre set
                    height to current viewport.
                */
                this.$domNodes.carousel.css(
                    'height', this.$domNodes.window.height())
            if (newSectionHeightInPixel > this.$domNodes.window.height())
                /*
                    If new section height height is larger than current
                    viewport make the transition till current viewport and
                    reset after animation completes.
                */
                newPseudoCarouselHeightInPixel = this.$domNodes.window.height()
        }
        this.$domNodes.carousel[transitionMethodName]({
            height: newPseudoCarouselHeightInPixel
        }, {
            duration: this._options.carousel.speed,
            always: ():void => {
                this.$domNodes.carousel.css('height', newSectionHeightInPixel)
                // Check if height has changed after adaption.
                if (newSectionHeightInPixel !== $currentSection.outerHeight())
                    this._adaptContentHeight()
            }
        })
        return this
    }
    /**
     * Adapts the background dependent sections height.
     * @param newSectionHeightInPixel - Section height to adapt to.
     * @param $currentSection - The current section dom node.
     * @returns Returns the new calculated section height in pixel.
     */
    _adaptBackgroundDependentHeight(
        newSectionHeightInPixel:number, $currentSection:$DomNode
    ):number {
        if (
            this._currentMediaQueryMode === 'extraSmall' ||
            'location' in $.global &&
            !this._options.backgroundDependentHeightSections.includes(
                $.global.location.hash.substring('#'.length))
        ) {
            this.$domNodes.section.children().css('marginTop', 0)
            return this._determineSectionHeightInPixel($currentSection)
        }
        // Calculate stretched background sections.
        let additionalMarginTopInPixel:number = 0
        if (
            newSectionHeightInPixel >
            this._options.maximumBackgroundDependentHeight
        ) {
            // Calculate the vertical centering margins.
            additionalMarginTopInPixel = (
                newSectionHeightInPixel -
                this._options.maximumBackgroundDependentHeight
            ) / 2
            newSectionHeightInPixel =
                this._options.maximumBackgroundDependentHeight
        }
        $currentSection.children().css(
            'height', newSectionHeightInPixel - this._sectionTopMarginInPixel)
        this.$domNodes.section.children().css(
            'marginTop', additionalMarginTopInPixel)
        return Math.max(
            this._determineSectionHeightInPixel($currentSection), parseInt(
                this.$domNodes.section.children().outerHeight(), 10
            ) + parseInt(this.$domNodes.section.children().css(
                'marginTop'
            ), 10) + this._sectionTopMarginInPixel)
    }
    /**
     * Determines the new section height in pixel after webview size or section
     * has changed.
     * @param $currentSection - The current section dom node.
     * @returns Returns the new computed section height.
     */
    _determineSectionHeightInPixel($currentSection:$DomNode):number {
        if (
            this._currentMediaQueryMode === 'extraSmall' ||
            'location' in $.global &&
            this._options.backgroundDependentHeightSections.includes(
                $.global.location.hash.substring('#'.length))
        ) {
            const newSectionHeightInPixel:number = $currentSection.outerHeight(
            )
            const footerHeightInPixel:number = this.$domNodes.document.height(
            ) - newSectionHeightInPixel
            const footerHeightInPercent:number = (footerHeightInPixel * 100) /
                this.$domNodes.document.height()
            if (
                this._options.maximumFooterHeightInPercent <
                    footerHeightInPercent &&
                newSectionHeightInPixel < this.$domNodes.document.height(
                ) - this.$domNodes.footer.height()
            )
                /*
                    If we have a high resolution available we will let the
                    footer stay on the bottom.
                */
                return this.$domNodes.document.height(
                ) - this.$domNodes.footer.height()
            return newSectionHeightInPixel
        }
        return this.$domNodes.document.height()
    }
    /**
     * Attaches needed event handler to the swipe plugin and initializes the
     * slider.
     * @returns Returns the new generated swipe instance.
     */
    _initializeSwipe():Object {
        // Remove anchor ids to avoid conflicts with native section switching.
        $('h1').removeAttr('id').filter(function():boolean {
            return !$(this).html().trim()
        }).remove()
        this._options.carousel.transitionEnd = (index:number):boolean => {
            this.$domNodes.navigationButton.each((
                subIndex:number, button:DomNode
            ):?boolean => {
                if (index === subIndex) {
                    this.fireEvent(
                        'switchSection', false, this, $(button).attr(
                            'href'
                        ).substring('#'.length))
                    return false
                }
            })
            return true
        }
        // NOTE: A cyclic slide effect is more intuitive on touch devices.
        this._options.carousel.continuous =
            this._currentMediaQueryMode === 'extraSmall'
        return this.$domNodes.carousel.Swipe(this._options.carousel)
    }
    /**
     * This method adds triggers to switch section.
     * @param parameter - Forwards all given arguments to registered callbacks.
     * @returns Returns the current instance.
     */
    _addNavigationEvents(...parameter:Array<any>):HomePage {
        const toggleMobileMenu = ():void => {
            // This handler rebuilds bootstrap mobile menu collapse feature.
            const slideOut:boolean = this.$domNodes.navigationWrapper.is('.in')
            this.$domNodes.navigationWrapper.one(
                this.transitionEndEventNames, ():void => {
                    if (slideOut) {
                        this.$domNodes.navigationWrapper.removeClass(
                            'collapsing in')
                        this.$domNodes.navigationWrapper.addClass('collapse')
                    } else {
                        this.$domNodes.navigationWrapper.removeClass(
                            'collapsing')
                        this.$domNodes.navigationWrapper.addClass(
                            'collapse in')
                    }
                }
            )
            this.$domNodes.navigationWrapper.removeClass('collapse')
            this.$domNodes.navigationWrapper.addClass('collapsing')
            if (slideOut) {
                this.$domNodes.navigationWrapper.height(0)
                this.$domNodes.navigationWrapper.removeClass('in')
            } else
                this.$domNodes.navigationWrapper.height(
                    this.$domNodes.navigationWrapper.find(
                        'ul'
                    ).outerHeight(true))
        }
        this.on(this.$domNodes.mobileCollapseButton, 'click', toggleMobileMenu)
        if (this._options.hideMobileMenuAfterSelection)
            this.on(this.$domNodes.navigationButton, 'click', ():void => {
                if (this._currentMediaQueryMode === 'extraSmall')
                    toggleMobileMenu(...parameter)
            })
        this.on(this.$domNodes.navigationButton.add(
            this.$domNodes.aboutThisWebsiteButton
        ), 'click', (event:Object):boolean => this.fireEvent(
            'switchSection', false, this, $(event.target).attr(
                'href'
            ).substring('#'.length)))
        return super._addNavigationEvents(...parameter)
    }
    /**
     * Determines current section to the right or the left.
     * @param sectionName - Relative section ("next" or "prev").
     * @returns Returns the absolute section name.
     */
    _determineRelativeSections(sectionName:string):string {
        if ('location' in $.global)
            this.$domNodes.navigationButton.each((
                index:number, button:DomNode
            ):?boolean => {
                if ($(button).attr('href') === $.global.location.hash) {
                    /*
                        NOTE: We subtract 1 from navigation buttons length
                        because we want to ignore the about this website
                        section. And the index starts counting by zero.
                    */
                    const numberOfButtons:number =
                        this.$domNodes.navigationButton.length - 1
                    let newIndex:number
                    if (sectionName === 'next')
                        newIndex = (index + 1) % numberOfButtons
                    else if (sectionName === 'prev')
                        /*
                            NOTE: Subtracting 1 in the residue class ring means
                            adding the number of numbers minus 1. This prevents
                            us from getting negative button indexes.
                        */
                        newIndex = (index + numberOfButtons - 1) %
                            numberOfButtons
                    else
                        return false
                    sectionName = $(
                        this.$domNodes.navigationButton[newIndex]
                    ).attr('href').substring('#'.length)
                    return false
                }
            })
        return sectionName
    }
    // / endregion
    // endregion
}
// endregion
$.HomePage = (...parameter:Array<any>):any => $.Tools().controller(
    HomePage, parameter)
$.HomePage.class = HomePage
if (typeof OFFLINE !== 'undefined' && OFFLINE) {
    const offlineHandler:Object = require('offline-plugin/runtime')
    offlineHandler.install({
        // NOTE: Tell to new SW to take control immediately.
        onUpdateReady: ():void => offlineHandler.applyUpdate()
    })
}
$.noConflict()(($:Object):HomePage => $.HomePage({
    googleTrackingCode: 'UA-40192634-1', language: {
        logging: true, selection: ['enUS', 'deDE'],
        sessionDescription: 'website{1}'
    }
}))
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
