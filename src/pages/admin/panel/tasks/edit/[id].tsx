import axios from 'axios'
import EditForm from 'components/admin/tasks/EditForm'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
export const getServerSideProps: GetServerSideProps = async ({ locale, params }: any) => {
  const fetchCar = async () => {
    const res = await fetch(`http://localhost:5010/api/car/${params.id}`)
    return res.json()
  }
  const car = await fetchCar()
  return {
    props: {
      car,
    },
  }
}
export default EditForm
