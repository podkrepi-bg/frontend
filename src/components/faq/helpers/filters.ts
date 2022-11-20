import { ContentType } from '../contents/content-type'

export const filterFaqQuestionByVisibility = (question: ContentType): boolean => {
  return question.visible ?? false
}
