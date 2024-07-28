import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { Box } from '@mui/material'

import theme from 'common/theme'


const ScrollToTop = () => {
  const scrollToTopButtonPath = '/scroll-to-top-icon.svg'
  
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
          <Image alt="Scroll to top button" src={scrollToTopButtonPath} width={64} height={64} />
        </Box>
      )}
    </div>
  )
}

export default ScrollToTop
