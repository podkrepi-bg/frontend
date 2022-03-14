import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'

import { useBenefactor } from 'common/hooks/benefactor'
import EditBenefactorForm from './EditBenefactorForm'

type Props = { id: string }
export default function BenefactorEditPage({ id }: Props) {
  const { t } = useTranslation()
  const { data } = useBenefactor(id)

  return (
    <AdminLayout>
      <AdminContainer title={t('benefactor:benefactor')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditBenefactorForm initialValues={data} id={id} />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
