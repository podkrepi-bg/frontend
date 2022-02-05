import { GetStaticProps } from 'next'
import { Container } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { routes } from 'common/routes'
import CreatePetForm from 'components/bootcamp/CreatePetForm'
import DashboardLayout from 'components/bootcamp/DashboardLayout'

export default function CreatePet() {
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t('bootcamp:pets.create')}>
      <Container>
        <CreatePetForm redirectUrl={routes.bootcamp.dashboard.pets} />
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
