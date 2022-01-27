import React from 'react'
import CarRentalIcon from '@mui/icons-material/CarRental'
import NestedDrawer from './NestedDrawer'

export default function ModelsDrawer() {
  const modelsList = ['Honda Civic 2022', 'Audi Q8 2022', 'Hyundai Tucson 2022', 'Acura MDX 2022']

  return (
    <>
      <NestedDrawer list={modelsList} icon={<CarRentalIcon />} mt={16} />
    </>
  )
}
