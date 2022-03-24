import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import data from '../data'

const Form = () => {
  function createFormHandler(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const firstName = String(formData.get('firstName'))
    const lastName = String(formData.get('lastName'))
    const city = String(formData.get('city'))
    data.push({
      firstName: firstName,
      lastName: lastName,
      city: city,
    })
    console.log(data)
    event.currentTarget.reset()
  }

  return (
    <Container>
      <form onSubmit={createFormHandler}>
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Container
            sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 3, width: 400 }}>
            <TextField name="firstName" label="Име" variant="outlined" />
            <TextField name="lastName" label="Фамилия" variant="outlined" />
            <TextField name="city" label="Град" variant="outlined" />
          </Container>
          <Container
            sx={{
              width: 400,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Button type="submit" sx={{ marginRight: 3 }} variant="contained">
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
