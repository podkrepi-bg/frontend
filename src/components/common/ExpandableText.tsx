import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'

type ExpandableTextParams = {
  text: string
  rows: number | null
}

export default function ExpandableText({ text, rows }: ExpandableTextParams) {
  const [limit, setLimit] = useState(rows)
  const [initialHeight, setInitialHeight] = useState(0)
  const [isExpandable, setIsExpandable] = useState(false)
  const textElementRef = useRef<HTMLSpanElement | null>(null)
  const { t } = useTranslation('common')

  const isTextTruncated = () => {
    if (!rows) {
      return false
    }

    const currentTextHeight = textElementRef?.current?.clientHeight // only visible height
    const currentScrollHeight = textElementRef?.current?.scrollHeight // total height + hidden parts\
    return currentTextHeight !== currentScrollHeight
  }

  const handleExpand = () => {
    if (!limit) {
      setLimit(rows)
    } else {
      setLimit(null)
    }
  }

  const handleResize = () => {
    console.log(initialHeight, 'ih')
    setIsExpandable(isTextTruncated())
  }

  useEffect(() => {
    setIsExpandable(isTextTruncated())
    console.log(!initialHeight, typeof textElementRef?.current?.clientHeight)
    if (!initialHeight && (textElementRef?.current?.clientHeight as number) > 0)
      setInitialHeight(textElementRef?.current?.clientHeight as number)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Box
        component="span"
        ref={textElementRef}
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: limit,
          fontSize: 'inherit',
          textAlign: 'inherit',
        }}>
        {text}
      </Box>
      {isExpandable ? (
        <Box
          component="small"
          sx={(theme) => ({
            marginTop: theme.spacing(3),
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.620rem',
            ':hover': {
              fontWeight: 'lighter',
            },
          })}
          onClick={() => handleExpand()}>
          {limit ? t('expandable-text.show') : t('expandable-text.hide')}
        </Box>
      ) : null}
    </>
  )
}
