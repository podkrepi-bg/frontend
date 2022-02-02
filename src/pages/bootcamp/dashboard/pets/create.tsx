import CreatePetForm from 'components/bootcamp/CreatePetForm'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container } from '@mui/material'
import DashboardLayout from 'components/bootcamp/DashboardLayout'

export default function CreatePet() {
  return (
    <DashboardLayout title="Create pet">
      <Container>
        <CreatePetForm redirectUrl="/bootcamp/dashboard/pets" />
      </Container>
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
