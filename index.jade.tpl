doctype html

<% # sync with
<% # skillKeywordsEnglish.txt
<% # skillKeywordsGerman.txt
<% # projectDescriptionEnglish.txt
<% # projectDescriptionGerman.txt
<% # https://www.xing.com/
<% # https://www.linkedin.com/
<% # https://www.facebook.com/
<% # https://plus.google.com

<% # region header

<% # Copyright Torben Sickert 16.12.2012

<% # License
<% # =======

<% # This library written by Torben Sickert stand under a creative commons naming
<% # 3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

<% # endregion

<% # region language

<% DEFAULT_LANGUAGE = 'enUS'
<% ALTERNATE_LANGUAGE = 'deDE'

<% # endregion

<% # region location

<% IMAGE_PATH = 'image/'

<% LESS_PATH = 'less/'
<% CASCADING_STYLE_SHEET_PATH = 'cascadingStyleSheet/'

<% COFFEE_SCRIPT_PATH = 'coffeeScript/'
<% JAVA_SCRIPT_PATH = 'javaScript/'

<% DATA_PATH = 'data/'
<% LINK_PUBLIC_SSH_KEY_PATH = DATA_PATH + 'publicSSHKey.txt'
<% LINK_V_CARD_PATH = DATA_PATH + 'vCard.vcf'
<% LINK_CURRICULUM_VITAE_DEFAULT_LANGUAGE_PATH = DATA_PATH + 'curriculumVitae%s.pdf' % DEFAULT_LANGUAGE.swapcase()
<% LINK_CURRICULUM_VITAE_ALTERNATE_LANGUAGE_PATH = DATA_PATH + 'curriculumVitae%s.pdf' % ALTERNATE_LANGUAGE.swapcase()

<% # endregion

<% # region runtime

<% START_UP_ANIMATION_NUMBER = 1

<% # endregion

<% # region content

