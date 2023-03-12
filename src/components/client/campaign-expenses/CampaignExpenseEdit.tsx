import { useTranslation } from 'next-i18next'
import Layout from 'components/client/layout/Layout'

import Form from './Form'

export default function ExpensesEditPage() {
  const { t } = useTranslation('expenses')

  return (
    <Layout maxWidth={false}>
      <Form />
    </Layout>
  )
}
