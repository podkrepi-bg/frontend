import React from 'react'
import { useTranslation } from 'next-i18next'

import DetailsModal from 'components/modal/DetailsModal'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

import InfoRequestGrid from './InfoRequestGrid'
import AdminLayout from './navigation/AdminLayout'
import AdminContainer from './navigation/AdminContainer'
import InfoRequestBottomAppBar from './InfoRequestBottomAppBar'

export const ModalStore = new ModalStoreImpl()

export default function InfoRequestPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('nav.admin.info-requests')}>
        <InfoRequestBottomAppBar></InfoRequestBottomAppBar>
        <InfoRequestGrid />
        <DetailsModal />
      </AdminContainer>
    </AdminLayout>
  )
}
