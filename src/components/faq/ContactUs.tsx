import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import { routes } from '../../common/routes'

const ContactUs = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography sx={{ mb: 2 }} variant={'h6'}>
        Не намерихте информацията, която търсите?
      </Typography>
      <Link href={routes.contact} variant={'h6'}>
        Свържете се с нас!
      </Link>
    </Box>
  )
}

export default ContactUs
