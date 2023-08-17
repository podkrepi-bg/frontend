import Image from 'next/image'

import { styled } from '@mui/material/styles'
import { Button, Stack, Typography } from '@mui/material'

import theme from 'common/theme'

export const BeneficiaryOrganizerWrapper = styled(Stack)(() => ({
  marginBottom: theme.spacing(5),
  flexDirection: 'column',
  gap: theme.spacing(3),

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}))

export const Avatar = styled(Image)(() => ({
  borderRadius: '50%',
}))

export const Label = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: theme.spacing(1.6),
  margin: 0,
}))

export const EmailButton = styled(Button)(() => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  fontSize: theme.spacing(1.75),
  padding: 0,
  paddingLeft: 2,

  '&:hover': {
    backgroundColor: 'unset',
    textDecoration: 'underline',
  },
}))

export const InfoStatusRoot = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
}))

export const RowWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
}))

export const StatusLabel = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 700,
  marginRight: theme.spacing(1),
}))

export const StatusText = styled('span')(() => ({
  fontSize: theme.typography.pxToRem(14),
}))
