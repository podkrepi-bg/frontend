import { useState } from 'react'
import CarsNavBar from '../../components/cars/CarsNavBar'
import Footer from '../../components/cars/Footer'
import Main from '../../components/cars/Main'
import fetch from 'node-fetch'

export default function CarsPage({ cars: carsData }) {
  const [cars, setCars] = useState(carsData)

  return (
    <>
      <CarsNavBar cars={cars} setCars={setCars} />
      <Main cars={cars} setCars={setCars} />
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  const req = await fetch('http://localhost:5010/api/car')
  const cars = await req.json()

  return {
    props: {
      cars,
    },
  }
}
