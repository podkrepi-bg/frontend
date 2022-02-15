import { useTranslation } from 'next-i18next'

import DashboardLayout from '../DashboardLayout'
import CountryGrid from './CountryGrid'

export default function CountryMainPage() {
  const { t } = useTranslation('country')

  return (
    <DashboardLayout title={t('headings.countries')}>
      <CountryGrid />
    </DashboardLayout>
  )
}
