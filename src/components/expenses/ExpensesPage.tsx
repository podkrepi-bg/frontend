import { useTranslation } from 'next-i18next'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import HeadingSeparator from './HeadingSeparator'

export default function ExpensesPage() {
  const { t } = useTranslation('expenses')

  return (
    <AdminLayout>
      <AdminContainer title={t('headings.expenses')}>
        <HeadingSeparator />
        <p>..placeholder..</p>
      </AdminContainer>
    </AdminLayout>
  )
}
