import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Button, Grid, Typography } from '@mui/material'
import { routes } from 'common/routes'
import { Heading, SectionHeading } from '../campaigns.styled'
import { CampaignState } from '../../../client/campaigns/helpers/campaign.enums'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'

// Validations
import * as yup from 'yup'
import { format, parse, isDate } from 'date-fns'

// Types
import {
  // CampaignResponse,
  // CampaignInput,
  // CampaignUploadImage,
  CampaignAdminCreateFormData,
} from 'gql/campaigns'
import { Currency } from 'gql/currency'
import { CategoryType } from 'gql/types'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'

// Components
import ListIconButtons from '../ListIconButtons'
import Link from 'next/link'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import CampaignTypeSelect from '../CampaignTypeSelect'
import CoordinatorSelect from './CoordinatorSelect'
import BeneficiarySelect from './BeneficiarySelect'
import OrganizerSelect from './OrganizerSelect'
import CampaignFilter from '../CampaignFilter'

// Validation helpers
const formatString = 'yyyy-MM-dd'

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, formatString, new Date())

  return parsedDate
}

// Campaigns

export default function CampaignForm() {
  const { t } = useTranslation()

  const onSubmit = () => {}

  const initialValues = {}

  // Validations
  // TODO: ADD validation for type of campaign
  const validationSchema: yup.SchemaOf<CampaignAdminCreateFormData> = yup
    .object()
    .defined()
    .shape({
      title: yup.string().trim().min(10).max(200).required(),
      slug: yup.string().trim().min(10).max(200).optional(),
      description: yup.string().trim().min(50).max(60000).required(),
      targetAmount: yup.number().integer().positive().required(),
      allowDonationOnComplete: yup.bool().optional(),
      campaignTypeId: yup.string().uuid().required(),
      beneficiaryId: yup.string().uuid().required(),
      coordinatorId: yup.string().uuid().required(),
      organizerId: yup.string().uuid().required(),
      startDate: yup.date().transform(parseDateString).required(),
      state: yup.mixed().oneOf(Object.values(CampaignState)).required(),
      endDate: yup
        .date()
        .transform(parseDateString)
        .min(yup.ref('startDate'), `end date can't be before start date`),
      terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
      gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
      currency: yup.mixed().oneOf(Object.values(Currency)).required(),
    })

  // type of campaign
  const [selectedCampaignType, setSelectedCampaignType] = useState<CampaignTypeCategory>(
    CampaignTypeCategory.all,
  )
  const selectedCampaignTypeHandler = (type: CategoryType) => {
    setSelectedCampaignType(type)
  }

  const beneficiaryTypes = [
    { value: 'personal', label: 'Кампанията е лична' },
    {
      value: 'beneficiary',
      label: 'Кампанията  се организира  за друг бенефициент - физическо лице',
    },
  ]

  return (
    <Grid container direction="column" component="section" mt={6}>
      <Grid item xs={12}>
        <SectionHeading>{t('campaigns:steps.step1-type')}</SectionHeading>
      </Grid>

      {/* FORM */}
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          {/* Campaign Name */}

          <Grid item xs={12} mt={5}>
            <Heading>{t('campaigns:steps.step1-type')}</Heading>

            <FormTextField
              type="text"
              name="title"
              label="campaigns:campaign.title"
              autoComplete="title"
            />
          </Grid>
          {/* Campaign Type */}
          <Grid item xs={12} mt={5}>
            <Heading>{t('campaigns:campaignType')}</Heading>
            <CampaignFilter
              selected={selectedCampaignType}
              showCampaigns={false}
              onClick={selectedCampaignTypeHandler}
              styles={{ maxWidth: 'md', margin: 'left' }}
            />
          </Grid>
          {/* Campaign Beneficiary */}
          <Grid item xs={12} mt={5}>
            <Heading>Бенфициент на кампанията</Heading>

            <RadioButtonGroup name="beneficiary" options={beneficiaryTypes} />
          </Grid>

          <Grid item xs={12} mt={3}>
            <FormTextField
              type="text"
              label="Три имена на бенефициент"
              name="beneficiary"
              autoComplete="beneficiary"
            />
          </Grid>

          {/* Amount */}

          <Grid item>
            <Heading>{t('campaigns:campaign.amount')}</Heading>
          </Grid>
          <Grid item xs={2}>
            <FormTextField
              type="number"
              name="targetAmount"
              autoComplete="target-amount"
              placeholder="88 000.00"
            />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
