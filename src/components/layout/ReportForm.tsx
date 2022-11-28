import React from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { Typography, Unstable_Grid2 as Grid2 } from '@mui/material'

import { email } from 'common/form/validation'
import { getOptionsArrayFromEnum } from 'common/form/helpers'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import FormSelectField from 'components/common/form/FormSelectField'

enum ReportType {
  Bug = 'bug',
  Feedback = 'feedback',
  Other = 'other',
}

interface ReportFormData {
  email: string
  type: ReportType
  description: string
}

const validationSchema: yup.SchemaOf<ReportFormData> = yup
  .object()
  .defined()
  .shape({
    email: email.required(),
    type: yup.mixed<ReportType>().oneOf(Object.values(ReportType)).required(),
    description: yup.string().max(100).required(),
  })

const defaults: ReportFormData = {
  email: '',
  type: ReportType.Bug,
  description: '',
}

function ReportForm() {
  const { t } = useTranslation()
  const onSubmit = (data: ReportFormData) => {
    console.log(data)
  }

  return (
    <GenericForm onSubmit={onSubmit} initialValues={defaults} validationSchema={validationSchema}>
      <Grid2 container spacing={3} padding={3} maxWidth={330}>
        <Grid2 xs={12}>
          <Typography variant="h6" component="h2">
            {t('common:reportForm.header')}
          </Typography>
        </Grid2>
        <Grid2 xs={12}>
          <FormTextField type="text" label={t('nav:report.email')} name="email" />
        </Grid2>
        <Grid2 xs={12}>
          <FormSelectField
            label={t('nav:report.type')}
            name="type"
            options={getOptionsArrayFromEnum(ReportType)}
          />
        </Grid2>
        <Grid2 xs={12}>
          <FormTextField
            type="textarea"
            multiline
            rows={4}
            label={t('nav:report.description')}
            name="email"
          />
        </Grid2>
      </Grid2>
    </GenericForm>
  )
}

export default ReportForm
