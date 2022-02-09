import React, { Dispatch, SetStateAction } from 'react'
import { Box, Divider, Drawer, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import CarRentalIcon from '@mui/icons-material/CarRental'

import SubList from 'components/documents/layout/SubList'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function DocumentsDrawer({ open, setOpen }: Props) {
  const brandsSubList = {
    title: 'Top Brands',
    data: ['Mercedes', 'Audi', 'BMW', 'Volkswagen'],
    icon: <DirectionsCarIcon />,
  }
  const modelsSubList = {
    title: 'New Models',
    data: ['Honda Civic 2022', 'Audi A8 2022', 'BMW M3 2022', 'Volkswagen Golf R 2022'],
    icon: <CarRentalIcon />,
  }

  function handleClose() {
    setOpen(false)
    sessionStorage.setItem(brandsSubList.title, 'false')
    sessionStorage.setItem(modelsSubList.title, 'false')
  }

  return (
    <>
      <Drawer
        sx={{
          width: 200,
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
          },
        }}
        transitionDuration={0}
        variant="persistent"
        anchor="left"
        open={open}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
          <IconButton onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </Box>
        <Divider />
        <SubList drawerOpen={open} {...brandsSubList} />
        <SubList drawerOpen={open} {...modelsSubList} />
      </Drawer>
    </>
  )
}
