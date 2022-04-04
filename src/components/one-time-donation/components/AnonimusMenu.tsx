import { Collapse, Grid, List, Typography } from '@mui/material'
import * as React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import FormTextField from 'components/common/form/FormTextField'
import CheckboxField from './FormCheckField'
import { useField } from 'formik'

const useStyles = makeStyles(() =>
  createStyles({
    message: {
      maxWidth: '540px',
      height: '70px',
      background: '#FFFFFF',
      borderRadius: '60px',
      textAlign: 'center',
    },
  }),
)

export default function AnonimusMenu() {
  const classes = useStyles()
  const [field] = useField('anonimusDonation')

  return (
    <>
      <CheckboxField label="Дарение без регистрация" name="anonimusDonation" />
      <Collapse in={field.value} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Typography>
            За да сме сигурни, че дарението ви ще отиде на правилното място бихме искали да вземем
            вашите данни. Данните ви няма да бъдат видими в платформата. Сертификат ще бъде изпратен
            на мейл, Няма да можете да видите отчетност, и репорт
          </Typography>
          <Grid my={'35px'}>
            <FormTextField
              name="name"
              type="text"
              label="Име"
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
          <Grid my={'45px'}>
            <FormTextField
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
          <Grid my={'17px'}>
            <FormTextField
              name="phone"
              type="text"
              label="Телефон"
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
          <Typography>Данните ви няма да бъдат споделяни с никой. </Typography>
        </List>
      </Collapse>
    </>
  )
}
