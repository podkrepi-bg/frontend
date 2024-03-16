import Image from 'next/image'

import { Grid, Tabs, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from '../../../common/theme'

export const SectionTitle = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(24),
  textAlign: 'center',
  paddingBottom: theme.spacing(5),
}))

export const StyledGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

export const Title = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(24),
}))

export const Subtitle = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(18),
  fontWeight: theme.typography.fontWeightBold,
}))

export const Description = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(14),
  color: '#707070',
}))

export const StyledTabs = styled(Tabs)(() => ({
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-around',

    [theme.breakpoints.down('md')]: { justifyContent: 'space-between' },
  },
}))

export const StyledArrow = styled(Image)(() => ({
  filter:
    'invert(0%) sepia(83%) saturate(7500%) hue-rotate(347deg) brightness(85%) contrast(114%) opacity(50%)',

  '&:hover': {
    filter:
      'invert(91%) sepia(23%) saturate(3681%) hue-rotate(178deg) brightness(110%) contrast(102%)',
  },

  '&.slick-prev': {
    left: theme.spacing(-0.7),
  },

  '&.slick-next': {
    right: theme.spacing(-0.7),
  },
}))
