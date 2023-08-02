export const getArticleHeight = (articleId: string) => {
  const elem = document.getElementById(articleId)
  if (!elem) return 0
  return elem.offsetHeight
}
