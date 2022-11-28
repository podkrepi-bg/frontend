import React from 'react'
import { useTranslation } from 'next-i18next'
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
            {t('nav.report-form.title')}
          </Typography>
        </Grid2>
        <Grid2 xs={12}>
          <FormTextField type="text" label={t('nav.report-form.email')} name="email" />
        </Grid2>
        <Grid2 xs={12}>
          <FormSelectField
            label={t('nav.report-form.type')}
            name="type"
            options={getOptionsArrayFromEnum(ReportType).map((option) => ({
              ...option,
              name: t(`nav.report-form.${option.key.toLowerCase()}`),
            }))}
          />
        </Grid2>
        <Grid2 xs={12}>
          <FormTextField
            type="textarea"
            multiline
            rows={4}
            label={t('nav.report-form.description')}
            name="email"
          />
        </Grid2>
      </Grid2>
    </GenericForm>
  )
}

export default ReportForm
