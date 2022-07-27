import React from 'react'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import SVGLogoBetaBG from './podkrepi-logo-beta-bg'
import SVGLogoBetaEN from './podkrepi-logo-beta-en'

const PREFIX = 'PodkrepiLogo'

const classes = {
  icon: `${PREFIX}-icon`,
  iconAccent: `${PREFIX}-iconAccent`,
  letters: `${PREFIX}-letters`,
}

const Root = styled('svg')(({ theme }) => ({
  [`& .${classes.icon}`]: { fill: theme.palette.primary.main },
  [`& .${classes.iconAccent}`]: { fill: theme.palette.secondary.main },

  [`& .${classes.letters}`]: {
    fill: theme.palette.getContrastText(theme.palette.primary.main),
  },
}))

type ParkhandsLogoProps = {
  variant?: 'fixed' | 'adaptive'
  size?: 'small' | 'large'
  locale?: string
  className?: string
}
const sizes = {
  small: [118, 24],
  large: [236, 48],
}
export default function PodkrepiLogo({
  variant = 'fixed',
  size = 'small',
  locale = 'bg',
  className,
}: ParkhandsLogoProps) {
  const [width, height] = variant === 'fixed' ? sizes[size] : ['100%', '100%']
  return (
    <Root width={width} height={height} viewBox="0 0 118 24" className={className}>
      {locale === 'bg' ? <SVGLogoBetaBG /> : <SVGLogoBetaEN />}
    </Root>
  )
}
