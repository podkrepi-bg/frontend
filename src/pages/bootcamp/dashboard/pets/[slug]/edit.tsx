import { GetServerSideProps } from 'next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from 'react-query'
import { queryFn } from 'common/rest'
import CreatePetForm from 'components/bootcamp/CreatePetForm'
import { usePetById } from 'common/hooks/bootcampStudents'
import DashboardLayout from 'components/bootcamp/DashboardLayout'
import { Container } from '@mui/material'
import { useTranslation } from 'next-i18next'

export default function EditPetPage({ slug }: { slug: string }) {
  const { data } = usePetById(slug)
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t('bootcamp:pets.edit')}>
      <Container>
        <CreatePetForm initialValues={data} redirectUrl="/bootcamp/dashboard/pets" />
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
