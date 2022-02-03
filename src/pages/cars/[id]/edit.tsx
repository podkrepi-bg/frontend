import CarsNavBar from '../../../components/cars/CarsNavBar'
import Footer from '../../../components/cars/Footer'
import EditForm from '../../../components/cars/EditForm'

export default function EditPage({ car }) {
  return (
    <>
      <CarsNavBar />
      <EditForm car={car} />
      <Footer />
    </>
  )
}

export async function getServerSideProps({ params }) {
  const req = await fetch(`http://localhost:5010/api/car/${params.id}`)
  const car = await req.json()

  return {
    props: {
      car,
    },
  }
}
