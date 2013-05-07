<% # region locations 

<% IMAGE_PATH = 'image/'
<% IMAGE_APPLE_TOUCH_ICON_PATH = IMAGE_PATH + 'appleTouchIcon/'

<% LESS_PATH = 'less/'
<% STYLE_SHEET_PATH = 'styleSheet/'

<% COFFEE_SCRIPT_PATH = 'coffeeScript/'
<% JAVA_SCRIPT_PATH = 'javaScript/'

<% # endregion

<!DOCTYPE html>
<html>

<!--region header-->

    <head>
        <meta charset='utf-8' />
        <meta http-equiv="X-UA-Compatible" content="chrome=1" />
        <meta name="description" content="<%tagline%>" />
        <title><%name%></title>
        <link rel="stylesheet" type="text/css" media="screen" href="<%STYLE_SHEET_PATH%>main.css">

        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<%IMAGE_APPLE_TOUCH_ICON_PATH%>144x144-precomposed.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<%IMAGE_APPLE_TOUCH_ICON_PATH%>114x114-precomposed.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<%IMAGE_APPLE_TOUCH_ICON_PATH%>72x72-precomposed.png" />
        <link rel="apple-touch-icon-precomposed" href="<%IMAGE_APPLE_TOUCH_ICON_PATH%>57x57-precomposed.png" />
        <link rel="shortcut icon" type="image/x-icon" href="<%IMAGE_PATH%>favicon.ico" />

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]><script src="<%JAVA_SCRIPT_PATH%>html5shiv-3.6.2.js"></script><![endif]-->
        <script type="text/javascript" src="<%JAVA_SCRIPT_PATH%>coffeeScript-1.6.2.js"></script>
        <script type="text/coffeescript" src="<%COFFEE_SCRIPT_PATH%>require-1.0.coffee"></script>
        <script type="text/coffeescript" src="<%COFFEE_SCRIPT_PATH%>main.coffee"></script>
    </head>

<!--endregion-->

    <body>

<!--region body-->

        <div id="header_wrap" class="outer">
            <header class="inner">
                <a id="forkme_banner" href="https://github.com/thaibault/<%name%>">View on GitHub</a>
                <h1 id="project_title"><%name%></h1>
                <h2 id="project_tagline"><%tagline%></h2>
                <section id="downloads">
                    <a class="zip_download_link" href="https://github.com/thaibault/<%name%>/zipball/master">Download this project as a .zip file</a>
                    <a class="tar_download_link" href="https://github.com/thaibault/<%name%>/tarball/master">Download this project as a tar.gz file</a>
                </section>
            </header>
        </div>
        <div id="main_content_wrap" class="outer">
            <section id="main_content" class="inner">
                <% print(rendered_markdown)
            </section>
            <section id="legal-notice" class="legal-notice">
                <p>
                    Anbieter:
                    <br />
                    Torben Sickert
                    <br />
                    Christoph-Mang-Str. 14
                    <br />
                    79100 Freiburg
                    <br />
                    Tel. 0049 (0) 176 / 10248185
                    <br />
                    Internet: <a href="http://thaibault.github.io/<%name%>">http://thaibault.github.io/<%name%></a>
                    <br />
                    Email: <a href="mailto:t.sickert@gmail.com">t.sickert@gmail.com</a>
                </p>
            </section>
        </div>

    <!--region footer-->

        <div id="footer_wrap" class="outer">
            <footer class="inner">
                <p class="copyright">
                    <%name%> maintained by <a href="https://github.com/thaibault">thaibault</a>
                </p>
                <a href="#legal-notice">legal notice</a>
            </footer>
        </div>
        
    <!--endregion-->

        <script type="text/javascript">
            var gaJsHost = (('https:' === document.location.protocol) ? 'https://ssl.' : 'http://www.');
            document.write(unescape('%3Cscript src="' + gaJsHost + 'google-analytics.com/ga.js" type="text/javascript"%3E%3C/script%3E'));
            try {
                var pageTracker = _gat._getTracker('<%google_traking_code%>');
                pageTracker._trackPageview();
            } catch(err) {}
        </script>

<!--endregion-->

    </body>
</html>
