import Image from 'next/image'

import { styled } from '@mui/material/styles'

import LinkButton from 'components/common/LinkButton'
import theme from 'common/theme'
import { Typography } from '@mui/material'

export const Root = styled('section')(() => ({
  position: 'relative',
  padding: theme.spacing(10, 14),
  marginBottom: theme.spacing(12),
  alignItems: 'center',
  backgroundColor: '#ffecc2',
  marginTop: theme.spacing(17),
  flexDirection: 'column',
  gap: theme.spacing(6.25),
  display: 'flex',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  [theme.breakpoints.up(2000)]: {
    maxWidth: theme.spacing(165),
    margin: `${theme.spacing(4)} auto`,
  },
}))

export const BecomeVolunteerHeading = styled(Typography)(() => ({
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: theme.typography.pxToRem(60),
  letterSpacing: '-1.5px',
  color: '#284E84',
  fontFamily: 'sans-serif',
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(45),
    textAlign: 'left',
    maxWidth: theme.spacing(57),
  },
}))

export const BecomeVolunteerButton = styled(LinkButton)(() => ({
  backgroundColor: '#284E84',
  color: theme.palette.common.white,
  fontFamily: 'sans-serif',
  fontSize: theme.typography.pxToRem(15),
  minWidth: theme.spacing(35),
  boxShadow:
    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
  borderRadius: theme.spacing(12.5),

  [theme.breakpoints.up('md')]: {
    minWidth: theme.spacing(42.5),
    fontSize: theme.typography.pxToRem(22),
  },
}))

export const JoinIcon = styled(Image)(() => ({
  position: 'absolute',
  top: theme.spacing(-7.5),

  [theme.breakpoints.up('md')]: {
    left: theme.spacing(6.88),
    top: theme.spacing(-13),
    width: theme.spacing(32),
    height: theme.spacing(22),
  },
}))
