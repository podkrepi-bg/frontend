import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import CarField from './CarField'
import notify from './helpers/notify'

export default function CarsForm({ cars, setCars }: any) {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState(0)
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')

  const router = useRouter()

  function carFormHandler(e: any) {
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

    fetch('http://localhost:5010/api/car', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: carData,
    }).then(() => {
      router.push('/cars')
      notify('Successfully created item!')
    })
  }

  return (
    <>
      <form onSubmit={carFormHandler}>
        <Box sx={{ mt: 15, ml: 95, width: 600 }}>
          <CarField label="Brand" setElement={setBrand} />
          <CarField label="Model" setElement={setModel} />
          <CarField label="Year" setElement={setYear} type="number" />
          <CarField label="City" setElement={setCity} />
          <CarField label="Country" setElement={setCountry} />
          <Box sx={{ display: 'inline' }}>
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      </form>
    </>
  )
}