<% SOCIAL_MEDIA = (
<%     ('e-mail', 't.sickert@gmail.com'),
<%     ('github', 'https://github.com/thaibault'),
<%     ('google_plus', 'https://plus.google.com/+TorbenSickert'),
<%     ('xing', 'http://www.xing.com/profile/Torben_Sickert'),
<%     ('linked_in', 'http://de.linkedin.com/pub/torben-sickert/28/aa9/919'),
<%     ('skype', 'skype:t.sickert?add'),
<%     ('twitter', 'https://twitter.com/tsickert'),
<%     ('facebook', 'https://de-de.facebook.com/tsickert'),
<%     ('website', 'http://thaibault.github.com'))
<% SECTIONS = (
<%     ('about', (
<%         {'enUS': 'About me', 'deDE': 'Über mich'}, {'enUS': '', 'deDE': ''},
<%         {'enUS': "I'm ambitious and love the challenge",
<%          'deDE': 'Ich bin ambitioniert und liebe die Herausforderung'})),
<%     ('contact', (
<%         {'enUS': 'Contact', 'deDE': 'Kontakt'},
<%         {'enUS': 'Get in touch', 'deDE': 'Lernen wir uns kennen'},
<%         {'enUS': "I'm a freelancer, ready to help you. Let's talk about "
<%                  "your project and what I can do.",
<%          'deDE': 'Ich arbeite selbständig und bin bereit für Ihr Projekt. '
<%                  'Kontaktieren Sie mich und wir sprechen über Ihr '
<%                  'Vorhaben.'})),
<%     ('work', (
<%         {'enUS': 'Work', 'deDE': 'Arbeiten'},
<%         {'enUS': "I love what I'm doing",
<%          'deDE': 'Ich liebe was ich mache'},
<%         {'enUS': 'I offer', 'deDE': 'ich biete'},
<%         {'enUS': (
<%              ('abstract', (
<%                   'contacts', 'conception',
<%                   'Implementation and optimization of applications for the '
<%                   'web; desktop and server', 'quality Assurance',
<%                   'High Reliability Applications', 'Test-driven Design',
<%                   '(Web)programming', 'Usability',
<%                   'Web and search engine optimization',
<%                   'administering servers on Linux, Mac or Windows',
<%                   'Intranet Solutions', 'Community Portal solution',
<%                   'Accessibility', 'Rich Internet Applications',
<%                   'Content Management Systems', 'Web 2.0')),
<%              ('security', (
<%                   'Design by Contract',
<%                   'Integration, application, and unit tests',
<%                   'Proofs of program properties')),
<%              ('knowledge', (
<%                   'economic theoretical knowledge',
<%                   'matic computerized knowledge',
<%                   'mathematical knowledge')),
<%              ('programing Techniques', (
<%                   'Functionally oriented programming',
<%                   'Imperative Oriented Programming',
<%                   'Object-Oriented Programming',
<%                   'Aspect-Oriented Programming')),
<%              ('database', (
<%                   'Object-Relational Modeling (ORM) with SQLAlchemy or '
<%                   'Django ORM', 'SQL')),
<%              ('versioning', ('GIT', 'SVN', 'CVS', 'Mercurial')),
<%              ('programing Language', (
<%                   'Python', 'CoffeeScript', 'JavaScript', 'C++', 'C',
<%                   'C# (mit XNA)', 'Java', 'Scheme', 'PHP')),
<%              ('declarative Language', ('XHTML', 'CSS', 'less')),
<%              ('server', ('apache', 'nginx')),
<%              ('framework', (
<%                  'AngularJS', 'django', 'jQuery', 'Mootools', 'Bootstrap'))
<%         ), 'deDE': (
<%              ('Abstrakt', (
<%                  'Kontakte', 'Konzeption',
<%                  'Umsetzung und Optimierung von Anwendungen fürs Web, '
<%                  'Desktop und Server', 'Qualitätssicherung',
<%                  'Hochzuverlässigkeits-Anwendungen', 'Test-driven Design',
<%                  '(Web)Programmierung', 'Usabillity', 'Web- und '
<%                  'Suchengine-Optimierung',
<%                  'Administrierung für Server auf Linux Mac oder Windows',
<%                  'Intranet Lösungen', 'Community Portallösung',
<%                  'Barrierefreiheit', 'Rich Internet Applications',
<%                  'Content Management Systeme', 'Web 2.0', 'ERP', 'CRM')),
<%              ('Sicherheit', (
<%                  'Design by Contract',
<%                  'Integrationstests, Ende-zu-Ende-Tests und Unit-Tests',
<%                  'Beweisen von Programmeigenschaften')),
<%              ('Wissen', (
<%                  'wirtschaftstheoretisches Wissen', 'informatisches Wissen',
<%                  'mathematisches Wissen')),
<%              ('Programmiertechniken', (
<%                  'Funktionalorientierte Programmierung',
<%                  'Imperativorientierte Programmierung',
<%                  'Objektorientierte Programmierung',
<%                  'Aspektorientierte Programmierung')),
<%              ('Datenbanken', (
<%                  'Relationale-Objekt-Modelierung (ORM) mit sqlAlchemy oder '
<%                  'Django ORM', 'SQL')),
<%              ('Versionierung', ('GIT', 'SVN', 'CVS', 'Mercurial')),
<%              ('Programmiersprachen', (
<%                  'Python', 'CoffeeScript', 'JavaScript', 'C++', 'C',
<%                  'C# (mit XNA)', 'Java', 'Scheme', 'PHP')),
<%              ('Deklarative Sprachen', ('XHTML', 'CSS', 'less')),
<%              ('Server', ('apache', 'nginx')),
<%              ('Framework', (
<%                  'AngularJS', 'django', 'jQuery', 'Mootools', 'Bootstrap'))
<%         )}, {'enUS': 'Projects', 'deDE': 'Projekte'})))
<% PROJECTS = (
<%     ('boostNode', 'http://thaibault.github.com/boostNode',
<%      {'enUS': (
<%          'A universal python framework for platform independent application'
<%          ' developement with web technoligies. The framework provides High '
<%          'reliability features:',
<%          ('100% branch coverage tested',
<%           'Type checking in development mode',
<%           'Cyclomatic complexity smaller than eight',
<%           'Full API documentation '
<%           'http://thaibault.github.com/boostNode/api',
<%           'Always compatible with the latest versions of both Python '
<%           'through integrated macros',
<%           'Platform independent web-view and flexible multi-process and '
<%           'multi-threaded Web server')),
<%       'deDE': (
<%          'Ein universelles Python-Framework zur Anwendung von '
<%          'plattformunabhängigen Desktopanwendungen mit '
<%          'Web-Technologien. Das Framework bietet '
<%          'Hochzuverlässigkeitsmerkmale:',
<%          ('100% branch coverage getestet',
<%           'Type checking im Entwicklungsmodus',
<%           'zyklomatische Komplexität kleiner acht',
<%           'vollständige API-Dokumentation '
<%           'http://thaibault.github.com/boostNode/api',
<%           'stets kompatibel zu den neusten beiden Pythonversionen durch '
<%           'integrierte Macros',
<%           'plattformunabhängige Web-View und flexibler multiprozess- und '
<%           'multithread Web-Server'))}),
<%     ('archInstall', 'http://archinstall.github.com',
<%      {'enUS': (
<%          'Install a configured ArchLinux with pacman as a package '
<%          'management in any places such as hard drives, USB flash drive, '
<%          'partition, or in an existing system as a sandbox environment. '
<%          'Automatic configuration of existing posix compliant unix-like '
<%          'systems. Both online and Offline installations are possible. Even'
<%          ' without root privileges, the system is able to be installed into'
<%          ' its own environment below the home folder. All required '
<%          'dependencies could be served via a typical posix environment '
<%          'given by Busybox or ArchLinux itself.',),
<%       'deDE': (
<%          'Installiere ein konfiguriertes ArchLinux mit Pacman als '
<%          'Paketverwaltung an beliebige Orte wie Festplatten, USB-Stick, '
<%          'alternative Partition oder in das bestehende System als '
<%          'Sandboxumgebung. Automatische Konfiguration bestehender posix '
<%          'konformer unix-artiger Systeme. Sowohl Online- als auch '
<%          'Offline-Installationen sind möglich. Selbst ohne root Rechte '
<%          'kann das System in eine eigene Umgebung unterhalb des Home-Ordner'
<%          ' installiert werden. Alle benötigten Abhängigkeiten zum '
<%          'Aufsetzen sind durch eine einfache posix-Umgebung gegeben wie '
<%          'Busybox oder ArchLinux selbst.',)}),
<%     ('genericServiceHandler',
<%      'http://thaibault.github.com/genericServiceHandler',
<%      {'enUS': (
<%          'This bash module provides a generic service handlers to control '
<%          'any services which support standard process signals. The project '
<%          'is inspired by the systemd service handling and can live in any '
<%          'unix-like environment. It is particularly suitable for beeing '
<%          "integrated into the operating system's boot and shutdown "
<%          'process.',),
<%       'deDE': (
<%          'Dieses bash-Modul bietet einen generischen Service-Handler zur '
<%          'Steuerung jeglicher Dienste, welche standard Prozesssignale '
<%          'unterstützen. Das Projekt ist vom Systemd-Service-Handling '
<%          'inspiriert und kann in jeder unix-artigen Umgebung eingesetzt '
<%          'werden. Es eignet sich besonders um Dienste in den Hoch- und '
<%          'Herunterfahr-Prozess des Betriebssystems einzubetten.',)}),
<%     ('require', 'http://thaibault.github.com/require',
<%      {'enUS': (
<%          'This native JavaScript modules offers a full import mechanism for'
<%          ' JavaScript as it is known from python, php, or ruby. This makes '
<%          'it possible that each JavaScript file defines its own '
<%          'dependencies, and no global list of required files in the '
<%          'html-header have to be maintained. A decisive advantage over '
<%          '"RequireJS" or "YepNope" is that nested dependencies could be '
<%          'determined automatically. The inclusion of less, coffee script or'
<%          ' css is also possible. In addition, it can add corresponding '
<%          '"handler" allowing to generate the browser corresponding source '
<%          'maps or other actions.',),
<%       'deDE': (
<%          'Dieses native JavaScript Module bietet einen vollständigen '
<%          'Importmechanismus für JavaScript wie es aus python, php, oder '
<%          'ruby bekannt ist. Hierdurch wird es möglich, dass jede JavaScript'
<%          ' Datei seine eigenen Abhängigkeiten definiert und keine globale '
<%          'iListe an benötigten Dateien im html-Header verwaltet werden '
<%          'muss. Entschiedener Vorteil gegenüber "RequireJS" oder "YepNope" '
<%          'besteht darin, dass auch die Abhängigkeiten der Abhängigkeiten '
<%          'beliebig tief in einer topologischen Sortierung aufgelöst werden '
<%          'können. Das Einbinden von less, coffeeScript oder css ist '
<%          'ebenfalls möglich. Zudem können sich entsprechende "Handler" '
<%          'hinzufügen lassen um im Browser entsprechende SourceMaps zu '
<%          'generieren oder sonstige Aktionen auszulösen.',)}),
<%     ('jQuery-tools', 'http://thaibault.github.com/jQuery-tools',
<%      {'enUS': (
<%          'jQuery-tools brings an object oriented jQuery Plugin concept. It '
<%          'provides a class pattern structure similar to MooTools or '
<%          'Prototype. In Addition many reusable helper and a cool controller'
<%          ' logic is included. Furthermore some handler for dealing with '
<%          'mutual exclusion, scope-based event handling and some low-level '
<%          'extensions for native data types are available. Example '
<%          'implementations can be found in the projects:', (
<%              ('jQuery-storeLocator',
<%               'http://thaibault.github.com/jQuery-storeLocator'),
<%              ('jQuery-incrementer',
<%               'http://thaibault.github.com/jQuery-incrementer'),
<%              ('jQuery-lang', 'http://thaibault.github.com/jQuery-lang'),
<%              ('jQuery-website',
<%               'http://thaibault.github.com/jQuery-website'),
<%              ('My personal website', 'http://thaibault.github.com'))),
<%       'deDE': (
<%          'jQuery-tools ist ein auf jQuery aufsetzendes Plugin, um '
<%          'objektorientierte jQery-Plugins ähnlich wie bei MooTools oder '
<%          'Prototype zu erstellen. Verschiedene generische Software-Pattern '
<%          'werden durch eine wiederverwendbare Controller-Logik möglich. '
<%          'Zudem werden einige nützliche Werkzeuge zum Bauen von grafischen '
<%          'Oberflächen angeboten wie Wechselseitiger Ausschluss, '
<%          'Scope-basiertes Event-Handling und einige Low-Level '
<%          'Erweiterungen für native Datentypen. Beispiel-Implementierungen '
<%          'findet sich in den Projekten:', (
<%              ('jQuery-storeLocator',
<%               'http://thaibault.github.com/jQuery-storeLocator'),
<%              ('jQuery-incrementer',
<%               'http://thaibault.github.com/jQuery-incrementer'),
<%              ('jQuery-lang', 'http://thaibault.github.com/jQuery-lang'),
<%              ('jQuery-website',
<%               'http://thaibault.github.com/jQuery-website'),
<%              ('Meine persönliche Website', 'http://thaibault.github.com')
<%          ))}))

