import * as yup from 'yup'

import { name, phone, email } from 'common/form/validation'

import {
  Steps,
  PersonFormData,
  InfoFormData,
  DonorTypes,
  ReportFormDataSteps,
} from './report.types'

const person: yup.SchemaOf<PersonFormData> = yup
  .object()
  .shape({
    firstName: name.required(),
    lastName: name.required(),
    email: email.required(),
    phone: phone.notRequired(),
  })
  .defined()

const info: yup.SchemaOf<InfoFormData> = yup
  .object()
  .shape({
    donorType: yup.mixed().oneOf(Object.values(DonorTypes)),
    description: yup.string().required(),
  })
  .defined()

export const validationSchema: {
  [key in Steps]?:
    | yup.SchemaOf<ReportFormDataSteps[Steps.NONE]>
    | yup.SchemaOf<ReportFormDataSteps[Steps.GREETING]>
    | yup.SchemaOf<ReportFormDataSteps[Steps.CONTACTS]>
    | yup.SchemaOf<ReportFormDataSteps[Steps.INFO]>
} = {
  [Steps.NONE]: undefined,
  [Steps.GREETING]: undefined,
  [Steps.CONTACTS]: undefined,
  [Steps.INFO]: undefined,
  // [Steps.CONTACTS]: yup.object().shape({
  //   person: person.required(),
  // }),
  // [Steps.INFO]: yup.object().shape({
  //   info: info.required(),
  // }),
}
