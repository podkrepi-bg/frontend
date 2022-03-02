import { KeyboardArrowRight } from '@mui/icons-material'
import { Button, Container, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import { useState } from 'react'
import BootcampLayout from './BootcampLayout'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
})

export default function Create() {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [messageError, setMessageError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setMessageError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (message == '') {
      setMessageError(true)
    }
  }

  return (
    <BootcampLayout>
      <AdminContainer title="Създай нова задача">
        <Container>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              className={classes.field}
              label="Title"
              variant="outlined"
              color="info"
              fullWidth
              required
              error={titleError}
            />
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              className={classes.field}
              label="Name"
              variant="outlined"
              color="info"
              fullWidth
              required
              error={messageError}
            />
            <TextField
              onChange={(e) => setMessage(e.target.value)}
              className={classes.field}
              label="Email"
              variant="outlined"
              color="info"
              fullWidth
              required
            />
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              className={classes.field}
              label="Message"
              variant="outlined"
              color="info"
              multiline
              rows={4}
              fullWidth
              required
            />
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              className={classes.field}
              label="Date"
              variant="outlined"
              color="info"
              fullWidth
              required
            />
            <Button type="submit" color="info" variant="contained" endIcon={<KeyboardArrowRight />}>
              Submit
            </Button>
          </form>
        </Container>
      </AdminContainer>
    </BootcampLayout>
  )
}
