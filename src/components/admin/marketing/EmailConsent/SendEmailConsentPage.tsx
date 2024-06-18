import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import React from 'react'
import SendForm from './SendForm'
import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

export default function SendEmailConsentPage() {
  const { t } = useTranslation('marketing')
  return (
    <AdminLayout>
      <AdminContainer title={t('admin.sendConsentEmail')}>
        <Container maxWidth={'sm'} sx={{ py: 5 }}>
          <SendForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
