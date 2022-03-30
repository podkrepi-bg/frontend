import { useTranslation } from 'next-i18next'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'

export default function TransferPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('transfer:transfers')}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
