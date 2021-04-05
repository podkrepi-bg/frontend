import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

import theme from 'common/theme'

export default function PodkrepiIcon({ color = 'primary', ...props }: SvgIconProps) {
  const [hand, finger] =
    color === 'primary'
      ? [theme.palette.primary.main, theme.palette.secondary.main]
      : [theme.palette.secondary.main, theme.palette.primary.main]
  return (
    <SvgIcon {...props}>
      <path
        d="M14.0487 6.89154C14.426 2.20707 10.7319 -1.45255 10.8856 0.569187C11.3096 6.03999 10.7394 9.18719 8.26111 12.6856C10.9732 12.6856 13.7571 10.1505 14.0487 6.89154Z"
        fill={finger}
      />
      <path
        d="M13.6453 11.1255C15.573 8.78609 16.9695 5.08548 16.6248 0.581756C16.5018 -1.03004 18.7239 0.912501 19.4515 4.32896C20.0059 6.93019 19.6667 10.3858 16.9304 13.778C16.9304 13.778 20.263 12.4411 22.1702 8.28206C23.481 5.42461 25.0285 15.1681 16.7254 19.5115C16.7254 19.5115 19.5121 19.2469 21.7686 17.5327C24.3307 15.5855 21.1304 22.5311 14.932 23.7665C11.0161 24.5473 5.98602 23.4507 3.68291 19.2796C1.70403 15.6954 3.59813 11.8019 0 9.81373C1.26708 7.95224 3.4295 8.06963 4.66863 9.20721C6.36894 10.8973 5.60589 12.687 7.04813 13.4883C8.90216 14.5196 11.9571 13.1184 13.6453 11.1255Z"
        fill={hand}
      />
    </SvgIcon>
  )
}
