import Image from 'next/image'

import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const BeneficiaryAvatarWrapper = styled(Grid)(() => ({
  textAlign: 'center',
  padding: theme.spacing(2, 0, 4, 0),

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(0),
  },
}))

export const BeneficiaryAvatar = styled(Image)(() => ({
  borderRadius: '50%',
}))

export const StepperWrapper = styled(Grid)(() => ({
  gap: theme.spacing(2),
  display: 'grid',
}))
