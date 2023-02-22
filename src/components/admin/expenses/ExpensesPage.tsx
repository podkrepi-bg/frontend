import { useTranslation } from 'next-i18next'

import { ModalStoreImpl } from 'stores/dashboard/ModalStore'
import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'

import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'

export const ModalStore = new ModalStoreImpl()

export default function ExpensesPage() {
  const { t } = useTranslation('expenses')

  return (
    <AdminLayout>
      <AdminContainer title={t('headings.expenses')}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
