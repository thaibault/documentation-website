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
        <script type="text/javascript" src="<%JAVA_SCRIPT_PATH%>jquery-1.9.1.js"></script>
        <script type="text/javascript" src="<%JAVA_SCRIPT_PATH%>jquery-scrollTo-1.4.3.1.js"></script>
        <script type="text/javascript">
            jQuery(function(jQuery) {
                jQuery('body div.toc a[href^="#"]').click(function(event) {
                    jQuery.scrollTo(jQuery(this).attr('href'), 'slow');
                });
            });
        </script>
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
        </div>

    <!--region footer-->

        <div id="footer_wrap" class="outer">
            <footer class="inner">
                <p class="copyright">
                    <%name%> maintained by <a href="https://github.com/thaibault">thaibault</a>
                </p>
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
