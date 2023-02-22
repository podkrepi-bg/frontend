import { useTranslation } from 'next-i18next'

import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'

export default function VaultsPage() {
  const { t } = useTranslation('recurring-donation')

  return (
    <AdminLayout>
      <AdminContainer title={t('recurring-donation')}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
