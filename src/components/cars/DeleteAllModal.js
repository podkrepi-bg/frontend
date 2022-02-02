import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import fetch from 'node-fetch'
import notify from './helpers/notify'

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function DeleteAllModal({ selectionModel, open, setOpen, cars, setCars }) {
    function deleteHandler() {
        fetch('http://localhost:5010/api/car', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectionModel)
        })
            .then(() => {
                setCars([...cars.filter(car => selectionModel.every(id => car.id != id))]);
                setOpen(false);
                notify('Successfully deleted selected items!');
            })

    }

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6">Are you sure you want to delete all selected items?</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={deleteHandler} sx={{ mx: 2, color: 'red' }}>
                            Delete
                        </Button>
                        <Button onClick={() => setOpen(false)} sx={{ mx: 2 }}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
