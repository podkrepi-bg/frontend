import { Button, CardActions, Container } from '@mui/material'
import { Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LayoutPanel from '../navigation/LayoutPanel'
import axios from 'axios'
export default function AddForm() {
  return (
    <div
      style={{
        height: '100vh',
        background: '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LayoutPanel />
      <Typography color="primary" sx={{ m: 2, fontWeight: 'bold' }} variant="h4">
        Add car
      </Typography>
      <Container sx={{ justifyContent: 'center', display: 'flex' }}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 2,
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
          noValidate
          autoComplete="off">
          <TextField required id="outlined-required" label="Brand" />
          <TextField required id="outlined-required" label="Model" />
          <TextField required id="outlined-required" label="Year" />
          <TextField required id="outlined-required" label="Engine" />
          <TextField required id="outlined-required" label="Price" />
        </Box>
      </Container>
      <CardActions sx={{ m: 2 }}>
        <Button variant="contained" size="large">
          Save
        </Button>
          <Button variant="outlined" size="large">
            Cancel
          </Button>
      </CardActions>
    </div>
  )
}
