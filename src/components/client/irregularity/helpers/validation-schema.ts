import * as yup from 'yup'

import { name, phone, email } from 'common/form/validation'

import {
  Steps,
  PersonFormData,
  InfoFormData,
  NotifierTypes,
  IrregularityReason,
  IrregularityFormDataSteps,
  IrregularityStatus,
} from './irregularity.types'

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
    reason: yup.mixed().oneOf(Object.values(IrregularityReason)),
    description: yup.string().trim().min(5).max(500).required(),
  })
  .defined()

export const validationSchema: {
  [key in Steps]?:
    | yup.SchemaOf<IrregularityFormDataSteps[Steps.NONE]>
    | yup.SchemaOf<IrregularityFormDataSteps[Steps.GREETING]>
    | yup.SchemaOf<IrregularityFormDataSteps[Steps.CONTACTS]>
    | yup.SchemaOf<IrregularityFormDataSteps[Steps.INFO]>
} = {
  [Steps.NONE]: undefined,
  [Steps.GREETING]: undefined,
  [Steps.CONTACTS]: yup.object().shape({
    person: person.required(),
    status: yup.mixed().oneOf(Object.values(IrregularityStatus)),
  }),
  [Steps.INFO]: yup.object().shape({
    info: info.required(),
  }),
}
