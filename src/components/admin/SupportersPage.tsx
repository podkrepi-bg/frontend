import React from 'react'
import { useTranslation } from 'next-i18next'

import DetailsModal from 'components/admin/modal/DetailsModal'
import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

import SupportersGrid from './SupportersGrid'
import SupportersBottomAppBar from './SupportersBottomAppBar'

export const ModalStore = new ModalStoreImpl()

export default function SupportersPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('nav.admin.supporters')}>
        <SupportersBottomAppBar />
        <SupportersGrid />
        <DetailsModal />
      </AdminContainer>
    </AdminLayout>
  )
}
