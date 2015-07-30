#!/bin/bash --login

# region header

# Copyright Torben Sickert 16.12.2012

# License
#    This library written by Torben Sickert stand under a creative commons
#    naming 3.0 unported license.
#    see http://creativecommons.org/licenses/by/3.0/deed.de

# endregion

# Prints a dummy documentation content.
function printDummyDocumentationContent() {
    cat << EOF
h2(id="content")
    Content
    //deDE:Inhalt
//|frFR:franz
//|deDE:deutsch
h3(id="a") english
div.toc: ul
    li: a(href="#") english
    li: a(href="#") english
    li: a(href="#content")
        | Content
        //deDE:Inhalt
    li
        //|deDE:JAU
        a(href="#content") Vor
    li: a(href="#getting-in")
        | Getting in
        //deDE:Einstieg
        ul
            li: a(href="#a") a
            li: a(href="#b") b
    li: a(href="#c") c
    ul: li
        a(href="#d") d
        ul: li: a(href="#e") e
h2(id="getting-in")
    langreplace
        | Getting
        code inline
        | in
    //deDE:Einstieg<code>inline code</code>
p Englisch//deDE:Deutsch ipsum dolor sit amet...
h3(id="a") a
p
    | Lorem ipsum dolor sit amet
    code mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
h3(id="b") b
p Lorem ipsum dolor sit amet...
h2(id="c") c
p Lorem ipsum dolor sit amet...
h3(id="d") d
p Lorem ipsum dolor sit amet...
div.codehilite
    pre &gt;&gt;&gt; /path/to/boostNode/runnable/macro.py -p /path/to/boostNode -e py
div.codehilite
    pre &gt;&gt;&gt; /path/to/boostNode/runnable/macro.py -p /path/to/boostNode -e py --looooooooong options -shorter
//showExample
table.codehilitetable: tr
    td.linenos: div.linenodiv: pre
        | 1
        | 2
        | 3
    td.code: div.codehilite: pre
        span.nt &lt;form
        span.na method=
        span.s &quot;get&quot;
        span.na action=
        span.s &quot;#&quot;
        span.nt &gt;
        span.nt &lt;input
        span.na class=
        span.s &quot;form-control&quot;
        span.na type=
        span.s &quot;text&quot;
        span.na name=
        span.s &quot;test&quot;
        span.na value=
        span.s &quot;4&quot;
        span.nt /&gt;
        span.nt &lt;/form&gt;
p
    | Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor
    | sit amet. Lorem ipsum dolor sit amet. sit amet. Lorem ipsum dolor sit
    | amet. sit amet. Lorem ipsum dolor sit amet. sit amet. Lorem ipsum dolor
    | sit amet. sit amet. Lorem ipsum dolor sit amet...
//showExample
div.codehilite: pre &lt;p&gt;test text&lt;/p&gt;
p Lorem ipsum dolor sit amet...
//showExample:js
div.codehilite: pre window.test = 5 * 2;
p Lorem ipsum dolor sit amet...
//showExample:css
div.codehilite: pre border: 0px solid black;
p Lorem ipsum dolor sit amet...
table.codehilitetable: tbody: tr
    td.linenos: div.linenodiv: pre
        | 10
        | 11
        | 12
        | 100
        | 111
        | 999
    td.code: div.codehilite: pre
        span.err #
        span.o !
        span.err /usr/bin/env javaScript
        span.kd var
        span.nx tools
        span.o =
        span.nx jQuery
        span.p .
        span.nx Tools
        span.p ({
        span.s1 &#39;logging&#39;
        span.o :
        span.kc true
        span.p });
        span.kd var
        span.nx tools
        span.o =
        span.nx jQuery
        span.p .
        span.nx Tools
        span.p ({
        span.s1 &#39;logging&#39;
        span.o :
        span.kc true
        span.p });
        span.c1 // An 79 chars comment: mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
        span.nx tools
        span.p .
        span.nx log
        span.p (
        span.s1 &#39;test&#39;
        span.p );
        span.nx tools
        span.p .
        span.nx log
        span.p (
        span.s1 &#39;test&#39;
        span.p );
h3(id="e") e
table.codehilitetable: tr
    td.linenos: div.linenodiv: pre
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        |10
        |11
        |12
        |13
        |14
        |15
        |16
        |17
        |18
    td.code: div.codehilite: pre
        span.c #!/usr/bin/env bash

        cat
        | span.s &lt;&lt; EOF
        span.s Usage: $0 &lt;initramfsFilePath&gt; [options]

        span.s $__NAME__ installs an arch linux into an initramfs file.

        span.s Option descriptions:

        span.s \$(installArchLinuxPrintCommandLineOptionDescriptions &quot;\$@&quot; | \
        span.s     sed &#39;/^ *-[a-z] --output-system .*$/,/^$/d&#39;)
        span.s EOF

        span.nv myTarget
        span.o =
        span.k \$(
        mktemp
        span.k )

        | installArchLinux
        span.s2 &quot;\$@&quot;
        | --output-system
        span.nv \$myTarget

        span.c # test...
p Lorem ipsum dolor sit amet...
EOF
    }

for render_file_path in index.jade.tpl coffeeScript/main.coffee.tpl; do
    template "$render_file_path" --pretty-indent --scope-variables \
        TAGLINE='tagline' NAME='productName' LANGUAGE='en' LANGUAGES='' \
        GOOGLE_TRACKING_CODE='google_traking_code' \
        URL='https://github.com/thaibault/documentationWebsite' \
        SOURCE_URL='https://github.com/thaibault/documentationWebsite' \
        RENDERED_MARKDOWN="$(printDummyDocumentationContent)" \
    1>"$(sed --regexp-extended 's/^(.+)\.[^\.]+$/\1/g' <<< "$render_file_path")"
done

# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion
