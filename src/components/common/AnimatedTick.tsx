import React from 'react'
import { styled } from '@mui/material/styles'
import theme from 'common/theme'

const AnimatedDiv = styled('div')(() => ({
  textAlign: 'center',
  '@-webkit-keyframes checkmark': {
    '0%': {
      strokeDashoffset: '100px',
    },
    '100%': {
      strokeDashoffset: '200px',
    },
  },
  ' @-ms-keyframes checkmark': {
    '0%': {
      strokeDashoffset: '100px',
    },
    '100%': {
      strokeDashoffset: '200px',
    },
  },

  '@keyframes checkmark': {
    '0%': {
      strokeDashoffset: '100px',
    },
    '100%': {
      strokeDashoffset: '0px',
    },
  },

  '@-webkit-keyframes checkmark-circle': {
    '0%': {
      strokeDashoffset: '480px',
    },

    '100%': {
      strokeDashoffset: '960px',
    },
  },

  '@-ms-keyframes checkmark-circle': {
    '0%': {
      strokeDashoffset: '240px',
    },
    '100%': {
      strokeDashoffset: '480px',
    },
  },

  '@keyframes checkmark-circle': {
    '0%': {
      strokeDashoffset: '480px',
    },

    '100%': {
      strokeDashoffset: '960px',
    },
  },

  '@keyframes colored-circle': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 100,
    },
  },

  /* other styles */
  /* .svg svg {
          display: none
      }
       */
  '.inlinesvg .svg svg': {
    display: 'inline',
  },

  /* .svg img {
          display: none
      } */

  '.icon--order-success svg polyline': {
    '-webkit-animation': 'checkmark 0.25s ease-in-out 0.7s backwards',
    animation: 'checkmark 0.25s ease-in-out 0.7s backwards',
  },

  '.icon--order-success svg circle': {
    '-webkit-animation': 'checkmark-circle 0.6s ease-in-out backwards',
    animation: 'checkmark-circle 0.6s ease-in-out backwards',
  },
  '.icon--order-success svg circle#colored': {
    '-webkit-animation': 'colored-circle 0.6s ease-in-out 0.7s backwards',
    animation: 'colored-circle 0.6s ease-in-out 0.7s backwards',
  },
}))
function AnimatedTick({ size = '4rem' }) {
  return (
    <AnimatedDiv className="animation-ctn">
      <div className="icon icon--order-success svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width={size} height={size}>
          <g fill="none" stroke={theme.palette.success.main} strokeWidth="2">
            <circle
              cx="77"
              cy="77"
              r="72"
              style={{ strokeDasharray: '480px', strokeDashoffset: '960px' }}
            />
            <circle
              id="colored"
              fill={theme.palette.success.main}
              cx="77"
              cy="77"
              r="72"
              style={{ strokeDasharray: '480px', strokeDashoffset: '960px' }}
            />
            <polyline
              className="st0"
              stroke="#fff"
              strokeWidth="10"
              points="43.5,77.8 63.7,97.9 112.2,49.4 "
              style={{ strokeDasharray: '100px', strokeDashoffset: '200px' }}
            />
          </g>
        </svg>
      </div>
    </AnimatedDiv>
  )
}

export default AnimatedTick
