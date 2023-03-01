import { useTranslation } from 'next-i18next'

import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'

import HeadingSeparator from './HeadingSeparator'
import CountryForm from './CountryForm'

export default function CountryCreatePage() {
  const { t } = useTranslation('countries')

  return (
    <AdminLayout>
      <AdminContainer title={t('headings.add')}>
        <HeadingSeparator />
        <CountryForm />
      </AdminContainer>
    </AdminLayout>
  )
}
