import { useTranslation } from 'next-i18next'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'
import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'
import GridFilters from './grid/GridFilters'

export const ModalStore = new ModalStoreImpl()

export default function DocumentsPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('bank-transactions:bank-transactions')}>
        <GridAppbar />
        <GridFilters />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
