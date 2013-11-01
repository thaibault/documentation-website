#!/bin/bash --login

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

# Prints a dummy documentation content.
function printDummyDocumentationContent() {
    cat << EOF
<h1 id="content">
    Content<!--deDE:Inhalt-->
</h1>
<div class="toc">
    <ul>
        <li>
            <a href="#content">Content<!--deDE:Inhalt--></a>
        </li>
        <li>
            <a href="#getting-in">Getting in<!--deDE:Einstieg--></a>
            <ul>
                <li><a href="#a">a</a></li>
                <li><a href="#b">b</a></li>
            </ul>
        </li>
        <li><a href="#c">c</a>
        <ul>
            <li>
                <a href="#d">d</a>
                <ul><li><a href="#e">e</a></li></ul>
            </li>
        </ul>
    </ul>
</div>
<h1 id="getting-in">Getting in<!--deDE:Einstieg--></h1>
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
<div class="codehilite">
    <pre>&gt;&gt;&gt; /path/to/boostNode/runnable/macro.py -p /path/to/boostNode -e py</pre>
</div>
<!--showExample: javaScript-->
<table class="codehilitetable">
    <tbody>
        <tr>
            <td class="linenos">
                <div class="linenodiv">
                    <pre> 1
 2
 3
 4
 5
 6</pre>
                </div>
            </td>
            <td class="code">
                <div class="codehilite">
                    <pre><span class="err">#</span><span class="o">!</span><span class="err">/usr/bin/env javaScript</span>

<span class="kd">var</span> <span class="nx">tools</span> <span class="o">=</span> <span class="nx">jQuery</span><span class="p">.</span><span class="nx">Tools</span><span class="p">({</span><span class="s1">&#39;logging&#39;</span><span class="o">:</span> <span class="kc">true</span><span class="p">});</span>
<span class="c1">// An 80 chars comment: mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</span>
<span class="c1">// A 120 chars comment: mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</span>
<span class="nx">tools</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;test&#39;</span><span class="p">);</span>
</pre>
                </div>
            </td>
        </tr>
    </tbody>
    <tbody>
        <tr>
            <td class="linenos">
                <div class="linenodiv">
                    <pre> 10
 11
 12
 100
 111
 999</pre>
                </div>
            </td>
            <td class="code">
                <div class="codehilite">
                    <pre><span class="err">#</span><span class="o">!</span><span class="err">/usr/bin/env javaScript</span>

<span class="kd">var</span> <span class="nx">tools</span> <span class="o">=</span> <span class="nx">jQuery</span><span class="p">.</span><span class="nx">Tools</span><span class="p">({</span><span class="s1">&#39;logging&#39;</span><span class="o">:</span> <span class="kc">true</span><span class="p">});</span>
<span class="c1">// An 80 chars comment: mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</span>
<span class="c1">// A 120 chars comment: mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</span>
<span class="nx">tools</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;test&#39;</span><span class="p">);</span>
</pre>
                </div>
            </td>
        </tr>
    </tbody>
</table>
<h3 id="e">e</h3>
<p>
    Lorem ipsum dolor sit amet...
</p>
EOF
    }

for render_file_path in index.html.tpl coffeeScript/main.coffee.tpl; do
    template "$render_file_path" --scope-variables \
        TAGLINE='tagline' NAME='productName' LANGUAGE='en' \
        GOOGLE_TRACKING_CODE='google_traking_code' \
        RENDERED_MARKDOWN="$(printDummyDocumentationContent)" \
    1>"$(sed --regexp-extended 's/^(.+)\.[^\.]+$/\1/g' <<< \
        "$render_file_path")"
done
