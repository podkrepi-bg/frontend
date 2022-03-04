import { useTranslation } from 'next-i18next'

import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'

import Grid from './grid/Grid'
import DocumentsBottomAppBar from './DocumentsBottomAppBar'

export default function DocumentsPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('documents:documents')}>
        <DocumentsBottomAppBar></DocumentsBottomAppBar>
        {/* <GridAppbar /> */}
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
