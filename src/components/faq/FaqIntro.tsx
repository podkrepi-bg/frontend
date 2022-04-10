import React from 'react'
import { Box, Link, Typography } from '@mui/material'

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
