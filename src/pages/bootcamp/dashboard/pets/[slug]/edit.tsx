import { GetServerSideProps } from 'next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from 'react-query'
import { queryFn } from 'common/rest'
import CreateAnimalForm from 'components/bootcamp/CreateAnimalForm'
import { usePetById } from 'common/hooks/bootcampStudents'
import DashboardLayout from 'components/bootcamp/DashboardLayout'
import { Container } from '@mui/material'

export default function EditPetPage({ slug }: { slug: string }) {
  const { data } = usePetById(slug)
  return (
    <DashboardLayout title="Edit pet">
      <Container>
        <CreateAnimalForm initialValues={data} redirectUrl="/bootcamp/dashboard/pets" />
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
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
      dehydratedState: dehydrate(client),
    },
  }
}
