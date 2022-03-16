import { useTranslation } from 'next-i18next'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import HeadingSeparator from './HeadingSeparator'
import CountryGrid from './grid/CountryGrid'

export default function CountriesPage() {
  const { t } = useTranslation('countries')

  return (
    <AdminLayout>
      <AdminContainer title={t('headings.countries')}>
        <HeadingSeparator />
        <CountryGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
