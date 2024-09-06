import * as yup from 'yup'

import { email, name, phone } from 'common/form/validation'

import { CampaignApplicationFormData, Steps } from './campaignApplication.types'

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
    organizer: yup
      .object()
      .shape({
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
      .defined(),
  }),
  [Steps.CAMPAIGN_BASIC]: yup.object().shape({
    applicationBasic: yup
      .object()
      .shape({
        beneficiaryNames: yup.string().required(),
        campaignEnd: yup.string().required(),
        campaignType: yup.string().required(),
        funds: yup.number().required(),
        title: yup.string().required(),
      })
      .defined(),
  }),
  [Steps.CAMPAIGN_DETAILS]: yup.object().shape({
    applicationDetails: yup
      .object()
      .shape({
        cause: yup.string().required(),
        campaignGuarantee: yup.string().optional(),
        currentStatus: yup.string().optional(),
        description: yup.string().optional(),
        documents: yup.array().optional(),
        links: yup.array().optional(),
        organizerBeneficiaryRelationship: yup.string().optional(),
        otherFinancialSources: yup.string().optional(),
      })
      .defined(),
  }),
}
