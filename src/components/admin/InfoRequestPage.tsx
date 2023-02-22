import React from 'react'
import { useTranslation } from 'next-i18next'

import DetailsModal from 'components/admin/modal/DetailsModal'
import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

import InfoRequestGrid from './InfoRequestGrid'
import InfoRequestBottomAppBar from './InfoRequestBottomAppBar'

export const ModalStore = new ModalStoreImpl()

export default function InfoRequestPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('nav.admin.info-requests')}>
        <InfoRequestBottomAppBar />
        <InfoRequestGrid />
        <DetailsModal />
      </AdminContainer>
    </AdminLayout>
  )
}
