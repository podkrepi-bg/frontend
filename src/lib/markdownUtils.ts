import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { Plugin } from 'unified'
import { Root } from 'mdast'
import TurndownService from 'turndown'
import sanitizeHtml from 'sanitize-html'

// convert `::youtube` directive into an iframe.
const myRemarkPlugin: Plugin<[], Root> = () => {
  return (tree, file) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (node.name !== 'youtube') return

        const data = node.data || (node.data = {})
        const attributes = node.attributes || {}
        const id = attributes.id

        if (node.type === 'textDirective')
          file.fail('Text directives for `youtube` not supported', node)
        if (!id) file.fail('Missing video id', node)

        data.hName = 'iframe'
        data.hProperties = {
          src: 'https://www.youtube.com/embed/' + id,
          width: 200,
          height: 200,
          frameBorder: 0,
          allow: 'picture-in-picture',
          allowFullScreen: true,
        }
      }
    })
  }
}

export async function markdownToHtml(markdown: string) {
  return String(
    await unified()
      .use(remarkParse)
      .use(remarkDirective)
      .use(myRemarkPlugin)
      .use(remarkRehype)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(markdown),
  )
}

export function htmlToMarkdown(html: string) {
  const turndownService = new TurndownService()

  turndownService.addRule('youtube', {
    filter: ['iframe'],
    replacement: function (_, node) {
      const youtubeSrc = (node as HTMLElement).getAttribute('src')
      if (!youtubeSrc) {
        throw new Error('Found an iframe without a src')
      }
      const youtubeId = new URL(youtubeSrc).pathname.split('/').at(-1)
      return `::youtube{#${youtubeId}}\n`
    },
  })

  const BOGUS_SPAN_STYLE = new Set<string | null>([
    'color: rgb(34, 34, 34);',
    'background-color: transparent; color: rgb(0, 0, 0);',
  ])

  turndownService.addRule('quillSpan', {
    filter: (node) => {
      if (node.nodeName === 'SPAN') {
        return BOGUS_SPAN_STYLE.has(node.getAttribute('style'))
      }
      return false
    },
    replacement: function (content) {
      return content
    },
  })

  // keep images as html, so that we can have dimensions
  turndownService.addRule('img', {
    filter: (node) => {
      return node.nodeName === 'IMG'
    },
    replacement: function (_, node) {
      return (node as HTMLImageElement).outerHTML
    },
  })

  const sanitizedHtml = sanitizeHtml(html, {
    allowedTags: [
      'p',
      'b',
      'i',
      'em',
      'strong',
      'a',
      'iframe',
      'img',
      'blockquote',
      'ul',
      'ol',
      'li',
    ],
    allowedAttributes: {
      a: ['href'],
      img: ['src', 'alt', 'width', 'height'],
      iframe: ['src'],
    },
    allowedIframeHostnames: ['www.youtube.com'],
  })
    // normalize to straight quotes. We will use smartyPants to convert to curly quotes later.
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D\u201E]/g, '"')
    // merge adjacent formatting tags
    // remove accidental formatting, like a single quote or coma being in italics
    .replace(/(<\/(em)>)(.{0,3})(<(em)>)/g, '$3')
    .replace(/(<\/(strong)>)(.{0,3})(<(strong)>)/g, '$3')
    .replace(/(<(em)>)(.{0,3})(<\/(em)>)/g, '$3')
    .replace(/(<(strong)>)(.{0,3})(<\/(strong)>)/g, '$3')

  console.log(turndownService.turndown(sanitizedHtml))

  return turndownService.turndown(sanitizedHtml)
}
