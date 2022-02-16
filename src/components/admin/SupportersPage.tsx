import React from 'react'
import { useTranslation } from 'next-i18next'

import DetailsModal from 'components/modal/DetailsModal'

import SupportersGrid from './SupportersGrid'
import AdminLayout from './navigation/AdminLayout'
import AdminContainer from './navigation/AdminContainer'

export default function SupportersPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('nav.admin.supporters')}>
        <SupportersGrid />
        <DetailsModal />
      </AdminContainer>
    </AdminLayout>
  )
}
