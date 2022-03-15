import { useTranslation } from 'next-i18next'

import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'

export default function WithdrawalPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('withdrawals:withdrawals')}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
