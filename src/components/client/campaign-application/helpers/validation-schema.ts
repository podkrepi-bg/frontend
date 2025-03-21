import * as yup from 'yup'

import { email, name, phone } from 'common/form/validation'

import {
  CampaignApplicationAdmin,
  CampaignApplicationBasic,
  CampaignApplicationDetails,
  CampaignApplicationFormData,
  CampaignApplicationOrganizer,
  CampaignApplicationState,
  Steps,
} from './campaignApplication.types'

const organizerSchema: yup.SchemaOf<CampaignApplicationOrganizer> = yup.object().shape({
  name: name.required(),
  phone: phone.required(),
  email: email.required(),
  acceptTermsAndConditions: yup.bool().oneOf([true], 'validation:terms-of-use').required(),
  transparencyTermsAccepted: yup.bool().oneOf([true], 'validation:required').required(),
  personalInformationProcessingAccepted: yup
    .bool()
    .oneOf([true], 'validation:terms-of-service')
    .required(),
})

const basicSchema: yup.SchemaOf<CampaignApplicationBasic> = yup.object().shape({
  beneficiaryNames: yup.string().required(),
  campaignEnd: yup.string().required(),
  campaignType: yup.string().required(),
  funds: yup.number().required(),
  title: yup.string().required(),
  campaignEndDate: yup.string().optional(),
  organizerBeneficiaryRelationship: yup.string().required(),
})

const detailsSchema: yup.SchemaOf<CampaignApplicationDetails> = yup.object().shape({
  cause: yup.string().required(),
  campaignGuarantee: yup.string().optional(),
  currentStatus: yup.string().optional(),
  description: yup.string().optional(),
  documents: yup.array().min(1, 'documents-hint').required(),
  links: yup.array().optional(),
  otherFinancialSources: yup.string().optional(),
})

const adminPropsSchema: yup.SchemaOf<CampaignApplicationAdmin> = yup.object().shape({
  state: yup
    .mixed<CampaignApplicationState>()
    .oneOf(['review', 'requestInfo', 'forCommitteeReview', 'approved', 'denied', 'abandoned'])
    .required(),
  ticketURL: yup.string().optional(),
  archived: yup.bool().optional(),
})

export const validationSchema: {
  [Steps.NONE]: undefined
  [Steps.ORGANIZER]: yup.SchemaOf<Pick<CampaignApplicationFormData, 'organizer'>>
  [Steps.CAMPAIGN_BASIC]: yup.SchemaOf<Pick<CampaignApplicationFormData, 'applicationBasic'>>
  [Steps.CAMPAIGN_DETAILS]: yup.SchemaOf<Pick<CampaignApplicationFormData, 'applicationDetails'>>
  [Steps.CREATED_DETAILS]: undefined
} = {
  [Steps.NONE]: undefined,
  [Steps.CREATED_DETAILS]: undefined,
  [Steps.ORGANIZER]: yup.object().shape({
    organizer: organizerSchema.defined(),
  }),
  [Steps.CAMPAIGN_BASIC]: yup.object().shape({
    applicationBasic: basicSchema.defined(),
  }),
  [Steps.CAMPAIGN_DETAILS]: yup.object().shape({
    applicationDetails: detailsSchema.defined(),
  }),
}

export const campaignApplicationAdminValidationSchema: yup.SchemaOf<CampaignApplicationFormData> =
  yup.object().shape({
    organizer: organizerSchema.defined(),
    applicationBasic: basicSchema.defined(),
    applicationDetails: detailsSchema.defined(),
    admin: adminPropsSchema.nullable().defined(),
  })
