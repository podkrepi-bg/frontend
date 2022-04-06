import React from 'react'
import { Box, Link, List, ListItem, Typography } from '@mui/material'

import { routes } from 'common/routes'

const FaqIntro = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography sx={{ mb: 2 }} variant="subtitle1">
        Моделът ни на работа се основава на{' '}
        <Link href="http://localhost:3040/about" target="_blank">
          Принципите, които ни обединяват
        </Link>
      </Typography>
    </Box>
  )
}

export default FaqIntro
