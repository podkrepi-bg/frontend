import React from 'react'
import { useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import { RecurringDonationInput, RecurringDonationResponse } from 'gql/recurring-donation'

import { Currency } from 'gql/currency'
import { useRecurringDonation } from 'common/hooks/recurringDonation'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateRecurringDonation, useEditRecurringDonation } from 'service/recurringDonation'
import { endpoints } from 'service/apiEndpoints'
import { AlertStore } from 'stores/AlertStore'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import PersonSelectDialog from 'components/person/PersonSelectDialog'
import { Form, Formik } from 'formik'
import { RecurringDonationStatus } from 'gql/recurring-donation-status.d'
import { PersonResponse } from 'gql/person'
import { fromMoney, toMoney } from 'common/util/money'

const validCurrencies = Object.keys(Currency)
const validStatuses = Object.keys(RecurringDonationStatus)

const validationSchema = yup
  .object()
  .defined()
  .shape({
    status: yup.string().oneOf(validStatuses).required(),
    personId: yup.string().trim().uuid().required(),
    extSubscriptionId: yup.string().trim().required(),
    extCustomerId: yup.string().trim().required(),
    money: yup.number().min(0).integer().required(),
    currency: yup.string().oneOf(validCurrencies).required(),
    vaultId: yup.string().trim().uuid().required(),
  })

export default function EditForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  let id = router.query.id

  let initialValues: RecurringDonationInput = {
    status: '',
    personId: '',
    extSubscriptionId: '',
    extCustomerId: '',
    amount: 0,
    currency: '',
    sourceVault: '',
  }

  if (id) {
    // if id is present, we are editing an existing recurring donation
    id = String(id)
    const { data }: UseQueryResult<RecurringDonationResponse> = useRecurringDonation(id)

    initialValues = {
      status: data?.status,
      personId: data?.personId,
      extSubscriptionId: data?.extSubscriptionId,
      extCustomerId: data?.extCustomerId,
      money: fromMoney(data?.amount),
      currency: data?.currency,
      campaign: data?.sourceVault.campaign.title,
      vaultId: data?.sourceVault.id,
    }
  }

  const mutationFn = id ? useEditRecurringDonation(id) : useCreateRecurringDonation()

  const mutation = useMutation<
    AxiosResponse<RecurringDonationResponse>,
    AxiosError<ApiErrors>,
    RecurringDonationInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('recurring-donation:alerts:error'), 'error'),
    onSuccess: () => {
      if (id)
        queryClient.invalidateQueries([
          endpoints.recurringDonation.getRecurringDonation(String(id)).url,
        ])
      AlertStore.show(
        id ? t('recurring-donation:alerts:edit') : t('recurring-donation:alerts:create'),
        'success',
      )
      router.push(routes.admin.recurringDonation.index)
    },
  })
  async function onSubmit(data: RecurringDonationInput) {
    data.amount = toMoney(data.money)
    data.sourceVault = data.vaultId
    delete data.money
    delete data.campaign

    mutation.mutate(data)
  }

  let selectedPerson: PersonResponse | null = null
  if (id) {
    //for a new recurring donation, we don't have a person or campaign yet
    const { data }: UseQueryResult<RecurringDonationResponse> = useRecurringDonation(id)

    selectedPerson = {
      id: data?.personId,
      firstName: data?.person?.firstName,
      lastName: data?.person?.lastName,
      email: data?.person?.email,
      phone: data?.person?.phone,
      address: data?.person?.address,
      createdAt: data?.person?.createdAt,
    }
  }

  return (
    <Formik
      validateOnBlur
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      {({ errors, handleSubmit, setFieldTouched, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
              {id
                ? t('recurring-donation:edit-form-heading')
                : t('recurring-donation:form-heading')}
            </Typography>
            <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
              <Grid item xs={12}>
                <PersonSelectDialog
                  error={errors.personId}
                  selectedPerson={selectedPerson}
                  onConfirm={(person) => {
                    person ? setFieldValue('personId', person.id) : setFieldTouched('personId')
                  }}
                  onClose={(person) => {
                    person ? setFieldValue('personId', person.id) : setFieldTouched('personId')
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="Campaign"
                  label={t('recurring-donation:campaign')}
                  name="campaign"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  type="number"
                  label={t('recurring-donation:amount')}
                  name="money"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:currency')}
                  name="currency"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:status')}
                  name="status"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:extSubscriptionId')}
                  name="extSubscriptionId"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:extCustomerId')}
                  name="extCustomerId"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:vaultId')}
                  name="vaultId"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <SubmitButton fullWidth label={t('recurring-donation:cta:submit')} />
              </Grid>
              <Grid item xs={6}>
                <Link href={routes.admin.recurringDonation.index} passHref>
                  <Button>{t('recurring-donation:cta:cancel')}</Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
