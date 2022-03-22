import { Button, Container, TextField } from '@mui/material'
import Link from 'next/link'

const Form = () => {
  const createHandler = () => {
    console.log('raboti')
  }

  return (
    <Container>
      <form>
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Container
            sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 3, width: 400 }}>
            <TextField label="Име" variant="outlined" />
            <TextField label="Фамилия" variant="outlined" />
            <TextField label="Град" variant="outlined" />
          </Container>
          <Container sx={{ width: 400, display: 'flex', justifyContent: 'center' }}>
            <Button sx={{ marginRight: 3 }} onClick={createHandler} variant="contained">
              Създай
            </Button>
            <Link href="/bootcamp">
              <Button variant="contained">Затвори</Button>
            </Link>
          </Container>
        </Container>
      </form>
    </Container>
  )
}

export default Form
