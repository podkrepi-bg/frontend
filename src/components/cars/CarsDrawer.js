import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import CarRentalIcon from '@mui/icons-material/CarRental'
import SubList from './SubList'
import fetch from 'node-fetch'

export default function CarsDrawer({ open, handleClose }) {
    const topBrands = ['Mercedes', 'Audi', 'BMW', 'Volkswagen'];
    const newModels = ['Honda Civic 2022', 'Audi A8 2022', 'BMW M3 2022', 'Volkswagen Golf R 2022'];

    return <>
        <Drawer
            sx={{
                width: 200,
                '& .MuiDrawer-paper': {
                    width: 200,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, }}>
                <IconButton onClick={handleClose}>
                    <CloseIcon></CloseIcon>
                </IconButton>
            </Box>
            <Divider />
            <SubList title="Top brands" icon={<DirectionsCarIcon />} data={topBrands} />
            <SubList title="New models" icon={<CarRentalIcon />} data={newModels} />
        </Drawer>
    </>;
}
