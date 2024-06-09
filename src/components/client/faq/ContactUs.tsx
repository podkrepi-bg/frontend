import React from 'react'

import { useTranslation } from 'next-i18next'
import { Box, Typography } from '@mui/material'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

const ContactUs = () => {
  const { t } = useTranslation('faq')

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 5 }}>
      <Typography sx={{ mb: 5 }} variant="h6">
        {t('contact-for-more-info')}
      </Typography>
      <LinkButton href={routes.contact} variant="contained" color="primary">
        {t('contact-us')}
      </LinkButton>
    </Box>
  )
}

export default ContactUs
