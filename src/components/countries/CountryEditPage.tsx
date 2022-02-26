import { useTranslation } from 'next-i18next'

import { useCountry } from 'common/hooks/countries'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import HeadingSeparator from './HeadingSeparator'
import CountryForm from './CountryForm'

type Props = { id: string }
export default function CountryEditPage({ id }: Props) {
  const { t } = useTranslation('countries')
  const { data } = useCountry(id)

  return (
    <AdminLayout>
      <AdminContainer title={t('headings.edit')}>
        <HeadingSeparator />
        <CountryForm initialValues={data} id={id} />
      </AdminContainer>
    </AdminLayout>
  )
}
