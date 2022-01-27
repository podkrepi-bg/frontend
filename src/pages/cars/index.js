import { useState } from 'react'
import CarsForm from '../../components/cars/CarsForm'
import CarsGrid from '../../components/cars/CarsGrid'
import CarsNavBar from '../../components/cars/CarsNavBar'
import fetch from 'node-fetch'

export default function CarsPage({ cars: carsData }) {
  const [cars, setCars] = useState(carsData)

  return (
    <>
      <CarsNavBar cars={cars} setCars={setCars} />
      <CarsForm cars={cars} setCars={setCars} />
      <CarsGrid cars={cars} setCars={setCars} />
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
