import { Collapse, Grid, List, Typography } from '@mui/material'
import * as React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import FormTextField from 'components/common/form/FormTextField'
import CheckboxField from 'components/common/form/CircleCheckboxField'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'

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

export default function AnonymousMenu() {
  const classes = useStyles()
  const [field] = useField('anonymousDonation')
  const { t } = useTranslation('one-time-donation')

  return (
    <>
      <CheckboxField
        label={t('anonymous-menu.checkbox-label') as string}
        name="anonymousDonation"
      />
      <Collapse in={field.value} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Typography>{t('anonymous-menu.info-start')}</Typography>
          <Grid my={'35px'}>
            <FormTextField
              name="personsFirstName"
              type="text"
              label={t('anonymous-menu.name')}
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
          <Grid my={'35px'}>
            <FormTextField
              name="personsLastName"
              type="text"
              label={t('anonymous-menu.name')}
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
              name="personsEmail"
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
              name="personsPhone"
              type="text"
              label={t('anonymous-menu.phone')}
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
          <Typography>{t('anonymous-menu.info-end')}</Typography>
        </List>
      </Collapse>
    </>
  )
}
