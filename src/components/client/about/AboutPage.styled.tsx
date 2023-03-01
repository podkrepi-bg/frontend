import Image from 'next/image'

import { styled } from '@mui/material/styles'
import { Grid, Link, Typography } from '@mui/material'

import theme from 'common/theme'
import { LinkedIn } from '@mui/icons-material'

export const AboutHeading = styled(Typography)(() => ({
  fontWeight: 500,
  margin: theme.spacing(15, 0, 8, 0),
  textAlign: 'center',
}))

export const Avatar = styled(Image)(() => ({
  borderRadius: '50%',
  textAlign: 'center',
  objectFit: 'cover',
}))

export const TeamMemberName = styled(Typography)(() => ({
  fontWeight: 700,
  margin: theme.spacing(3, 0),
}))

export const LinkedInButton = styled(Link)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  textAlign: 'center',
  marginTop: theme.spacing(3),
  '&:hover': {
    '&>svg, &>h6': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
  },
}))

export const LinkedInIcon = styled(LinkedIn)(() => ({
  marginLeft: '-4px',
}))

export const LinkedInText = styled(Typography)(() => ({
  marginLeft: theme.spacing(1),
  color: theme.palette.common.black,
}))

export const Description = styled(Typography)(() => ({
  textAlign: 'initial',
}))

export const AboutWrapper = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(3),
  flexWrap: 'wrap',
}))
