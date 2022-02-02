import CreatePetForm from 'components/bootcamp/CreatePetForm'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container } from '@mui/material'
import DashboardLayout from 'components/bootcamp/DashboardLayout'
import { useTranslation } from 'next-i18next'

export default function CreatePet() {
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t('bootcamp:pets.create')}>
      <Container>
        <CreatePetForm redirectUrl="/bootcamp/dashboard/pets" />
      </Container>
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
