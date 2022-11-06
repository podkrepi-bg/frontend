import { styled } from '@mui/system'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'

import theme from 'common/theme'

export const ActiveMembersWrapper = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(3),
  flexWrap: 'wrap',
}))

export const ТeamMemberWrapper = styled(Grid)(() => ({
  flexGrow: 1,
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    width: '10%',
    flex: '1 0 40%',
    marginBottom: theme.spacing(0),
  },
  [theme.breakpoints.up('md')]: {
    flex: '1 0 30%',
  },
  [theme.breakpoints.up('lg')]: {
    flex: '1 0 14%',
  },
}))

export const Avatar = styled(Image)(() => ({
  borderRadius: '50%',
  textAlign: 'center',
  width: '150px',
  objectFit: 'cover',
}))
