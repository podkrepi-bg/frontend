import { useTranslation } from 'next-i18next'

import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import Grid from './Grid'
import GridAppbar from './GridAppbar'

export default function CampaignPage() {
  const { t } = useTranslation('campaigns')

  return (
    <AdminLayout>
      <AdminContainer title={t('campaigns')}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
