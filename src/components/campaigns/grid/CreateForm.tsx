// import React, { useState } from 'react'
// import { useMutation } from 'react-query'
// import { useRouter } from 'next/router'
// import { useTranslation } from 'next-i18next'
// import Link from 'next/link'
// import { AxiosError, AxiosResponse } from 'axios'
// import { Box, Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'

// import { CampaignInput, CampaignResponse } from 'gql/campaigns'
// import { routes } from 'common/routes'
// import { ApiErrors } from 'service/apiErrors'
// import { useCreateCampaign } from 'service/campaign'
// import { AlertStore } from 'stores/AlertStore'
// import SubmitButton from 'components/common/form/SubmitButton'
// import { Currencies, CampaignStatus } from './CampaignTypes'
// import { useCampaignTypesList } from 'common/hooks/campaigns'
// import { usePersonList } from 'common/hooks/person'
// import { useVaultsList } from 'common/hooks/vaults'
// import GenericForm from 'components/common/form/GenericForm'
// import * as yup from 'yup'
// import FormTextField from 'components/common/form/FormTextField'
// import { useCoordinatorsList } from 'common/hooks/coordinators'
// import { useViewBeneficiaryId } from 'common/hooks/beneficiary'

// const validationSchema: yup.SchemaOf<CampaignInput> = yup
//   .object()
//   .defined()
//   .shape({
//     status: yup.string().trim().min(1).max(10).required(),
//     targetAmount: yup.number().required(),
//     currency: yup.string().trim().min(1).max(10),
//     description: yup.string().trim().min(1).max(300).required(),
//     essence: yup.string().trim().min(1).max(300).required(),
//     title: yup.string().trim().min(1).max(10),
//     coordinatorId: yup.string(),
//     slug: yup.string(),
//     beneficiaryId: yup.string(),
//     campaignTypeId: yup.string(),
//     approvedById: yup.string(),
//     startDate: yup.string().required(),
//     endDate: yup.string().required(),
//   })

// export default function CreateForm() {
//   const router = useRouter()
//   const { data: coordinators } = useCoordinatorsList()
//   const { data: beneficiaries } = useViewBeneficiaryId()
//   const { data: campaignTypes } = useCampaignTypesList()
//   const { data: personList } = usePersonList()
//   const { data: vaults } = useVaultsList()
//   const currencies = Object.keys(Currencies)
//   const [currency, setCurrency] = useState('')
//   const [approvedById, setApprovedById] = useState('')
//   const [vaultId, setVaultId] = useState('')

//   const [campaignTypeId, setCampaignTypeId] = useState('')
//   const [coordinatorId, setCoordinatorId] = useState('')
//   const [beneficiaryId, setBeneficiaryId] = useState('')

//   const initialValues: CampaignInput = {
//     status: CampaignStatus.initial,
//     targetAmount: 0,
//     currency: '',
//     description: '',
//     essence: '',
//     title: '',
//     coordinatorId: '',
//     slug: '',
//     beneficiaryId: '',
//     campaignTypeId: '',
//     approvedById: '',
//     startDate: '',
//     endDate: '',
//   }
//   const { t } = useTranslation()

//   const mutationFn = useCreateCampaign()

//   const mutation = useMutation<
//     AxiosResponse<CampaignResponse>,
//     AxiosError<ApiErrors>,
//     CampaignInput
//   >({
//     mutationFn,
//     onError: () => AlertStore.show(t('Campaigns:alerts:error'), 'error'),
//     onSuccess: () => {
//       AlertStore.show(t('Campaigns:alerts:create'), 'success')
//       router.push(routes.admin.campaigns.index)
//     },
//   })

//   function handleSubmit(values: CampaignInput) {
//     const data: CampaignInput = {
//       status: CampaignStatus.initial,
//       currency: currency,
//       targetAmount: values.targetAmount,
//       description: values.description,
//       title: values.title,
//       slug: values.slug,
//       essence: values.essence,
//       campaignTypeId: campaignTypeId,
//       beneficiaryId: beneficiaryId,
//       coordinatorId: coordinatorId,
//       approvedById: approvedById,
//       startDate: values.startDate,
//       endDate: values.endDate,
//     }
//     mutation.mutate(data)
//   }

