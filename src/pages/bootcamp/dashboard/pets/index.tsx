import DashboardLayout from 'components/bootcamp/DashboardLayout'
import PetsGrid from 'components/bootcamp/PetsGrid'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function PetsPage() {
  return (
    <DashboardLayout title="All pets">
      <PetsGrid />
    </DashboardLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
    },
  }
}
