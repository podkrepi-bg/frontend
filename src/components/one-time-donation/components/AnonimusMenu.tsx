import { Collapse, Grid, List, Typography } from '@mui/material'
import * as React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import FormTextField from 'components/common/form/FormTextField'
import CheckboxField from './FormCheckField'
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

export default function AnonimusMenu() {
  const classes = useStyles()
  const [field] = useField('anonimusDonation')
  const { t } = useTranslation('one-time-donation')

  return (
    <>
      <CheckboxField label={t('anonimus-menu.checkbox-label') as string} name="anonimusDonation" />
      <Collapse in={field.value} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Typography>{t('anonimus-menu.info-start')}</Typography>
          <Grid my={'35px'}>
            <FormTextField
              name="name"
              type="text"
              label={t('anonimus-menu.name')}
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
              label={t('anonimus-menu.phone')}
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
          <Typography>{t('anonimus-menu.info-end')}</Typography>
        </List>
      </Collapse>
    </>
  )
}
