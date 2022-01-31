import Tasks from 'components/admin/tasks/Tasks'

export default Tasks




/* import Tasks from 'components/admin/tasks/Tasks'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const fetchCars = async () => {
    const res = await fetch(`http://localhost:5010/api/car`)
    return res.json()
  }
  const client = new QueryClient()
  await client.prefetchQuery(`cars`, fetchCars)
  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  }
}
export default Tasks */
