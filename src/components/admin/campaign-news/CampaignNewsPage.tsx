import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

import AdminContainer from 'components/common/navigation/AdminContainer'
import CampaignNewsGrid from './CampaignNewsGrid'

const AdminLayout = dynamic(() => import('components/common/navigation/AdminLayout'), {
  ssr: false,
})

export default function CampaignNewsPage() {
  const { t } = useTranslation('campaigns')

  return (
    <AdminLayout>
      <AdminContainer title={t('Новини')}>
        <CampaignNewsGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
