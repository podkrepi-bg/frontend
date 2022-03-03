import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
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
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [messageError, setMessageError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [dateError, setDateError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setMessageError(false)
    setEmailError(false)
    setDateError(false)
    const dataForm = new FormData(e.target)

    if (!title) {
      setTitleError(true)
    }
    if (!message) {
      setMessageError(true)
    }
    if (!email) {
      setEmailError(true)
    }
    if (!date) {
      setDateError(true)
    }
    if (title && email && message && date) {
      e.target.reset()
      console.log(title, message, email, date)
      console.log(dataForm.get('row-radio-buttons-group'))
    }
  }

  return (
    <BootcampLayout>
      <AdminContainer title="Създай нова задача">
        <Container>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="todo">
                <FormControlLabel value="todo" control={<Radio />} label="Todo" />
                <FormControlLabel value="inProgress" control={<Radio />} label="In Progress" />
                <FormControlLabel value="forReview" control={<Radio />} label="For Review" />
                <FormControlLabel value="done" control={<Radio />} label="Done" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              className={classes.field}
              label="Title"
              variant="outlined"
              color="primary"
              fullWidth
              required
              error={titleError}
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              className={classes.field}
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              color="primary"
              fullWidth
              required
              error={emailError}
            />
            <TextField
              onChange={(e) => setMessage(e.target.value)}
              className={classes.field}
              label="Message"
              variant="outlined"
              color="primary"
              multiline
              rows={4}
              fullWidth
              required
              error={messageError}
            />
            <TextField
              onChange={(e) => setDate(e.target.value)}
              className={classes.field}
              id="date"
              label="Final Date"
              type="date"
              variant="outlined"
              color="primary"
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={dateError}
            />
            <Button type="submit" color="info" variant="contained" endIcon={<KeyboardArrowRight />}>
              Submit
            </Button>
            <Button
              color="info"
              variant="outlined"
              startIcon={<KeyboardArrowLeft />}
              onClick={(e) => e.target.parentNode.reset()}
              sx={{ float: 'right' }}>
              Clear
            </Button>
          </form>
        </Container>
      </AdminContainer>
    </BootcampLayout>
  )
}