//   return (
//     <GenericForm
//       onSubmit={handleSubmit}
//       initialValues={initialValues}
//       validationSchema={validationSchema}>
//       <Box>
//         <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
//           {t('Campaigns:form-heading')}
//         </Typography>
//         <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
//           <Grid item xs={12}>
//             <FormTextField
//               type="string"
//               label="campaigns:title"
//               name="title"
//               autoComplete="title"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormTextField type="string" label="campaigns:slug" name="slug" autoComplete="slug" />
//           </Grid>
//           <Grid item xs={12}>
//             <FormTextField
//               type="string"
//               label="campaigns:essence"
//               name="essence"
//               autoComplete="essence"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <InputLabel htmlFor="my-input">Координатори</InputLabel>
//             <Select
//               fullWidth
//               type="enum"
//               id="coordinatorId"
//               name="coordinatorId"
//               value={coordinatorId}
//               onChange={(event) => setCoordinatorId(event.target.value)}>
//               {coordinators?.map((coordinator) => {
//                 return (
//                   <MenuItem key={coordinator.id} value={coordinator.id}>
//                     {coordinator}
//                   </MenuItem>
//                 )
//               })}
//             </Select>
//           </Grid>
//           <Grid item xs={12}>
//             <InputLabel htmlFor="my-input">Координатори</InputLabel>
//             <Select
//               fullWidth
//               type="enum"
//               id="beneficiaryId"
//               name="beneficiaryId"
//               value={beneficiaryId}
//               onChange={(event) => setBeneficiaryId(event.target.value)}>
//               {beneficiaries?.map((ben) => {
//                 return (
//                   <MenuItem key={ben.firstName} value={ben.firstName}>
//                     {ben}
//                   </MenuItem>
//                 )
//               })}
//             </Select>
//           </Grid>
//           <Grid item xs={12}>
//             <InputLabel htmlFor="my-input">Координатори</InputLabel>
//             <Select
//               fullWidth
//               type="enum"
//               id="campaignTypeId"
//               name="campaignTypeId"
//               value={campaignTypeId}
//               onChange={(event) => setCampaignTypeId(event.target.value)}>
//               {campaignTypes?.map((camp) => {
//                 return (
//                   <MenuItem key={camp.id} value={camp.id}>
//                     {camp}
//                   </MenuItem>
//                 )
//               })}
//             </Select>
//           </Grid>
//           <Grid item xs={12}>
//             <FormTextField
//               type="number"
//               label="campaigns:Сума"
//               name="targetAmount"
//               autoComplete="targetAmount"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <InputLabel htmlFor="my-input">Валути</InputLabel>
//             <Select
//               fullWidth
//               type="enum"
//               id="currency"
//               name="currency"
//               value={currency}
//               onChange={(event) => setCurrency(event.target.value)}>
//               {currencies?.map((curr) => {
//                 return (
//                   <MenuItem key={curr} value={curr}>
//                     {curr}
//                   </MenuItem>
//                 )
//               })}
//             </Select>
//           </Grid>
//           <Grid item xs={12}>
//             <InputLabel htmlFor="my-input">Трезор</InputLabel>
//             <Select
//               fullWidth
//               id="vaultId"
//               name="vaultId"
//               value={vaultId}
//               onChange={(event) => setVaultId(event.target.value)}>
//               {vaults?.map((acc) => {
//                 return (
//                   <MenuItem key={acc.id} value={acc.id}>
//                     {acc.name}
//                   </MenuItem>
//                 )
//               })}
//             </Select>
//           </Grid>
//           <Grid item xs={12}>
//             <InputLabel htmlFor="my-input">Одобрен от</InputLabel>
//             <Select
//               fullWidth
//               id="approvedById"
//               name="approvedById"
//               value={approvedById}
//               onChange={(event) => setApprovedById(event.target.value)}>
//               {personList?.map((acc) => {
//                 return (
//                   <MenuItem key={acc.id} value={acc.id}>
//                     {acc.firstName} {acc.lastName}
//                   </MenuItem>
//                 )
//               })}
//             </Select>
//           </Grid>
//           <Grid item xs={6}>
//             <SubmitButton fullWidth label={t('campaigns:cta:submit')} />
//           </Grid>
//           <Grid item xs={6}>
//             <Link href={routes.admin.campaigns.index} passHref>
//               <Button fullWidth={true}>{t('campaigns:cta:cancel')}</Button>
//             </Link>
//           </Grid>
//         </Grid>
//       </Box>
//     </GenericForm>
//   )
// }

