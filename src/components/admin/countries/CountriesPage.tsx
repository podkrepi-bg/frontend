import { useTranslation } from 'next-i18next'

import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

import HeadingSeparator from './HeadingSeparator'
import CountryGrid from './grid/CountryGrid'
import GridAppbar from './grid/GridAppbar'

export const ModalStore = new ModalStoreImpl()

export default function CountriesPage() {
  const { t } = useTranslation('countries')

  return (
    <AdminLayout>
      <AdminContainer title={t('headings.countries')}>
        <GridAppbar />
        <HeadingSeparator />
        <CountryGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
