import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DashboardLayout from 'components/bootcamp/DashboardLayout'
import PetsGrid from 'components/bootcamp/PetsGrid'

export default function PetsPage() {
  const { t } = useTranslation()
  return (
    <DashboardLayout title={t('bootcamp:pets.all')}>
      <PetsGrid />
    </DashboardLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation', 'bootcamp'])),
    },
  }
}
