#!/bin/bash --login

# Copyright Torben Sickert 16.12.2012

# License
#    This library written by Torben Sickert stand under a creative commons
#    naming 3.0 unported license.
#    see http://creativecommons.org/licenses/by/3.0/deed.de

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# Prints a dummy documentation content.
function printDummyDocumentationContent() {
    sed ':a;N;$!ba;s/ *\n */ /g' << EOF
<h1 id="inhalt">Inhalt</h1>
<div class="toc">
    <ul>
        <li><a href="#inhalt">Inhalt</a></li>
        <li><a href="#einstieg">Einstieg</a></li>
            <ul>
                <li><a href="#a">a</a></li>
                <li><a href="#b">b</a></li>
            </ul>
        </li>
        <li><a href="#c">c</a>
        <ul>
            <li><a href="#d">d</a>
                <ul>
                    <li><a href="#e">e</a></li>
                </ul>
            </li>
        </ul>
    </ul>
</div>
<h1 id="einstieg">Einstieg</h1>
<p>
    Lorem ipsum dolor sit amet...
</p>
<h2 id="a">a</h2>
<p>
    Lorem ipsum dolor sit amet...
</p>
<h2 id="b">b</h2>
<p>
    Lorem ipsum dolor sit amet...
</p>
<h1 id="c">c</h1>
<p>
    Lorem ipsum dolor sit amet...
</p>
<h2 id="d">d</h2>
<p>
    Lorem ipsum dolor sit amet...
</p>
<h3 id="e">e</h2>
<p>
    Lorem ipsum dolor sit amet...
</p>
EOF
    }

template -l debug index.tpl --scope-variables \
    tagline?tagline name?productName google_traking_code?google_traking_code \
    rendered_markdown?"$(printDummyDocumentationContent)" \
1>index.html
