import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Button } from '@mui/material'
import CarField from './CarField'
import notify from './helpers/notify'

export default function EditForm({ car }: any) {
  const [brand, setBrand] = useState(car.brand)
  const [model, setModel] = useState(car.model)
  const [year, setYear] = useState(car.year)
  const [city, setCity] = useState(car.city)
  const [country, setCountry] = useState(car.country)

  const router = useRouter()

  async function onEditSubmit(e: any) {
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
    }).then(() => {
      router.push('/cars')
      notify('Successfully edited item!')
    })
  }

  return (
    <>
      <form onSubmit={onEditSubmit}>
        <Box sx={{ mt: 15, ml: 95, width: 600 }}>
          <CarField value={brand} label="Brand" setElement={setBrand} />
          <CarField value={model} label="Model" setElement={setModel} />
          <CarField value={year} label="Year" setElement={setYear} type="number" />
          <CarField value={city} label="City" setElement={setCity} />
          <CarField value={country} label="Country" setElement={setCountry} />
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
