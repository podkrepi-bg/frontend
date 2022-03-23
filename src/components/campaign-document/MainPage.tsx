import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import DocumentGrid from './grid/DocumentGrid'
import { useTranslation } from 'next-i18next'

export default function MainPage() {
  const { t } = useTranslation('campaign-document')
  return (
    <AdminLayout>
      <AdminContainer title={t('title')}>
        <DocumentGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
