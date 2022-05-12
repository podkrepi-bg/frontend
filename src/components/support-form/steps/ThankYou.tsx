import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'

import HeaderTypography from '../helpers/HeaderTypography'
import theme from 'common/theme'

const PREFIX = 'ThankYou'

const classes = {
  root: `${PREFIX}-root`,
  heading: `${PREFIX}-heading`,
  instructions: `${PREFIX}-instructions`,
}

const StyledGrid = styled(Grid)(() => ({
  [`& .${classes.root}`]: {
    width: '100%',
  },

  [`& .${classes.heading}`]: {
    marginTop: theme.spacing(10),
  },

  [`& .${classes.instructions}`]: {
    marginTop: theme.spacing(5),
  },
}))

export default function ThankYou() {
  const { t } = useTranslation()

  return (
    <StyledGrid container spacing={6} justifyContent="center">
      <Grid item xs={12}>
        <HeaderTypography>{t('support:steps.thank-you.content')}</HeaderTypography>
      </Grid>
      <Typography align="center" className={classes.instructions}>
        {t('support:steps.thank-you.await-instructions')}
      </Typography>
    </StyledGrid>
  )
}
