import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import Link from 'components/common/Link'
import React, { useState } from 'react'
import SubMenu from './Submenu'

export default function SecondStep() {
  const [status, setStatus] = useState('0')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value)
  }
  return (
    <Grid>
      <Typography>Впишете се </Typography>
      <Grid>
        <TextField
          // className={classes.field}
          name="email"
          type="text"
          label="Email"
          variant="outlined"
          color="primary"
        />
      </Grid>
      <Grid>
        <TextField
          // className={classes.field}
          name="password"
          type="text"
          label="Парола"
          variant="outlined"
          color="primary"
        />
      </Grid>
      <Grid>
        <FormControlLabel
          control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
          label="Запомни"
        />
      </Grid>
      <Grid>
        <SubmitButton type="submit" color="info" variant="contained" label="Вписване" />
        <Button color="info" variant="outlined" onClick={() => console.log('clicked')}>
          Google login
        </Button>
        <Typography>
          Или
          <Link href="#">Създайте нов профил</Link>
        </Typography>
      </Grid>
      <SubMenu />
    </Grid>
  )
}
