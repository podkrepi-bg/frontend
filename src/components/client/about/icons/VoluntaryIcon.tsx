import React from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'

import theme from 'common/theme'

export default function VoluntaryIcon({ ...props }: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 64 64">
      <g clipPath="url(#clip0)">
        <path
          d="M40.828 38.688C39.468 37.646 37.383 37.767 36.151 38.999C34.764 40.386 34.764 42.644 36.151 44.03L40.474 48.353C40.572 48.451 40.7 48.499 40.828 48.499C40.956 48.499 41.084 48.45 41.182 48.353L45.506 44.03C46.892 42.643 46.892 40.385 45.506 38.999C44.273 37.767 42.186 37.646 40.828 38.688ZM44.799 43.323L40.828 47.293L36.858 43.323C35.861 42.326 35.861 40.703 36.858 39.706C37.34 39.224 37.983 38.957 38.666 38.957C39.35 38.957 39.991 39.224 40.475 39.706C40.67 39.901 40.987 39.901 41.182 39.706C42.146 38.742 43.831 38.74 44.799 39.706C45.795 40.703 45.795 42.326 44.799 43.323Z"
          fill={theme.palette.primary.main}
          stroke={theme.palette.primary.main}
          strokeWidth="0.5"
        />
        <path
          d="M32 24.5C36.687 24.5 40.5 20.687 40.5 16C40.5 11.313 36.687 7.5 32 7.5C27.313 7.5 23.5 11.313 23.5 16C23.5 20.687 27.313 24.5 32 24.5ZM32 8.5C36.136 8.5 39.5 11.864 39.5 16C39.5 20.136 36.136 23.5 32 23.5C27.864 23.5 24.5 20.136 24.5 16C24.5 11.864 27.864 8.5 32 8.5Z"
          fill={theme.palette.primary.main}
          stroke={theme.palette.primary.main}
          strokeWidth="0.5"
        />
        <path
          d="M48 29.5H16C13.519 29.5 11.5 31.519 11.5 34V56C11.5 56.276 11.724 56.5 12 56.5H52C52.276 56.5 52.5 56.276 52.5 56V34C52.5 31.519 50.481 29.5 48 29.5ZM51.5 55.5H44.5V52C44.5 51.724 44.276 51.5 44 51.5C43.724 51.5 43.5 51.724 43.5 52V55.5H20.5V42C20.5 41.724 20.276 41.5 20 41.5C19.724 41.5 19.5 41.724 19.5 42V55.5H12.5V34C12.5 32.07 14.07 30.5 16 30.5H48C49.93 30.5 51.5 32.07 51.5 34V55.5Z"
          fill={theme.palette.primary.main}
          stroke={theme.palette.primary.main}
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="64" height="80" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  )
}
