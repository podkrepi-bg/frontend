import { useTranslation } from 'next-i18next'

import Form from './Form'

export default function ExpensesEditPage() {
  const { t } = useTranslation('expenses')

  return <Form />
}
