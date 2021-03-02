import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import ContactForm from 'components/contact/ContactForm'

export default function RegisterPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('nav.contacts')}>
      <Container maxWidth="xs">
        <ContactForm />
      </Container>
    </Layout>
  )
}
