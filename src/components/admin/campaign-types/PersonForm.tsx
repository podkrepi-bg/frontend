import createStyles from '@mui/styles/createStyles'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { Button, Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useRouter } from 'next/router'
import React from 'react'
import * as yup from 'yup'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { CampaignTypeFormData } from 'gql/campaign-types'
import { createCampaignType } from 'common/rest'
import { AxiosError, AxiosResponse } from 'axios'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors } from 'common/api-errors'
import theme from 'common/theme'

export const validationSchema: yup.SchemaOf<CampaignTypeFormData> = yup.object().defined().shape({
  parentId: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  slug: yup.string().optional(),
})

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      color: theme.palette.primary.dark,
      marginLeft: '15%',
    },
  }),
)

export default function BankAccountsForm() {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()
  const initialValues: CampaignTypeFormData = {
    name: '',
    description: '',
    slug: '',
    parentId: '',
  }

  const mutation = useMutation<
    AxiosResponse<CampaignTypeFormData>,
    AxiosError<ApiErrors>,
    CampaignTypeFormData
  >({
    mutationFn: createCampaignType,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      router.push('/admin/campaign-types')
    },
  })

  const onSubmit = (data: CampaignTypeFormData) => {
    mutation.mutate(data)
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          ADD CAMPAIGN TYPE
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={1}>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="name"
              autoComplete="target-amount"
              label="Name"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%', height: '30px' }}
              type="text"
              name="description"
              autoComplete="target-amount"
              label="Description"
              multiline
              rows={3.5}
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="parentId"
              autoComplete="target-amount"
              label="Category"
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '15%',
              marginTop: '1.1%',
            }}>
            <SubmitButton
              style={{ width: '50%' }}
              label="Add campagin type"
              loading={mutation.isLoading}
              sx={{ backgroundColor: theme.palette.secondary.main }}
            />
            <Button
              onClick={() => {
                router.push('/admin/campaign-types')
              }}
              variant="outlined"
              sx={{
                width: '50%',
                marginTop: '1%',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
              }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
