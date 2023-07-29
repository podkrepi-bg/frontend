/**
 * For keeping focus on the element, which is expanded/ not expanded
 * @param elementId - id of the element to scroll to
 */
export const scrollToTop = (elementId: string) => {
  const elem = document.getElementById(elementId)
  const headerOffset = 100
  const elementPosition = elem?.getBoundingClientRect().top
  let offset = 0
  if (elementPosition) {
    offset = elementPosition + window.scrollY - headerOffset
  }
  window.scrollTo({
    top: offset,
  })
}
