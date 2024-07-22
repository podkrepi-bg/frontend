import React, { useEffect, useState } from 'react'

import { ArrowCircleUp } from '@mui/icons-material'
import { Box } from '@mui/material'

import theme from 'common/theme'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 700) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div>
      {isVisible && (
        <Box
          sx={{
            position: 'fixed',
            cursor: 'pointer',
            right: theme.spacing(3),
            bottom: theme.spacing(2),
          }}
          onClick={scrollToTop}>
          <ArrowCircleUp
            sx={{
              width: theme.spacing(8),
              height: theme.spacing(8),
              color: theme.palette.primary.main,
            }}
          />
        </Box>
      )}
    </div>
  )
}

export default ScrollToTop
