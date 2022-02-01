import EditForm from 'components/admin/tasks/EditForm'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  const fetchCar = async () => {
    const res = await fetch(`http://localhost:5010/api/car/${params.id}`)
    return res.json()
  }
  const client = new QueryClient()
  await client.prefetchQuery(`/car/${params.id}`, fetchCar)
  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  }
}
export default EditForm
