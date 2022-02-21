import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import createStyles from '@mui/styles/createStyles'

import makeStyles from '@mui/styles/makeStyles'
import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors } from 'service/apiErrors'
import { CityResponse, CityFormData, CityInput } from 'gql/cities'
import { useCountriesList } from 'common/hooks/cities'
import { useCreateCityRequest } from 'service/city'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
  }),
)

const validationSchema: yup.SchemaOf<CityFormData> = yup
  .object()
  .defined()
  .shape({
    name: yup.string().trim().min(3).max(25).required(),
    postalCode: yup.string().trim().min(1).max(10).required(),
    countryId: yup.string(),
  })

export default function CityForm() {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()
  const countries = useCountriesList()
  const [countryId, setCountryId] = useState('')
  const initialValues = {
    name: '',
    postalCode: '',
    countryId: '',
  }

  const mutation = useMutation<AxiosResponse<CityResponse>, AxiosError<ApiErrors>, CityInput>({
    mutationFn: useCreateCityRequest(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      router.push(routes.admin.cities.home)
    },
  })

  const onSubmit = (values: CityInput) => {
    console.log(values.postalCode)
    const data = {
      name: values.name,
      postalCode: values.postalCode,
      countryId: countryId,
    }
    mutation.mutate(data)
  }

  function handleChange(event: any) {
    setCountryId(event.target.value)
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          Създай град
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField type="text" label="Cities: Име" name="name" autoComplete="name" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              label="Cities:Пощенски код"
              name="postalCode"
              autoComplete="postal-code"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Държава</InputLabel>
            <Select
              fullWidth
              id="countryId"
              name="countryId"
              value={countryId}
              onChange={handleChange}>
              {countries?.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="Създай" loading={mutation.isLoading} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={() => router.push(routes.admin.cities.home)}>
              Откажи
            </Button>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
