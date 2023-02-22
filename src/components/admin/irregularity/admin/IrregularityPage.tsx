import { useTranslation } from 'next-i18next'

import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'

import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'

export const ModalStore = new ModalStoreImpl()

export default function IrregularityPage() {
  const { t } = useTranslation('irregularity')

  return (
    <AdminLayout>
      <AdminContainer title={t('admin.irregularities')}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
