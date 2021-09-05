// -*- coding: utf-8 -*-
/** @module type */
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
import {ProcedureFunction, $DomNode, $Function, $Global} from 'clientnode/type'
import {
    DomNodes as BaseDomNodes,
    Options as BaseOptions,
    StaticScope as BaseStaticScope
} from 'website-utilities/type'

import Documentation from './index'
// endregion
// region exports
export type DocumentationFunction =
    ((...parameter:Array<any>) => any) &
    {class:typeof Documentation}
export interface StaticScope extends BaseStaticScope {
    Documentation:DocumentationFunction
    global:$Global & {
        $documentationWebsite:$Function
    }
}
declare global {
    interface JQueryStatic extends StaticScope {}
}
export type DomNodes<Type = string> = BaseDomNodes<Type> & {
    aboutThisWebsiteLink:Type
    aboutThisWebsiteSection:Type
    codeWrapper:Type
    code:Type
    homeLink:Type
    mainSection:Type
    tableOfContentLinks:Type
}
export type $DomNodes = DomNodes<$DomNode> & {
    parent:$DomNode<HTMLElement>
    window:$DomNode<Window>
}
export interface DefaultOptions {
    codeTableWrapper:string
    domNodes:DomNodes
    domNodeSelectorPrefix:string
    name:string
    onExamplesLoaded:ProcedureFunction
    section:{
        aboutThisWebsite:{
            fadeInOptions:JQuery.EffectsOptions<HTMLElement>
            fadeOutOptions:JQuery.EffectsOptions<HTMLElement>
        }
        main:{
            fadeInOptions:JQuery.EffectsOptions<HTMLElement>
            fadeOutOptions:JQuery.EffectsOptions<HTMLElement>
        }
    }
    showExample:{
        domNodeName:string
        htmlWrapper:string
        pattern:string
    }
}
export type Options = BaseOptions & DefaultOptions
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
