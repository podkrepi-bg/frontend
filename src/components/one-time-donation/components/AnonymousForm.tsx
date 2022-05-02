import { Box, Collapse, Grid, Typography } from '@mui/material'
import * as React from 'react'
import FormTextField from 'components/common/form/FormTextField'
import CircleCheckboxField from 'components/common/form/CircleCheckboxField'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import theme from 'common/theme'

export default function AnonymousMenu() {
  const [field] = useField('anonymousDonation')
  const { t } = useTranslation('one-time-donation')

  return (
    <Box marginTop={theme.spacing(5)}>
      <CircleCheckboxField
        label={
          <Typography color="#343434" fontWeight="bold">
            {t('anonymous-menu.checkbox-label')}
          </Typography>
        }
        name="anonymousDonation"
      />
      <Collapse in={field.value} timeout="auto" unmountOnExit>
        <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={12} color="#343434" sx={{ opacity: 0.9 }}>
            <Typography>{t('anonymous-menu.info-start')}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormTextField
              name="personsFirstName"
              type="text"
              label={t('anonymous-menu.firstName')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormTextField
              name="personsLastName"
              type="text"
              label={t('anonymous-menu.lastName')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormTextField name="personsEmail" type="text" label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormTextField
              name="personsPhone"
              type="text"
              label={t('anonymous-menu.phone')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} color="GrayText">
            <Typography>* {t('anonymous-menu.info-end')}</Typography>
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  )
}
