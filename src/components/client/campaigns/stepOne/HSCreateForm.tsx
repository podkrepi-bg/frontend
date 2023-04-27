import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Button, Grid, Typography } from '@mui/material'
import { routes } from 'common/routes'
import { Heading, SectionHeading } from '../campaigns.styled'
import { CampaignState } from '../../../client/campaigns/helpers/campaign.enums'

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
  const selectedCampaignTypeHandler = (event) => {
    console.log('selected campaign: ', event)
  }
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
        <Grid item xs={12} mt={5}>
          <Heading>{t('campaigns:steps.step1-type')}</Heading>

          <FormTextField
            type="text"
            label="campaigns:campaign.title"
            name="title"
            placeholder="Посочете име на вашата кампания. Името трябва да съдържа минимум  5  и максимум 15 думи "
            autoComplete="title"
          />
        </Grid>

        <Grid item xs={12} mt={5}>
          <Heading>{t('campaigns:campaignType')}</Heading>
          <CampaignFilter
            showCampaigns={false}
            onClick={selectedCampaignTypeHandler}
            styles={{ maxWidth: 'lg', margin: 'left' }}
          />
        </Grid>
      </GenericForm>
    </Grid>
  )
}
