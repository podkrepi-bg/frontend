import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Grid, Hidden, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import Heading from 'components/common/Heading'

const PREFIX = 'HowWeWorkSection'

const classes = {
  heading: `${PREFIX}-heading`,
  container: `${PREFIX}-container`,
  graphic: `${PREFIX}-graphic`,
}

const StyledGrid = styled('div')(({ theme }) => ({
  [`& .${classes.heading}`]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(7),
    color: theme.palette.primary.dark,
    fontFamily: 'Montserrat',
  },

  [`&.${classes.container}`]: {
    marginBottom: theme.spacing(12),
    textAlign: 'center',
    marginTop: '1%',
  },

  [`& .${classes.graphic}`]: {
    marginTop: theme.spacing(5),
  },
}))

export default function HowWeWorkSection() {
  const { t, i18n } = useTranslation()

  return (
    <StyledGrid>
      <Grid container direction="column" component="section" className={classes.container}>
        <Heading id="how-we-work" variant="h4" component="h2" className={classes.heading} linkable>
          {t('index:how-we-work.heading')}
        </Heading>
        <Box
          style={{
            backgroundColor: '#F4F4F4',
            paddingBottom: '60px',
            paddingTop: '60px',
            paddingLeft: '25vw',
            paddingRight: '25vw',
          }}>
          <Grid item rowSpacing={10}>
            <Typography variant="subtitle1">{t('index:how-we-work.text')}</Typography>
          </Grid>
        </Box>
        <Grid item className={classes.graphic} maxWidth="md">
          <Hidden smUp>
            <Image src={`/infographic-${i18n.language}-mobile.svg`} width={320} height={1002} />
          </Hidden>
          <Hidden smDown>
            <Image src={`/infographic-${i18n.language}.svg`} width={1096} height={1114.6} />
          </Hidden>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
