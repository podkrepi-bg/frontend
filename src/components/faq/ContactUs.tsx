import React from 'react'
import { Box, Typography } from '@mui/material'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

const ContactUs = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 5 }}>
      <Typography sx={{ mb: 5 }} variant="h6">
        Не намерихте информацията, която търсите?
      </Typography>
      <LinkButton href={routes.contact} variant="contained" color="primary">
        Свържете се с нас!
      </LinkButton>
    </Box>
  )
}

export default ContactUs
