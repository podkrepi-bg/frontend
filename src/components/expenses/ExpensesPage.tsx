import { useTranslation } from 'next-i18next'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import HeadingSeparator from './HeadingSeparator'
import Grid from './grid/Grid'

export default function ExpensesPage() {
  const { t } = useTranslation('expenses')

  return (
    <AdminLayout>
      <AdminContainer title={t('headings.expenses')}>
        <HeadingSeparator />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
