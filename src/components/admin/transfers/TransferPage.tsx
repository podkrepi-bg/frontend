import { useTranslation } from 'next-i18next'

import { ModalStoreImpl } from 'stores/dashboard/ModalStore'
import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'

import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'

export const ModalStore = new ModalStoreImpl()

export default function TransferPage() {
  const { t } = useTranslation('transfer')

  return (
    <AdminLayout>
      <AdminContainer title={t('transfers')}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
