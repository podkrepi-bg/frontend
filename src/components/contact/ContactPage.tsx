import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import ContactInfo from 'components/contact/ContactInfo'
import ContactForm from 'components/contact/ContactForm'

export default function RegisterPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('nav.contacts')}>
      <Container maxWidth="md">
        <ContactInfo />
      </Container>
      <Container maxWidth="sm">
        <ContactForm />
      </Container>
    </Layout>
  )
}
