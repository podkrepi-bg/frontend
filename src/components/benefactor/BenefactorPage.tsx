import { useTranslation } from 'next-i18next'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'

import Grid from './grid/Grid'
import GridAppbar from './grid/GridAppbar'

export default function BenefactorPage() {
  const { t } = useTranslation('benefactor')

  return (
    <AdminLayout>
      <AdminContainer title={t('benefactor')}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
