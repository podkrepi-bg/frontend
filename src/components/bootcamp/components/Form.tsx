import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { FormikHelpers } from 'formik'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
import * as yup from 'yup'
import { BootcampInput } from '../survices/bootcampSurvices'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
})

const validationSchema: yup.SchemaOf<BootcampInput> = yup
  .object()
  .defined()
  .shape({
    status: yup.string().required('A radio option is required'),
    title: yup.string().max(100).required(),
    email: yup.string().email().required(),
    message: yup.string().max(250).required(),
    date: yup.string().required(),
    firstName: yup.string().notRequired(),
    lastName: yup.string().notRequired(),
  })

type Props = {
  edit: boolean
  defaults: BootcampInput
  setStatus: (status: string) => void
  status: string
  handle: (
    values: BootcampInput,
    { setFieldError, resetForm }: FormikHelpers<BootcampInput>,
  ) => void
}

export default function BootcampForm({ defaults, handle, edit, setStatus, status }: Props) {
  const { t } = useTranslation()
  const classes = useStyles()
  const router = useRouter()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value)
  }
  return (
    <GenericForm onSubmit={handle} initialValues={defaults} validationSchema={validationSchema}>
      <Grid>
        <Grid>
          <FormLabel id="demo-row-radio-buttons-group-label">{t('bootcamp:task.status')}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={status}
            onChange={handleChange}>
            <FormControlLabel value="todo" control={<Radio />} label="Todo" />
            <FormControlLabel value="inProgress" control={<Radio />} label="In Progress" />
            <FormControlLabel value="forReview" control={<Radio />} label="For Review" />
            <FormControlLabel value="done" control={<Radio />} label="Done" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Grid>
        <Grid>
          <FormTextField
            className={classes.field}
            name="title"
            type="text"
            label={t('bootcamp:task.title')}
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
        </Grid>
        <Grid>
          <FormTextField
            className={classes.field}
            name="email"
            label={t('bootcamp:task.email')}
            type="email"
            variant="outlined"
            color="primary"
            fullWidth
            required
          />
        </Grid>
        <Grid>
          <FormTextField
            className={classes.field}
            name="message"
            type="text"
            label={t('bootcamp:task.message')}
            variant="outlined"
            color="primary"
            multiline
            rows={4}
            fullWidth
            required
          />
        </Grid>
        <Grid>
          <FormTextField
            className={classes.field}
            name="date"
            label={t('bootcamp:task.final-date')}
            type="date"
            variant="outlined"
            color="primary"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid>
          <FormTextField
            className={classes.field}
            name="firstName"
            label={t('bootcamp:task.first-name')}
            type="text"
            variant="outlined"
            color="primary"
            fullWidth
          />
        </Grid>
        <Grid>
          <FormTextField
            className={classes.field}
            name="lastName"
            label={t('bootcamp:task.second-name')}
            type="text"
            variant="outlined"
            color="primary"
            fullWidth
          />
        </Grid>
        <Grid>
          <SubmitButton
            type="submit"
            color="info"
            variant="contained"
            endIcon={<KeyboardArrowRight />}
            label={t('bootcamp:btns.save')}
          />
          <Button
            color="info"
            variant="outlined"
            startIcon={<KeyboardArrowLeft />}
            onClick={() => router.push('/bootcamp')}
            sx={{ marginLeft: 50 }}>
            {t('bootcamp:btns.cancel')}
          </Button>
          <Button
            disabled={edit}
            color="info"
            variant="outlined"
            startIcon={<KeyboardArrowLeft />}
            onClick={(e) => {
              const parent = e.target as Element
              const form = parent!.parentNode!.parentNode!.parentNode as HTMLFormElement
              form.reset()
            }}
            sx={{ float: 'right' }}>
            {t('bootcamp:btns.clear')}
          </Button>
        </Grid>
      </Grid>
    </GenericForm>
  )
}
