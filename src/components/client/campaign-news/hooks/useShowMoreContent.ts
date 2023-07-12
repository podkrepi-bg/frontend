import { useState } from 'react'

type ReadMore = {
  [key: string]: boolean
}

export function useShowMoreContent() {
  const [isExpanded, setIsExpanded] = useState<ReadMore>({})

  const expandContent = (articleId: string): void => {
    setIsExpanded((prevState: ReadMore): ReadMore => {
      return {
        ...prevState,
        [articleId]: !isExpanded[articleId],
      }
    })
  }

  return [isExpanded, expandContent] as const
}
