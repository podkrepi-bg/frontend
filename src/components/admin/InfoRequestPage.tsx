import React from 'react'
import { useTranslation } from 'next-i18next'

import DetailsModal from 'components/modal/DetailsModal'

import InfoRequestGrid from './InfoRequestGrid'
import AdminLayout from './navigation/AdminLayout'
import AdminContainer from './navigation/AdminContainer'

export default function InfoRequestPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('nav.admin.info-requests')}>
        <InfoRequestGrid />
        <DetailsModal />
      </AdminContainer>
    </AdminLayout>
  )
}
