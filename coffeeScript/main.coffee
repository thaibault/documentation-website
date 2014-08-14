#!/usr/bin/env coffee
# -*- coding: utf-8 -*-

# region header

# Copyright Torben Sickert 16.12.2012

# License
# -------

# This library written by Torben Sickert stand under a creative commons naming
# 3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

# endregion

###
    Simple notation for the deployment script to know which dependencies are
    needed.

    require [
        'jQuery/jquery-2.1.0', 'jQuery/jquery-observeHashChange-1.0'
        'jQuery/jquery-scrollTo-1.4.3.1', 'jQuery/jquery-spin-2.0.1'
        'bootstrap-3.2.0', 'jQuery/jquery-swipe-2.0'

        'jQuery/jquery-tools-1.0.coffee', 'jQuery/jquery-lang-1.0.coffee'
        'jQuery/jquery-website-1.0.coffee'
        'jQuery/jquery-homePage-1.0.coffee'
    ]
###

# # standalone
# # this.jQuery.noConflict() ($) ->
# #     $.HomePage googleTrackingCode: 'UA-40192634-1', language:
# #         allowedLanguages: ['enUS', 'deDE']
# #         sessionDescription: 'website{1}'
this.less =
    env: 'development'
    async: false
    fileAsync: false
    poll: 1000
    functions: {}
    dumpLineNumbers: 'all'
    relativeUrls: false
    rootpath: ''
    logLevel: 0
    #sourceMap: true
this.require.localStoragePathReminderPrefix = 'websiteResolvedDependency'
this.require().basePath.coffee.push "#{this.require.basePath.coffee[0]}jQuery/"
this.require.basePath.js.push "#{this.require.basePath.js[0]}jQuery/"
this.require [['jQuery.HomePage', 'jquery-homePage-1.0.coffee']], ($) =>
    ###
        Embed $ and require full compatible to all other JavaScripts. The
        global scope is clean after this sequence. The given function is called
        when the dom-tree was loaded.
    ###
    this.require.clearOldPathReminder()
    $.noConflict() ($) -> $.HomePage
        googleTrackingCode: 'UA-40192634-1', logging: true, language:
            allowedLanguages: ['enUS', 'deDE']
            sessionDescription: 'website{1}'
# #

# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion
