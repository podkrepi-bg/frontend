/**
 * TODO:
 * - fix the typescript errors on the functions
 * - fix the beneficiary data in the context
 * - fix the validations
 * - store the data in localStorage in case the user refreshes the page
 */

import { useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Grid, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { Heading, SectionHeading } from '../campaigns.styled'
import { CampaignState } from '../../../client/campaigns/helpers/campaign.enums'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// Validations
import * as yup from 'yup'
import { parse, isDate } from 'date-fns'

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
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import CampaignFilter from '../CampaignFilter'

import { CampaignContext } from 'context/create-campaign'

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

  const ctx = useContext(CampaignContext)
  const campaignInfo = ctx.campaignData.info

  const onSubmit = () => {
    console.log('Form submitted')
  }

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
              onChange={ctx.setCampaignInfo('name')}
              value={campaignInfo.name}
            />
          </Grid>
          {/* Campaign Type */}
          <Grid item xs={12} mt={5}>
            <Heading>{t('campaigns:campaignType')}</Heading>
            <CampaignFilter
              selected={selectedCampaignType}
              showCampaigns={false}
              onClick={selectedCampaignTypeHandler}
              onChange={ctx.setCampaignInfo('category')}
              styles={{ maxWidth: 'md', margin: 'left' }}
            />
          </Grid>
          {/* Campaign Beneficiary */}
          <Grid item xs={12} mt={5}>
            <Heading>Бенфициент на кампанията</Heading>

            <RadioGroup
              aria-labelledby="beneficiary-field"
              defaultValue="personal"
              name="radio-buttons-group"
              value={campaignInfo.beneficiary.type}
              onChange={ctx.setCampaignInfo('beneficiary')}>
              <FormControlLabel value="individual" control={<Radio />} label="Кампанията е лична" />
              <FormControlLabel
                value="company"
                control={<Radio />}
                label="Кампанията  се организира  за друг бенефициент - физическо лице"
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} mt={3}>
            <FormTextField
              type="text"
              label="Три имена на бенефициент"
              name="beneficiary"
              autoComplete="beneficiary"
              value={campaignInfo.beneficiary.name}
              onChange={ctx.setCampaignInfo('beneficiary')}
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
              label=""
              autoComplete="target-amount"
              placeholder="88 000.00"
              value={campaignInfo.targetAmount}
              onChange={ctx.setCampaignInfo('targetAmount')}
            />
          </Grid>

          {/* End of the campaign */}
          <Grid item xs={12} mt={5}>
            <FormControl>
              <Heading>Желана крайна дата на кампанията:</Heading>

              <RadioGroup
                aria-labelledby="end-campaign-field"
                defaultValue="end-date"
                name="radio-buttons-group"
                value={campaignInfo.endDate}
                onChange={ctx.setCampaignInfo('endDate')}>
                <FormControlLabel
                  value="one-time"
                  control={<Radio />}
                  label="До събиране на необходимите средства"
                />
                <FormControlLabel
                  value="each-month"
                  control={<Radio />}
                  label="Ежемесечна кампания"
                />
                <FormControlLabel value="specific-date" control={<Radio />} label="До дата" />
              </RadioGroup>
            </FormControl>

            {/* TODO: Show this field if 'specific-date' is selected */}
            <FormTextField
              type="date"
              name="endDate"
              label="campaigns:campaign.end-date"
              helperText={null}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid container spacing={3} justifyContent="flex-start" alignItems="center">
            <Grid item>
              <Button onClick={ctx.prevPage} variant="outlined">
                {t('campaigns:back')}
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={ctx.nextPage}
                disabled={false}
                variant="contained"
                color="success"
                endIcon={<ChevronRightIcon />}>
                {t('campaigns:next')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
