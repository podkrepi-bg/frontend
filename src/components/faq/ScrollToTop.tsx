import React, { useEffect, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box } from '@mui/material'

import theme from 'common/theme'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
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
          sx={{ position: 'fixed', cursor: 'pointer', right: '6rem', bottom: '1rem' }}
          onClick={scrollToTop}>
          <KeyboardArrowUpIcon
            sx={{ width: '50px', height: '50px', color: theme.palette.primary.main }}
          />
        </Box>
      )}
    </div>
  )
}

export default ScrollToTop
