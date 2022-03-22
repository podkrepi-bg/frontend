import { Button, Container, TextField } from '@mui/material'
import Link from 'next/link'

const Form = () => {
  const createHandler = () => {
    console.log('raboti')
  }

  return (
    <form>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Име" variant="outlined" />
        <TextField label="Фамилия" variant="outlined" />
        <TextField label="Град" variant="outlined" />
      </Container>
      <Container>
        <Button onClick={createHandler} variant="contained">Създай</Button>
        <Link href="/bootcamp">
          <Button >Затвори</Button>
        </Link>
      </Container>
    </form>
  )
}

export default Form
