import { Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import FormTextField from 'components/common/form/FormTextField'
import Link from 'components/common/Link'
import React from 'react'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AnonimusMenu from './AnonimusMenu'

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
    body: {
      maxWidth: '589px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
)

export default function SecondStep() {
  const classes = useStyles()
  return (
    <Grid className={classes.body}>
      <Typography className={classes.h2}>Впишете се</Typography>
      <Grid my={'36px'}>
        <FormTextField
          name="mail"
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
        <FormTextField
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
        <Button color="inherit" className={classes.submitButton}>
          Вписване
        </Button>
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
      <AnonimusMenu />
    </Grid>
  )
}
