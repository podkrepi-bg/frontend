import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import Layout from 'components/layout/Layout'
import ContactInfo from 'components/contact/ContactInfo'
import ContactForm from 'components/contact/ContactForm'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('nav.about.contacts')}>
      <Container maxWidth="md">
        <ContactInfo />
      </Container>
      <Container maxWidth="sm">
        <ContactForm />
      </Container>
    </Layout>
  )
}
