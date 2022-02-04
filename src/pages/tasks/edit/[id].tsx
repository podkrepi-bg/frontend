import EditForm from 'components/admin/tasks/EditForm'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { ParsedUrlQuery } from 'querystring'
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id }: ParsedUrlQuery = query
  const fetchCar = async () => {
    const res = await fetch(`http://localhost:5010/api/bankaccount/${id}`)
    return res.json()
  }
  const client = new QueryClient()
  await client.prefetchQuery(`/bankaccount/${id}`, fetchCar)
  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  }
}
export default EditForm
