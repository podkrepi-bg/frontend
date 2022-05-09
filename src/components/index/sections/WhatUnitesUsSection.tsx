import { Container, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import theme from 'common/theme'
import Heading from 'components/common/Heading'
import WhatUnitesUsCard from '../helpers/whatUnitesUs/WhatUnitesUsCard'
import { data } from '../helpers/whatUnitesUs/whatUnitesUsData'

export default function WhatUnitesUsSection() {
  const { t } = useTranslation()

  return (
    <Container maxWidth="md">
      <Heading
        textAlign="center"
        variant="h4"
        color={theme.palette.primary.dark}
        paddingBottom={theme.spacing(7)}>
        {t('index:what-unites-us-section.heading')}
      </Heading>
      <Grid
        container
        display="flex"
        flexDirection="row"
        alignItems="baseline"
        paddingBottom={theme.spacing(12)}>
        {data.map((x, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <WhatUnitesUsCard info={x} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
