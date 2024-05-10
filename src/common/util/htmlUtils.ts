import DOMPurify from 'isomorphic-dompurify'

export function sanitizeHTML(htmlContent: string): string {
  return DOMPurify.sanitize(htmlContent, { ADD_TAGS: ['iframe'] })
}

/**
 * Extracts the iframe video, sanitizes the HTML input
 * @param htmlContent The html content as string
 * @returns iframe HTML as string, sanitized HTML content as a string
 */
export function HTMLContentSeparator(htmlContent: string, separateIframe = false) {
  const parser = new DOMParser()
  const articleDescription = sanitizeHTML(htmlContent)
  const html = parser.parseFromString(articleDescription, 'text/html')
  const articleVideo = html.body.querySelector('.ql-video')
  articleVideo?.setAttribute('loading', 'lazy')

  if (separateIframe && articleVideo) {
    html.body.removeChild(articleVideo)
    return [articleVideo.outerHTML, html.body.outerHTML]
  }

  return ['', html.body.outerHTML]
}
