import AdminContainer from 'components/admin/navigation/AdminContainer'
import { useTranslation } from 'next-i18next'
import Layout from './Layout'

function BootcampSimeonList() {
  const { t } = useTranslation()

  return (
    <Layout>
      <AdminContainer title={t('bootcamp-simeon:nav:title')}></AdminContainer>
    </Layout>
  )
}

export default BootcampSimeonList
