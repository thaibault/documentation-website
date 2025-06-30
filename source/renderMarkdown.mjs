import {Marked} from 'marked'
import {gfmHeadingId} from 'marked-gfm-heading-id'
import {markedHighlight} from 'marked-highlight'
import highlightJSModule from 'highlight.js'
import {markedXhtml} from 'marked-xhtml'

const {getLanguage, highlight} = highlightJSModule

const marked = new Marked(
    markedHighlight({
        // A string to prefix the className in a <code> block. Useful for syntax highlighting.
        langPrefix: 'language-',
        highlight: (code, lang, info) =>
            highlight(
                code, {language: getLanguage(lang) ? lang : 'plaintext'}
            ).value
    })
)

const {parse, use} = marked

use(self.module.preprocessor.ejs.options.locals.MARKED_OPTIONS)
// Include an id attribute when emitting headings (h1, h2, h3, etc).
use(gfmHeadingId({prefix: 'doc-'}))
// Favors self-closing xhtml tags.
use(markedXhtml())

export default parse
