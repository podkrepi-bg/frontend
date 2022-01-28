import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
          <Box sx={{ display: 'inline', mr: 4 }}>
            <TextField
              id="brand"
              label="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              size="small"
              sx={{ mb: 4 }}
            />
          </Box>
          <Box sx={{ display: 'inline', mr: 4 }}>
            <TextField
              id="model"
              label="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              size="small"
              sx={{ mb: 4 }}
            />
          </Box>
          <Box sx={{ display: 'inline', mr: 4 }}>
            <TextField
              id="year"
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              size="small"
              sx={{ mb: 4 }}
            />
          </Box>
          <Box sx={{ display: 'inline', mr: 4 }}>
            <TextField
              id="city"
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              size="small"
              sx={{ mb: 4 }}
            />
          </Box>
          <Box sx={{ display: 'inline', mr: 4 }}>
            <TextField
              id="country"
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              size="small"
            />
          </Box>
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