import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { format, parse, isDate } from 'date-fns'
import { AxiosError, AxiosResponse } from 'axios'
import { Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import { routes } from 'common/routes'
import { PersonFormData } from 'gql/person'
import { useCreateCampaign } from 'service/campaign'
import { AlertStore } from 'stores/AlertStore'
import { createSlug } from 'common/util/createSlug'
import PersonDialog from 'components/person/PersonDialog'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { CampaignResponse, CampaignFormData, CampaignInput } from 'gql/campaigns'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'

import CampaignTypeSelect from '../CampaignTypeSelect'
import FileUploadModal from '../FileUploadModal'

const formatString = 'yyyy-MM-dd'

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, formatString, new Date())

  return parsedDate
}

const validationSchema: yup.SchemaOf<CampaignFormData> = yup
  .object()
  .defined()
  .shape({
    title: yup.string().trim().min(10).max(100).required(),
    description: yup.string().trim().min(50).max(500).required(),
    targetAmount: yup.number().required(),
    campaignTypeId: yup.string().uuid().required(),
    beneficiaryId: yup.string().uuid().required(),
    coordinatorId: yup.string().uuid().required(),
    startDate: yup.date().transform(parseDateString).required(),
    endDate: yup
      .date()
      .transform(parseDateString)
      .min(yup.ref('startDate'), `end date can't be before start date`),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
  })

const defaults: CampaignFormData = {
  title: '',
  campaignTypeId: '',
  beneficiaryId: '',
  coordinatorId: '',
  targetAmount: 1000,
  startDate: format(new Date(), formatString),
  endDate: format(new Date().setMonth(new Date().getMonth() + 1), formatString),
  description: '',
  terms: false,
  gdpr: false,
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
  const { t } = useTranslation()
  const router = useRouter()
  const [coordinator, setCoordinator] = useState<PersonFormData>()
  const [beneficiary, setBeneficiary] = useState<PersonFormData>()

  const mutation = useMutation<
    AxiosResponse<CampaignResponse>,
    AxiosError<ApiErrors>,
    CampaignInput
  >({
    mutationFn: useCreateCampaign(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: CampaignFormData,
    { setFieldError, resetForm }: FormikHelpers<CampaignFormData>,
  ) => {
    try {
      const response = await mutation.mutateAsync({
        title: values.title,
        slug: createSlug(values.title),
        description: values.description,
        targetAmount: values.targetAmount,
        startDate: values.startDate,
        endDate: values.endDate,
        essence: '',
        campaignTypeId: values.campaignTypeId,
        beneficiaryId: values.beneficiaryId,
        coordinatorId: values.coordinatorId,
        currency: 'BGN',
      })
      resetForm()
      router.push(routes.campaigns.viewCampaignBySlug(response.data.slug))
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
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
            <CampaignTypeSelect />
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
          <Grid item xs={12} sm={6}>
            {coordinator ? (
              <Typography fontWeight="bold" variant="body2">
                {coordinator?.firstName} {coordinator?.lastName}
              </Typography>
            ) : (
              <PersonDialog
                type="coordinator"
                label={t('campaigns:campaign.coordinator.add')}
                onSubmit={async (values: PersonFormData) => {
                  setCoordinator(values)
                  console.log('new coordinator', { values })
                }}
              />
            )}
            <input type="hidden" name="coordinatorId" />
          </Grid>
          <Grid item xs={12} sm={6}>
            {beneficiary ? (
              <Typography fontWeight="bold" variant="body2">
                {beneficiary?.firstName} {beneficiary?.lastName}
              </Typography>
            ) : (
              <PersonDialog
                type="beneficiary"
                label={t('campaigns:campaign.beneficiary.add')}
                onSubmit={async (values: PersonFormData) => {
                  setBeneficiary(values)
                  console.log('new beneficiary', { values })
                }}
              />
            )}
            <input type="hidden" name="beneficiaryId" />
          </Grid>
          <Grid item xs={12}>
            <FileUploadModal />
          </Grid>
          <Grid item xs={12}>
            <AcceptTermsField name="terms" />
            <AcceptPrivacyPolicyField name="gdpr" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="campaigns:cta.submit" loading={mutation.isLoading} />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
