import { useTranslation } from 'next-i18next'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'

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
