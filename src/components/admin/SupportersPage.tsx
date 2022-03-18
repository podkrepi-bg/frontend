import React from 'react'
import { useTranslation } from 'next-i18next'

import DetailsModal from 'components/modal/DetailsModal'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

import SupportersGrid from './SupportersGrid'
import AdminLayout from './navigation/AdminLayout'
import AdminContainer from './navigation/AdminContainer'
import SupportersBottomAppBar from './SupportersBottomAppBar'

export const ModalStore = new ModalStoreImpl()

export default function SupportersPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('nav.admin.supporters')}>
        <SupportersBottomAppBar></SupportersBottomAppBar>
        <SupportersGrid />
        <DetailsModal />
      </AdminContainer>
    </AdminLayout>
  )
}
