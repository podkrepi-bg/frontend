import { useTranslation } from 'next-i18next'

import DashboardLayout from '../DashboardLayout'
import CountryForm from './CountryForm'

export default function CountryCreatePage() {
  const { t } = useTranslation('country')

  return (
    <DashboardLayout title={t('headings.add-country')}>
      <CountryForm />
    </DashboardLayout>
  )
}
