import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

import { colors } from 'common/theme'

export default function PodkrepiIcon({ color = 'primary', ...props }: SvgIconProps) {
  const [foreground, background] =
    color === 'primary'
      ? [colors.blue.main, colors.yellow.main]
      : [colors.yellow.main, colors.blue.main]
  return (
    <SvgIcon {...props}>
      <path
        d="M0 9.79721C3.29925 6.04332 5.83938 9.06867 6.49979 12.3874C7.58981 17.8681 17.7615 12.3985 17.4959 0.579322C17.4361 -2.07621 24.4642 4.75031 17.4737 13.857C17.4737 13.857 20.8341 12.7795 22.0451 7.00543C22.7486 3.65334 27.9637 12.0704 17.7601 19.168C17.7601 19.168 20.2349 19.0596 22.5108 16.3957C24.4323 14.1462 24.1973 19.5392 18.0215 22.6995C13.4945 25.0158 6.28151 24.1176 3.99025 19.1764C2.64163 16.2664 4.11955 12.4611 0 9.79721Z"
        fill={foreground}
      />
      <path
        d="M14.6166 6.1518C14.6205 7.98846 13.9631 9.76514 12.7647 11.157C11.4592 12.6405 9.59337 13.5247 8.30176 13.3231C10.4707 10.9067 11.6385 6.22132 11.5245 1.00202C11.4856 -0.80541 14.6695 1.40939 14.6152 6.14624"
        fill={background}
      />
    </SvgIcon>
  )
}
