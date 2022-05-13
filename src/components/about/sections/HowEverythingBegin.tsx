import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'

import DiscordImage from '../DiscordImage'
import Heading from 'components/common/Heading'

const PREFIX = 'HowEverythingBegin'

const classes = {
  title: `${PREFIX}-title`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.title}`]: {
    color: theme.palette.primary.dark,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
  },
}))

export default function HowEverythingBegin() {
  const { t } = useTranslation()

  return (
    <StyledGrid container alignItems="center" spacing={4}>
      <Grid xs={12} item>
        <Heading
          id="principles-that-unite-us"
          variant="h4"
          component="h1"
          align="center"
          className={classes.title}
          linkable>
          {t('about:howEverythingBegin.title')}
        </Heading>
      </Grid>
      <Grid item>
        <Typography variant="body1" paragraph>
          {t('about:howEverythingBegin.volunteers')}
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <DiscordImage />
      </Grid>
    </StyledGrid>
  )
}
