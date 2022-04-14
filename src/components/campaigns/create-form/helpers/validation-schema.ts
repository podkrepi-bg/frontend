import * as yup from 'yup'

import { name, phone, email } from 'common/form/validation'

import {
  CampaignFormDataSteps,
  CoordinatorCompanyFormData,
  CoordinatorPersonFormData,
  CoordinatorTypes,
  CampaignDateTypes,
  Steps,
  CampaignDetailsFormData,
  CoordinatorBeneficiaryRealation,
} from './campaign-form.types'

const coordinatorPerson: yup.SchemaOf<CoordinatorPersonFormData> = yup
  .object()
  .shape({
    firstName: name.required(),
    midName: name.required(),
    lastName: name.required(),
    personalNumber: yup.string().trim().required(),
    email: email.required(),
    phone: phone.required(),
  })
  .defined()

const coordinatorCompany: yup.SchemaOf<CoordinatorCompanyFormData> = yup
  .object()
  .shape({
    companyName: name.required(),
    companyNumber: yup.string().trim().required(),
    address: yup.string().trim().required(),
    email: email.required(),
    phone: phone.required(),
    legalPersonFirstName: name.required(),
    legalPersonMidName: name.required(),
    legalPersonLastName: name.required(),
  })
  .defined()

const campaignInfo = yup.object().shape({
  // campaignTypeId should be required => to be fixed
  campaignTypeId: yup.string(),
  campaignTypeName: yup.mixed().when('campaignTypeId', {
    is: 'else',
    then: yup.string().required(),
    otherwise: yup.mixed().notRequired(),
  }),
  targetAmount: yup.number().positive('Positive number required'),
  campaignDate: yup.mixed().oneOf(Object.values(CampaignDateTypes)),
  endDate: yup.mixed().when('campaignDate', {
    is: CampaignDateTypes.SelectDate,
    then: yup.date().min(new Date(), 'Date is invalid.').required(),
    otherwise: yup.mixed().notRequired(),
  }),
})

const campaignDetails: yup.SchemaOf<CampaignDetailsFormData> = yup
  .object()
  .shape({
    description: yup.string().required(),
    soFar: yup.string(),
    aim: yup.string(),
    homepageLink: yup.string(),
    mediaLink: yup.string(),
    facebook: yup.string(),
    otherLinks: yup.string(),
  })
  .defined()

export const validationSchema: {
  [key in Steps]?:
    | yup.SchemaOf<CampaignFormDataSteps[Steps.NONE]>
    | yup.SchemaOf<CampaignFormDataSteps[Steps.COORDINATORTYPE]>
    | yup.SchemaOf<CampaignFormDataSteps[Steps.COORDINATOR]>
    | yup.SchemaOf<CampaignFormDataSteps[Steps.INFO]>
    | yup.SchemaOf<CampaignFormDataSteps[Steps.DETAILS]>
} = {
  [Steps.NONE]: undefined,
  [Steps.COORDINATORTYPE]: yup.object().shape({
    coordinator: yup.string().oneOf(Object.values(CoordinatorTypes)),
  }),
  [Steps.COORDINATOR]: yup.object().shape({
    coordinator: yup.string().oneOf(Object.values(CoordinatorTypes)),
    coordinatorBeneficiaryRelation: yup
      .mixed()
      .oneOf(Object.values(CoordinatorBeneficiaryRealation)),
    coordinatorPerson: yup.object().when('coordinator', {
      is: 'person',
      then: coordinatorPerson.required(),
    }),
    coordinatorCompany: yup.object().when('coordinator', {
      is: 'company',
      then: coordinatorCompany.required(),
    }),
  }),
  [Steps.INFO]: yup.object().shape({
    coordinator: yup.string().oneOf(Object.values(CoordinatorTypes)),
    coordinatorBeneficiaryRelation: yup
      .mixed()
      .oneOf(Object.values(CoordinatorBeneficiaryRealation)),
    beneficiaryName: yup.string().when('coordinatorBeneficiaryRelation', {
      is: CoordinatorBeneficiaryRealation.NotRelated,
      then: yup.string().required(),
    }),
    campaignInfo: campaignInfo.required(),
  }),
  [Steps.DETAILS]: yup.object().shape({
    campaignDetails: campaignDetails.required(),
  }),
}
