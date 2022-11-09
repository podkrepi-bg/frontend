import { useMutation, useQueryClient, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'
import { UUID } from 'gql/types'

import { RecurringDonationInput, RecurringDonationResponse } from 'gql/recurring-donation'

import { Currency } from 'gql/currency'
import { useRecurringDonation } from 'common/hooks/recurringDonation'
import { useCampaignList } from 'common/hooks/campaigns'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateRecurringDonation, useEditRecurringDonation } from 'service/recurringDonation'
import { endpoints } from 'service/apiEndpoints'
import { AlertStore } from 'stores/AlertStore'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import CurrencySelect from 'components/currency/CurrencySelect'
import RecurringDonationStatusSelect from './RecurringDonationStatusSelect'
import PersonSelectDialog from 'components/person/PersonSelectDialog'
import { Form, Formik } from 'formik'
import { RecurringDonationStatus } from 'gql/recurring-donation-status.d'
import { PersonResponse } from 'gql/person'
import CampaignSelect from 'components/campaigns/CampaignSelect'
import { fromMoney, toMoney } from 'common/util/money'

const validCurrencies = Object.keys(Currency)
const validStatuses = Object.keys(RecurringDonationStatus)

const validationSchema = yup
  .object()
  .defined()
  .shape({
    status: yup.string().oneOf(validStatuses).required(),
    personId: yup.string().trim().uuid().required(),
    extSubscriptionId: yup.string().trim().uuid().required(),
    extCustomerId: yup.string().trim().uuid().required(),
    money: yup.number().min(0).integer().required(),
    currency: yup.string().oneOf(validCurrencies).required(),
    campaignId: yup.string().trim().uuid().required(),
  })

export default function EditForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  let id = router.query.id

  const { data: campaigns } = useCampaignList()

  //since only the campaign can be selected by the admin
  //we need a map from campaignId to vaultId
  //use the first vaultId for now
  //campaigns without vaults are filtered out
  const defaultVaults = {}
  campaigns?.forEach((campaign) => {
    if (campaign.vaults && campaign.vaults.length > 0) {
      defaultVaults[campaign.id] = campaign.vaults[0].id
    }
  })

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
      sourceVault: data?.sourceVault,
      campaignId: data?.sourceVault.campaign.id,
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
        queryClient.invalidateQueries(
          endpoints.recurringDonation.getRecurringDonation(String(id)).url,
        )
      AlertStore.show(
        id ? t('recurring-donation:alerts:edit') : t('recurring-donation:alerts:create'),
        'success',
      )
      router.push(routes.admin.recurringDonation.index)
    },
  })
  async function onSubmit(data: RecurringDonationInput) {
    data.amount = toMoney(data.money)
    data.sourceVault = defaultVaults[data.campaignId]
    data.vaultId = data.sourceVault

    mutation.mutate(data)
  }

  let selectedPerson: PersonResponse | null = null
  let selectedCampaignId: UUID = ''
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

    if (data?.sourceVault) {
      selectedCampaignId = data?.sourceVault.campaign.id
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
                  label={t('recurring-donation:campaign')}
                  name="campaignId"
                  campaigns={campaigns}
                  selectedCampaign={selectedCampaignId}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField type="number" label={t('recurring-donation:amount')} name="money" />
              </Grid>
              <Grid item xs={6}>
                <CurrencySelect />
              </Grid>
              <Grid item xs={6}>
                <RecurringDonationStatusSelect />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:extSubscriptionId')}
                  name="extSubscriptionId"
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label={t('recurring-donation:extCustomerId')}
                  name="extCustomerId"
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