<% # endregion

html(lang='en')

    // region header

    head

        // region meta informations

        meta(charset='utf-8')
        meta(
            name='description'
            content='development responsive python javascript coffeescript bash design')
        meta(name='author' content='Torben Sickert')
        meta(name='viewport' content='width=device-width, initial-scale=1.0')

        // endregion

        title Torben Sickert development

        // region fav and touch icons

        link(
            rel='shortcut icon' type='image/x-icon'
            href='<% IMAGE_PATH %>favicon.ico')

        // endregion

        // region resources

        link(
            type='text/css' rel='stylesheet/less' media='screen'
            href='<% LESS_PATH %>homePage-1.0.less')

        // HTML5 shim, for IE6-8 support of HTML5 elements
        <!--[if lt IE 9]><script src="<% JAVA_SCRIPT_PATH %>html5shiv-3.7.0.js"></script><![endif]-->

        script(
            src='<% COFFEE_SCRIPT_PATH %>require-1.0.coffee')
        script(
            type='text/coffeescript'
            src='<% COFFEE_SCRIPT_PATH %>main.coffee')

        // endregion

    // endregion

    // region body

    body.home-page.tools-hidden-on-javascript-enabled
        div.website-window-loading-cover.tools-visible-on-javascript-enabled
            div

        // region menu

        div.website-start-up-animation-number-<% START_UP_ANIMATION_NUMBER %>.navbar-wrapper
            div.container: div.navbar.navbar-inverse.navbar-static-top
                div.container
                    div.navbar-header
                        a.navbar-brand(href='#')
                            | thaibault
                            span.dimension-indicator
                        <% START_UP_ANIMATION_NUMBER += 1
                        a.tools-visible-on-javascript-enabled.website-start-up-animation-number-<% START_UP_ANIMATION_NUMBER %>(
                            href='#lang-<% ALTERNATE_LANGUAGE %>'
                        ) <% ALTERNATE_LANGUAGE[:-2] %>
                        button.navbar-toggle.tools-visible-on-javascript-enabled(
                            type='button' data-toggle='collapse'
                            data-target='.navbar-collapse'
                        )
                            <% for section in range(3):
                                span.icon-bar
                    div.navbar-collapse.collapse
                        div.navbar-highlighter.tools-visible-on-javascript-enabled
                        ul.nav.navbar-nav
                            <% for name, section in SECTIONS:
                                <% if section[0]:
                                    <% START_UP_ANIMATION_NUMBER += 1
                                    li.website-start-up-animation-number-<% START_UP_ANIMATION_NUMBER %><%' active' if name == SECTIONS[0][0] else ''%>
                                        a(ref='#<% name %>')
                                            | <% section[0][DEFAULT_LANGUAGE] %>
                                            //<% ALTERNATE_LANGUAGE %>:<% section[0][ALTERNATE_LANGUAGE] %>

        // endregion

        // region carousel

        div.carousel slide: div.carousel-inner:
            <% for name, section in SECTIONS:
                div.item <% name %>: div.carousel-image-<% name %>: div.container
                    <% if section[1][DEFAULT_LANGUAGE]:
                        h1(id='<% name %>')
                            | <% section[1][DEFAULT_LANGUAGE] %>
                            //<% ALTERNATE_LANGUAGE %>:<% section[1][ALTERNATE_LANGUAGE] %>
                    <% else:
                        //Serves as anchor point if javaScript isn't supported.
                        h1(id='<% name %>')
                    <% if name == 'work':
                        h2
                            | <% section[2][DEFAULT_LANGUAGE] %>
                            //<% ALTERNATE_LANGUAGE %>:<% section[2][ALTERNATE_LANGUAGE] %>
                        p
                            langReplace
                                <% for title, keywords in section[3][DEFAULT_LANGUAGE]:
                                    <% if title != section[3][DEFAULT_LANGUAGE][0][0]:
                                        strong <% title %>
                                    | <% ', '.join(keywords) %>
                            //
                                <% ALTERNATE_LANGUAGE %>:
                                <% for title, keywords in section[3][ALTERNATE_LANGUAGE]:
                                    <% if title != section[3][ALTERNATE_LANGUAGE][0][0]:
                                        <strong><% title %></strong>
                                    <% ', '.join(keywords) %>
                        h2
                            | <% section[4][DEFAULT_LANGUAGE] %>
                            //
                                <% ALTERNATE_LANGUAGE %>:
                                <% section[4][ALTERNATE_LANGUAGE] %>
                        dl.dl-horizontal
                            <% for project_name, project_page_link, project_description in PROJECTS:
                                dt: a(
                                    href='<% project_page_link %>'
                                    target='_blank'
                                ) <% project_name %>
                                dd
                                    | <% project_description[DEFAULT_LANGUAGE][0] %>
                                    //
                                        <% ALTERNATE_LANGUAGE %>:
                                        <% project_description[ALTERNATE_LANGUAGE][0] %>
                                    <% if length(project_description[DEFAULT_LANGUAGE]) > 1:
                                        ul
                                            <% for index, element in enumerate(project_description[DEFAULT_LANGUAGE][1]):
                                                li
                                                    <% if isTypeOf(element, Tuple):
                                                        langreplace: a(
                                                            href='<% element[1] %>'
                                                        ) <% element[0] %>
                                                        langreplacement
                                                            | <% ALTERNATE_LANGUAGE %>:
                                                            a(
                                                                href='<% project_description[ALTERNATE_LANGUAGE][1][index][1] %>'
                                                            ) <% project_description[ALTERNATE_LANGUAGE][1][index][0] %>
                                                    <% else:
                                                        | <% element %>
                                                        //
                                                            <% ALTERNATE_LANGUAGE %>:
                                                            <% project_description[ALTERNATE_LANGUAGE][1][index] %>
                    <% else:
                        p.lead
                            | <% section[2][DEFAULT_LANGUAGE] %>
                            //<% ALTERNATE_LANGUAGE %>:<% section[2][ALTERNATE_LANGUAGE] %>
                            <% if name == 'about':
                                a.visible-xs(
                                    href='<% LINK_CURRICULUM_VITAE_DEFAULT_LANGUAGE_PATH %>'
                                    target='_blank'
                                )
                                    | Curriculum Vitae (German)
                                    //<% ALTERNATE_LANGUAGE %>:Lebenslauf (Deutsch)
                                a.visible-xs(
                                    href='<% LINK_CURRICULUM_VITAE_ALTERNATE_LANGUAGE_PATH %>'
                                    target='_blank'
                                )
                                    | Curriculum Vitae (English)
                                    //<% ALTERNATE_LANGUAGE %>:Lebenslauf (Englisch)
                                a.hidden-xs(
                                    href='<% LINK_CURRICULUM_VITAE_DEFAULT_LANGUAGE_PATH %>'
                                    target='_blank'
                                )
                                    | Curriculum Vitae
                                    //<% ALTERNATE_LANGUAGE %>:Lebenslauf
                                a(
                                    href='<% LINK_V_CARD_PATH %>'
                                    target='_blank'
                                ) vCard
                    <% if name == 'contact':
                        a(href='tel:004917610248185')
                            | Phone
                            // <% ALTERNATE_LANGUAGE %>:Tel.
                            | +49 (0) 176
                            span /
                            | 10 248 185
                        <% for name, link in SOCIAL_MEDIA:
                            <% if '@' in link:
                                <% link = 'mailto:%s' % link
                            <% if 'website' == name:
                                a.glyphicon.glyphicon-globe(
                                    href='<% link %>' target='_blank')
                            <% else:
                                a.glyphicon-social.glyphicon-social-<% name %>(
                                    href='<% link %>' target='_blank')

        // endregion

        // region about this website

        div.about-this-website: div.carousel-image-about-this-website: div.container
            <% include
            h1(id='about-this-website')
                | About this website
                //<% ALTERNATE_LANGUAGE %>:Impressum
            h2
                | Contact
                //<% ALTERNATE_LANGUAGE %>:Kontakt
            div
                | Provider of
                //<% ALTERNATE_LANGUAGE %>:Anbieter von
                a(href='<% SOCIAL_MEDIA[-1][1] %>') <% SOCIAL_MEDIA[-1][1] %>
                | :
                br
                | Torben Sickert
                br
                | Christoph-Mang-Str. 14
                br
                | 79100 Freiburg
                br
                a(href='tel:004917610248185')
                    | Phone
                    //<% ALTERNATE_LANGUAGE %>:Tel.
                    | : +49 (0) 176
                    span /
                    | 10 248 185
                    br
                | Email:
                a(href='mailto:#') <% SOCIAL_MEDIA[0][1] %>
                br
                | Website
                //<% ALTERNATE_LANGUAGE %>:Webseite
                | :
                a(href='<% SOCIAL_MEDIA[-1][1] %>') <% SOCIAL_MEDIA[-1][1] %>
                br
                br
                a(href='<% LINK_PUBLIC_SSH_KEY_PATH %>' target='_blank')
                    | public ssh key
                    //<% ALTERNATE_LANGUAGE %>:öffentlicher SSH-Schlüssel
            <% include('aboutThisWebsite.jade')

        // endregion

        // region footer

        //
            Wrap the footer of the page in another container to center the
            content.
        <% START_UP_ANIMATION_NUMBER += 1
        div.website-start-up-animation-number-<% START_UP_ANIMATION_NUMBER %>.footer
            footer: p
                | &copy; 2013 Torben Sickert &middot;
                a(href='#about-this-website')
                    | about this website
                    //<% ALTERNATE_LANGUAGE %>:Impressum

        // endregion

        a(href='#top')
            | top
            //deDE:nach oben

    // endregion

//-
    region vim modline

    vim: set tabstop=4 shiftwidth=4 expandtab:
    vim: foldmethod=marker foldmarker=region,endregion:

    endregion
