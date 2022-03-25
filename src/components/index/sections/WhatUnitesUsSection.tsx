import { Box, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import theme from 'common/theme'
import Heading from 'components/common/Heading'
import WhatUnitesUsCard from '../helpers/whatUnitesUs/WhatUnitesUsCard'
import { data } from '../helpers/whatUnitesUs/whatUnitesUsData'

export default function WhatUnitesUsSection() {
  const { t } = useTranslation()

  return (
    <>
      <Heading textAlign="center" variant="h4" color={theme.palette.primary.dark}>
        {t('index:what-unites-us-section.heading')}
      </Heading>
      <Grid container flexDirection="column">
        {data.map((x, index) => (
          <Box display="flex" alignItems="center" flexDirection="column" key={index}>
            <WhatUnitesUsCard info={x} />
          </Box>
        ))}
      </Grid>
    </>
  )
}
