import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'

import { useBenefactor } from 'common/hooks/benefactor'
import EditBenefactorForm from './EditBenefactorForm'

type Props = { id: string }
export default function BenefactorEditPage({ id }: Props) {
  const { t } = useTranslation('benefactor')
  const { data } = useBenefactor(id)

  return (
    <AdminLayout>
      <AdminContainer title={t('benefactor')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditBenefactorForm initialValues={data} id={id} />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
