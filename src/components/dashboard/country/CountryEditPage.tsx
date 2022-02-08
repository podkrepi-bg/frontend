import { useCountry } from 'common/hooks/countries'

import DashboardLayout from '../DashboardLayout'
import CountryForm from './CountryForm'

type Props = { id: string }
export default function CountryEditPage({ id }: Props) {
  const { data } = useCountry(id)

  return (
    <DashboardLayout>
      <CountryForm initialValues={data} id={id} />
    </DashboardLayout>
  )
}
