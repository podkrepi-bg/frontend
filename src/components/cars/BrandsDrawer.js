import React from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import NestedDrawer from './NestedDrawer'

export default function BrandsDrawer() {
  const brandsList = ['Mercedes', 'Audi', 'BMW', 'Volkswagen']

  return (
    <>
      <NestedDrawer list={brandsList} icon={<DirectionsCarIcon />} />
    </>
  )
}
