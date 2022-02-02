import { GetServerSideProps } from 'next'
import { Container } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { QueryClient, dehydrate } from 'react-query'

import { queryFn } from 'common/rest'
import { routes } from 'common/routes'
import { usePetById } from 'common/hooks/bootcampStudents'

import CreatePetForm from 'components/bootcamp/CreatePetForm'
import DashboardLayout from 'components/bootcamp/DashboardLayout'

export default function EditPetPage({ slug }: { slug: string }) {
  const { data } = usePetById(slug)
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t('bootcamp:pets.edit')}>
      <Container>
        <CreatePetForm initialValues={data} redirectUrl={routes.bootcamp.dashboard.pets} />
      </Container>
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const client = new QueryClient()
  await client.prefetchQuery(`/animal/${slug}`, queryFn)

  return {
    props: {
      slug,
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation', 'bootcamp'])),
      dehydratedState: dehydrate(client),
    },
  }
}
