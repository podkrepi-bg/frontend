import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Button } from '@mui/material'
import EditField from './EditField'

export default function EditForm({ car }) {
  const [brand, setBrand] = useState(car.brand)
  const [model, setModel] = useState(car.model)
  const [year, setYear] = useState(car.year)
  const [city, setCity] = useState(car.city)
  const [country, setCountry] = useState(car.country)

  const router = useRouter()

  async function onEditSubmit(e) {
    e.preventDefault()

    if (!brand || !model || !year || !city || !country) {
      return
    }

    const carData = JSON.stringify({
      brand,
      model,
      year: Number(year),
      city,
      country,
    })

    fetch(`http://localhost:5010/api/car/${car.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: carData,
    }).then((res) => {
      router.push('/cars')
    })
  }

  return (
    <>
      <form onSubmit={onEditSubmit}>
        <Box sx={{ mt: 10, ml: 80, width: 600 }}>
          <EditField value={brand} label="Brand" setElement={setBrand} />
          <EditField value={model} label="Model" setElement={setModel} />
          <EditField value={year} label="Year" setElement={setYear} />
          <EditField value={city} label="City" setElement={setCity} />
          <EditField value={country} label="Country" setElement={setCountry} />
          <Box sx={{ display: 'inline' }}>
            <Button type="submit">Save</Button>
          </Box>
          <Box sx={{ display: 'inline' }}>
            <Link href="/cars">
              <Button>Cancel</Button>
            </Link>
          </Box>
        </Box>
      </form>
    </>
  )
}
