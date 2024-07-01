import { useTranslation } from 'next-i18next'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton } from '@mui/material'
import { routes } from 'common/routes'
import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import Link from 'next/link'

export default function CampaignApplicationsPage() {
  const { t } = useTranslation('campaigns')

  return (
    <AdminLayout>
      <AdminContainer title={t('Кандидат Кампании')}>
        <div>Campaigns will appear here</div>
        <Link href={routes.admin.campaignApplications.edit('mock-id')} passHref>
          <IconButton size="small" color="primary">
            <EditOutlinedIcon />
            takes you to edit page
          </IconButton>
        </Link>
      </AdminContainer>
    </AdminLayout>
  )
}
