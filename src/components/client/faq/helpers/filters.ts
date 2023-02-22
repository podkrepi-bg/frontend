import { ContentType } from '../contents/content-type'
import { getTextContentFromJSX } from './utils'

export const filterFaqQuestionByVisibility = (question: ContentType): boolean => {
  return question.visible ?? false
}

// Note: When there is only a match inside the content of the question (not the header)
// there is no visual feedback for the user which is not a good UX.
// Maybe we need to consider to un-collapse the content of the questions in those cases?
export const filterFaqQuestionBySearchKeyword = (
  question: ContentType,
  searchKeyword: string,
): boolean => {
  const keyword = searchKeyword.toLowerCase()
  const header = question.header.toLocaleLowerCase()
  const content = getTextContentFromJSX(question.content).toLowerCase() // Note: Maybe find a better way to parse the content of the JSX

  return header.includes(keyword) || content.includes(keyword)
}
