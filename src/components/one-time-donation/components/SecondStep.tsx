import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import Link from 'components/common/Link'
import React, { useState } from 'react'
import SubMenu from './Submenu'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const useStyles = makeStyles(() =>
  createStyles({
    h2: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '35px',
      lineHeight: '120%',
      marginTop: '91px',
      marginBottom: '39px',
      letterSpacing: '-0.5px',
      color: '#000000',
    },
    message: {
      maxWidth: '540px',
      height: '70px',
      background: '#FFFFFF',
      borderRadius: '60px',
      textAlign: 'center',
    },
    checked: {
      width: '309px',
      height: '75px',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginRight: '33px',
      marginBottom: '20px',
      background: '#D2F0FF',
    },
    submitButton: {
      maxWidth: '540px',
      height: '80px',
      background: '#62C4FB',
      border: '2px solid #909090',
      boxSizing: 'border-box',
      borderRadius: '60px',
      marginBottom: '35px',
    },
    googleButton: {
      maxWidth: '540px',
      height: '80px',
      background: '#909090',
      border: '2px solid #909090',
      boxSizing: 'border-box',
      borderRadius: '60px',
      marginBottom: '51px',
    },
  }),
)

export default function SecondStep() {
  const classes = useStyles()
  return (
    <Grid mx={25}>
      <Typography className={classes.h2} variant="h2">
        Впишете се
      </Typography>
      <Grid my={'36px'}>
        <TextField
          // className={classes.field}
          name="email"
          type="text"
          label="Email"
          variant="outlined"
          color="primary"
          fullWidth
          InputProps={{
            classes: {
              root: classes.message,
            },
          }}
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
          fullWidth
          InputProps={{
            classes: {
              root: classes.message,
            },
          }}
        />
      </Grid>
      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              icon={<CircleOutlinedIcon />}
              checkedIcon={<CheckCircleIcon color="disabled" />}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 33 } }}
            />
          }
          label="Запомни"
        />
      </Grid>
      <Stack my={'40px'} direction="column">
        <SubmitButton color="inherit" className={classes.submitButton} label="Вписване" />
        <Button
          color="inherit"
          className={classes.googleButton}
          onClick={() => console.log('clicked')}>
          Google login
        </Button>
        <Typography>
          Или
          <Link href="#"> Създайте нов профил </Link>
        </Typography>
      </Stack>
      <SubMenu />
    </Grid>
  )
}
