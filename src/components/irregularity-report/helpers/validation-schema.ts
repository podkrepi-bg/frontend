import * as yup from 'yup'

import { name, phone, email } from 'common/form/validation'

import {
  Steps,
  PersonFormData,
  InfoFormData,
  NotifierTypes,
  ReportReason,
  ReportFormDataSteps,
  ReportStatus,
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
    notifierType: yup.mixed().oneOf(Object.values(NotifierTypes)),
    reason: yup.mixed().oneOf(Object.values(ReportReason)),
    reportContent: yup.string().trim().min(5).max(500).required(),
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
  [Steps.CONTACTS]: yup.object().shape({
    person: person.required(),
    status: yup.mixed().oneOf(Object.values(ReportStatus)),
  }),
  [Steps.INFO]: yup.object().shape({
    info: info.required(),
  }),
}
