#!/usr/bin/env require

# region modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion

# region header

# Copyright Torben Sickert 16.12.2012

# License
#    This library written by Torben Sickert stand under a creative commons
#    naming 3.0 unported license.
#    see http://creativecommons.org/licenses/by/3.0/deed.de

###!
    Copyright see require on https://github.com/thaibault/require

    Conventions see require on https://github.com/thaibault/require

    @author t.sickert@gmail.com (Torben Sickert)
    @version 1.0 stable
    @fileOverview
    This module provides common reusable logic a simple project documentation
    web page.
###

## standalone do ($=this.jQuery) ->
this.require [['jQuery.Website', 'jquery-website-1.0.coffee']], ($) ->

# endregion

# region plugins

    ###*
        @memberOf $
        @class
    ###
    class Documentation extends $.Website.class

    # region properties

        ###*
            Saves default options for manipulating the default behaviour.

            @property {Object}
        ###
        _options:
            domNodeSelectorPrefix: 'body.{1}'
            showExamplePattern: '^ *showExample(: *([^ ]+))? *$'
            showExampleDomNodeName: '#comment'
            domNode:
                tableOfContentLinks: 'div.toc > ul > li > a[href^="#"]'
                aboutThisWebsiteLink: 'a[href="#about-this-website"]'
                homeLink: 'a[href="#home"]'
                aboutThisWebsiteSection: 'section.about-this-website'
                mainSection: 'section.main-content'
                codeWrapper: 'div.codehilite'
                codeChildren: 'pre'
            trackingCode: 'UA-0-0'
            section:
                aboutThisWebsite:
                    fadeOut: duration: 'slow'
                    fadeIn: duration: 'slow'
                main:
                    fadeOut: duration: 'slow'
                    fadeIn: duration: 'slow'
        ###*
            Saves the class name for introspection.

            @property {String}
        ###
        __name__: 'Documentation'

    # endregion

    # region public methods

        # region special

        ###*
            @description Initializes the interactive web application.

            @param {Object} options An options object.

            @returns {$.Documentation} Returns the current instance.
        ###
        initialize: (options) ->
            super options
            this.$domNodes.aboutThisWebsiteSection.hide()
            this._makeCodeEllipsis()
            this.on this.$domNodes.tableOfContentLinks, 'click', ->
                $.scrollTo $(this).attr('href'), 'slow'
            # Handle section switch between documentation and
            # "about this website".
            this._options.section.aboutThisWebsite.fadeOut.always = =>
                this.$domNodes.mainSection.fadeIn(
                    this._options.section.main.fadeIn)
            this._options.section.main.fadeOut.always = =>
                this.$domNodes.aboutThisWebsiteSection.fadeIn(
                    this._options.section.aboutThisWebsite.fadeIn)
            this.on this.$domNodes.aboutThisWebsiteLink, 'click', =>
                this.$domNodes.mainSection.fadeOut(
                    this._options.section.main.fadeOut)
            this.on this.$domNodes.homeLink, 'click', (event) =>
                this.$domNodes.aboutThisWebsiteSection.fadeOut(
                    this._options.section.aboutThisWebsite.fadeOut)
            this._showExamples()

        # endregion

         # region event handler

        ###*
            @description This method triggers if we change the current section.

            @returns {$.Documentation} Returns the current instance.
        ###
        _onSwitchSection: (hash) ->
            this.$domNodes.tableOfContentLinks.add(
                this.$domNodes.aboutThisWebsiteLink
            ).filter("a[href=\"#{hash}\"]").trigger 'click'
            super()
        ###*
            @description This method triggers if all startup animations are
                         ready.

            @returns {$.Documentation} Returns the current instance.
        ###
        _onStartUpAnimationComplete: ->
            # All start up effects are ready. Handle direct
            # section links.
            this.$domNodes.tableOfContentLinks.add(
                this.$domNodes.aboutThisWebsiteLink
            ).filter("a[href=\"#{window.location.href.substr(
                window.location.href.indexOf '#'
            )}\"]").trigger 'click'
            super()

        # endregion

        ###*
            @description This method makes dotes after code lines which are too
                         long. This prevents line wrapping.

            @returns {$.Documentation} Returns the current instance.
        ###
        _makeCodeEllipsis: ->
            self = this
            this.$domNodes.codeWrapper.children(
                this.$domNodes.codeChildren
            ).each ->
                $this = $ this
                newContent = ''
                codeLines = $this.html().split '\n'
                $.each codeLines, (index, value) ->
                    excess = 0
                    try
                        excess = $(value).text().length - 79
                    catch error
                        if value.length > 79
                            value = "#{value.substr(0, 76)}..."
                    if excess > 0
                        newContent += self._replaceExcessWithDots value, excess
                    else
                        newContent += value
                    if index + 1 isnt codeLines.length
                        newContent += "\n"
                $this.html newContent
            this
        ###*
            @description Replaces given html content with a shorter version
                         trimmed by given amount of excess.

            @param {String} content String to trim.
            @param {Number} excess Amount of excess.

            @returns {String} Returns the trimmed content.
        ###
        _replaceExcessWithDots: (content, excess) ->
            # Add space for ending dots.
            excess += 3
            newContent = ''
            $($(content).get().reverse()).each ->
                # Wrap element to get not only the inner html.
                $wrapper = $(this).wrap('<div>').parent()
                contentSnippet = $wrapper.html()
                if not contentSnippet
                    contentSnippet = this.textContent
                if excess
                    if this.textContent.length < excess
                        excess -= this.textContent.length
                        contentSnippet = ''
                    else if this.textContent.length >= excess
                        this.textContent = "#{this.textContent.substr(
                            0, this.textContent.length - excess - 1
                        )}..."
                        excess = 0
                        contentSnippet = $wrapper.html()
                        if not contentSnippet
                            contentSnippet = this.textContent
                newContent = contentSnippet + newContent
            newContent
        ###*
            @description Shows marked example codes directly in browser.

            @returns {$.Documentation} Returns the current instance.
        ###
        _showExamples: ->
            self = this
            this.$domNodes.parent.find(':not(iframe)').contents().each ->
                if this.nodeName is self._options.showExampleDomNodeName
                    match = this.textContent.match(new RegExp(
                        self._options.showExamplePattern))
                    if match
                        $codeDomNode = $(this).next()
                        code = $codeDomNode.find(
                            self.$domNodes.codeWrapper
                        ).text()
                        if match[2]?.toLowerCase() is 'javascript'
                            # TODO wrap js arround
                            $codeDomNode.after code
                        else if match[2]? and $.inArray(
                            match[2].toLowerCase(), [
                                'css', 'cascadingstylesheets', 'stylesheets',
                                'sheets', 'style']
                        ) isnt -1
                            # TODO wrap js style arround
                            $codeDomNode.after code
                        else
                            $codeDomNode.after code
            this

    # endregion

    # region handle $ extending

    ###* @ignore ###
    $.Documentation = -> $.Tools().controller Documentation, arguments
    ###* @ignore ###
    $.Documentation.class = Documentation

    # endregion

# endregion
