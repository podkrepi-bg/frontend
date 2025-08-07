import { ContentType } from '../contents/content-type'
import { filterFaqQuestionByVisibility, filterFaqQuestionBySearchKeyword } from './filters'

export function removeHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, '')
}

/**
 * Traverse any props.children to get their combined text content.
 *
 * Note: This does not add whitespace for readability: `<p>Hello <em>world</em>!</p>`
 * yields `Hello world!` as expected, but `<p>Hello</p><p>world</p>` returns
 * `Helloworld`, just like https://mdn.io/Node/textContent does.
 *
 * Source: https://stackoverflow.com/a/63173682/1265111
 */
export function getTextContentFromJSX(elem: React.ReactElement | string): string {
  if (!elem) {
    return ''
  }

  if (typeof elem === 'string') {
    return elem
  }

  const children = elem.props && elem.props.children
  if (children instanceof Array) {
    return children.map(getTextContentFromJSX).join('')
  }

  return getTextContentFromJSX(children)
}

export function filterFaqQuestions(
  faqPageData: Record<string, ContentType[]>,
  searchKeyword: string,
): Record<string, ContentType[]> {
  const filteredFaqQuestions: Record<string, ContentType[]> = {}

  for (const categoryKey in faqPageData) {
    const faqQuestions = faqPageData[categoryKey]
      .filter(filterFaqQuestionByVisibility)
      .filter((question) => filterFaqQuestionBySearchKeyword(question, searchKeyword))

    if (faqQuestions.length > 0) {
      filteredFaqQuestions[categoryKey] = faqQuestions
    }
  }

  return filteredFaqQuestions
}
