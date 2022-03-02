import { useTranslation } from 'next-i18next'

import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import { ReactQueryDevtools } from 'react-query/devtools'
import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'

export default function VaultsPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('vaults:vaults')}>
        <GridAppbar />
        <Grid />
        <ReactQueryDevtools initialIsOpen={false} />
      </AdminContainer>
    </AdminLayout>
  )
}
