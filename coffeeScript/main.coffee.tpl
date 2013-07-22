#!/usr/bin/env coffee

# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion

# region header

# Copyright Torben Sickert 16.12.2012

# License
#    This library written by Torben Sickert stand under a creative commons
#    naming 3.0 unported license.
#    see http://creativecommons.org/licenses/by/3.0/deed.de

# endregion

## standalone
## this.jQuery.noConflict(true) (jQuery) ->
##     jQuery.Documentation googleTrackingCode: '<%GOOGLE_TRACKING_CODE%>'
this.require.noConflict = true
this.require(
    [['jQuery.Documentation', 'jquery-documentation-1.0.coffee']],
(jQuery) ->
    
    jQuery.noConflict(true) (jQuery) -> jQuery.Documentation(
        googleTrackingCode: '<%GOOGLE_TRACKING_CODE%>'))
##

