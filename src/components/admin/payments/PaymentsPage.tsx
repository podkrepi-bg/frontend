import { useTranslation } from 'next-i18next'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'
import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'
import GridFilters from './grid/GridFilters'
import { RefundStoreImpl } from './store/RefundStore'

export const ModalStore = new ModalStoreImpl()
export const RefundStore = new RefundStoreImpl()
export const InvalidateStore = new ModalStoreImpl()

export default function PaymentsPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('donations:payments')}>
        <GridAppbar />
        <GridFilters />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
