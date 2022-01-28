import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LayoutPanel from '../navigation/LayoutPanel'
import { Button, CardActions, Container } from '@mui/material'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import axios from 'axios'
export default function EditForm() {
  const router = useRouter()
  const carId = router.query.id
  const { data }: any = useQuery(['car', carId], async () => {
    return await axios.get(`http://localhost:5010/api/car/${carId}`)
  })
  return (
    <div
      style={{
        height: '100vh',
        background: '#f2f2f2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LayoutPanel />
      <Typography sx={{ m: 1 }} variant="h4">
        Edit your car
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
          <TextField required id="outlined-required" label="Brand" defaultValue="Hello" />
          <TextField required id="outlined-required" label="Model" defaultValue="Hello World" />
          <TextField required id="outlined-required" label="Year" defaultValue="Hello World" />
          <TextField required id="outlined-required" label="Engine" defaultValue="Hello World" />
          <TextField required id="outlined-required" label="Price" defaultValue="Hello World" />
        </Box>
      </Container>
      <CardActions>
        <Button variant="contained" size="small">
          Save
        </Button>
        <Button
          onClick={() => {
            router.push('/admin/panel/tasks')
          }}
          variant="outlined"
          size="small">
          Cancel
        </Button>
      </CardActions>
    </div>
  )
}
