import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'
import { UseQueryResult } from '@tanstack/react-query'

import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import NotFoundIllustration from 'components/common/errors/assets/NotFoundIllustration'
import { useRecurringDonation } from 'common/hooks/recurringDonation'
import { RecurringDonationResponse } from 'gql/recurring-donation'
import Form from './Form'

export default function EditPage() {
  const { t } = useTranslation('recurring-donation')
  const { query } = useRouter()
  const { data: donation }: UseQueryResult<RecurringDonationResponse> = useRecurringDonation(
    String(query.id),
  )

  return (
    <AdminLayout>
      <AdminContainer title={t('recurring-donation')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          {donation ? <Form recurring-donation={donation} /> : <NotFoundIllustration />}
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
