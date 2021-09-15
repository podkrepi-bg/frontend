import * as yup from 'yup'
import { FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { makeStyles, createStyles } from '@material-ui/core/styles'

import { ApiErrors } from 'common/api-routes'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'

export type CampaignFormData = {
  title: string
  type: string
  targetAmount: number
  startDate: string
  endDate: string
  description: string
}

const validationSchema: yup.SchemaOf<CampaignFormData> = yup.object().defined().shape({
  title: yup.string().trim().required(), //Add .min(20).max(100) when finished with implementation
  type: yup.string().required(),
  targetAmount: yup.number().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  description: yup.string().trim().required(), //Add .min(150).max(500) when finished with implementation
})

const defaults: CampaignFormData = {
  title: '',
  type: '',
  targetAmount: 1000,
  startDate: '',
  endDate: '',
  description: '',
}

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
    message: {
      '& textarea': { resize: 'vertical' },
    },
  }),
)

export type CampaignFormProps = { initialValues?: CampaignFormData }

export default function CampaignForm({ initialValues = defaults }: CampaignFormProps) {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const onSubmit = async (
    values: CampaignFormData,
    { setFieldError, resetForm }: FormikHelpers<CampaignFormData>,
  ) => {
    console.log(values)
    try {
      setLoading(true)
      const response = await fetch('/api/campaign/create', {
        method: 'POST',
        body: values && JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
      setLoading(false)
      console.log(response)
      if (response.status >= 299) {
        const json: ApiErrors = await response.json()
        if ('validation' in json) {
          json.validation?.map(({ field, validator, message, customMessage }) => {
            setFieldError(field, t(`validation:${customMessage ? message : validator}`))
          })
        }
        throw new Error()
      }
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      resetForm()
    } catch (error) {
      console.error(error)
      setLoading(false)
      AlertStore.show(t('common:alerts.error'), 'error')
    }
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('campaigns:form-heading')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="campaigns:campaign.title"
              name="title"
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              displayEmpty
              fullWidth
              label={t('campaigns:campaign.type')}
              defaultValue=""
              name="type">
              <MenuItem value="" disabled>
                <em>{t('campaigns:campaign.type')}</em>
              </MenuItem>
              <MenuItem value={1}>{t('campaigns:campaign.types.type1')}</MenuItem>
              <MenuItem value={2}>{t('campaigns:campaign.types.type2')}</MenuItem>
              <MenuItem value={3}>{t('campaigns:campaign.types.type3')}</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="number"
              name="targetAmount"
              autoComplete="target-amount"
              label="campaigns:campaign.amount"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="date"
              name="startDate"
              label="campaigns:campaign.start-date"
              helperText={null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="date"
              name="endDate"
              label="campaigns:campaign.end-date"
              helperText={null}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              rows={5}
              multiline
              type="text"
              name="description"
              label="campaigns:campaign.description"
              autoComplete="description"
              className={classes.message}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="campaigns:cta.save" loading={loading} disabled />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
