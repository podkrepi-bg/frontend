import { useTranslation } from 'next-i18next'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'

export const ModalStore = new ModalStoreImpl()

export default function DocumentsPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('donations:donations')}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
