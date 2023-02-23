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
import PersonSelectDialog from 'components/common/person/PersonSelectDialog'
import { Form, Formik } from 'formik'
import { RecurringDonationStatus } from 'gql/recurring-donation-status.d'
import { PersonResponse } from 'gql/person'
import { fromMoney, toMoney } from 'common/util/money'
import CampaignSelect from 'components/client/campaigns/CampaignSelect'
import { useCampaignList } from 'common/hooks/campaigns'
import { CampaignResponse } from 'gql/campaigns'

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
    money: yup.number().min(0).positive().required(),
    currency: yup.string().oneOf(validCurrencies).required(),
    sourceVault: yup.string().trim().uuid().required(),
  })

export default function EditForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const id = typeof router.query.id === 'object' ? router.query.id[0] || '' : router.query.id || ''

  const isNew = id === undefined
  const { data: campaigns }: UseQueryResult<CampaignResponse[]> = useCampaignList()

  let initialValues: RecurringDonationInput = {
    status: '',
    personId: '',
    extSubscriptionId: '',
    extCustomerId: '',
    money: 0.0,
    currency: '',
    sourceVault: '',
    campaign: '',
  }

  if (!isNew) {
    // if id is present, we are editing an existing recurring donation
    const { data }: UseQueryResult<RecurringDonationResponse> = useRecurringDonation(id)

    initialValues = {
      status: data?.status,
      personId: data?.personId,
      extSubscriptionId: data?.extSubscriptionId,
      extCustomerId: data?.extCustomerId,
      money: fromMoney(data?.amount || 0),
      currency: data?.currency,
      sourceVault: data?.sourceVault.id,
      campaign: data?.sourceVault.campaign.id,
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

    mutation.mutate(data)
  }

  let selectedPerson: PersonResponse | null = null
  if (id) {
    //for a new recurring donation, we don't have a person or campaign yet
    const { data }: UseQueryResult<RecurringDonationResponse> = useRecurringDonation(id)

    selectedPerson = {
      id: data?.personId || '',
      firstName: data?.person?.firstName,
      lastName: data?.person?.lastName,
      email: data?.person?.email,
      phone: data?.person?.phone,
      address: data?.person?.address,
      createdAt: data?.person?.createdAt,
      company: data?.person?.company,
      newsletter: data?.person?.newsletter,
      emailConfirmed: data?.person?.emailConfirmed,
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
                <CampaignSelect
                  type="Campaign"
                  label={t('recurring-donation:campaign')}
                  name="campaign"
                  disabled={false}
                  campaigns={campaigns}
                  selectedCampaign={initialValues.campaign}
                  handleCampaignSelected={(campaign) => {
                    campaigns?.forEach((c) => {
                      if (c.id === campaign && c.vaults) {
                        setFieldValue('sourceVault', c.vaults[0].id)
                      }
                    })
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  type="number"
                  label={t('recurring-donation:amount')}
                  name="money"
                  disabled={false}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:currency')}
                  name="currency"
                  disabled={false}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:status')}
                  name="status"
                  disabled={false}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:extSubscriptionId')}
                  name="extSubscriptionId"
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:extCustomerId')}
                  name="extCustomerId"
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:vaultId')}
                  name="sourceVault"
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
