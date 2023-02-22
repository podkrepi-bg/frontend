import { useTranslation } from 'next-i18next'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import Form from './Form'

export default function ExpensesEditPage() {
  const { t } = useTranslation('expenses')

  return (
    <AdminLayout>
      <AdminContainer title={t('headings.expenses')}>
        <Form />
      </AdminContainer>
    </AdminLayout>
  )
}
