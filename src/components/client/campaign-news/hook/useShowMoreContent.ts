import { useState } from "react";


  type ReadMore = {
    [key: number] : boolean
}

export function useShowMoreContent(){

  const [isExpanded, setIsExpanded] = useState<ReadMore>({})
    
  const expandContent = (index: number) : void => {
   setIsExpanded((prevState: ReadMore):ReadMore => {
      return {
        ...prevState,
        [index] : !isExpanded[index]
      }
    })
  }
  
  return [isExpanded, expandContent] as const
}