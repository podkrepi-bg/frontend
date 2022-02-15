import { useTranslation } from 'next-i18next'

import { useCountry } from 'common/hooks/countries'

import DashboardLayout from '../DashboardLayout'
import CountryForm from './CountryForm'

type Props = { id: string }
export default function CountryEditPage({ id }: Props) {
  const { t } = useTranslation('country')
  const { data } = useCountry(id)

  return (
    <DashboardLayout title={t('headings.edit-country')}>
      <CountryForm initialValues={data} id={id} />
    </DashboardLayout>
  )
}
