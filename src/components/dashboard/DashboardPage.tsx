import { useTranslation } from 'next-i18next'

import DashboardLayout from './DashboardLayout'

export default function DashboardPage() {
  const { t } = useTranslation('country')

  return <DashboardLayout title={t('headings.home')} />
}
