import * as yup from 'yup'

import { name, phone, email } from 'common/form/validation'

import {
  CampaignApplicationFormDataSteps,
  CampaignApplicationOrganizer,
  Steps,
} from './campaignApplication.types'

const organizer: yup.SchemaOf<CampaignApplicationOrganizer> = yup
  .object()
  .shape({
    name: name.required(),
    phone: phone.required(),
    email: email.required(),
  })
  .defined()

export const validationSchema: {
  [key in Steps]?:
    | yup.SchemaOf<CampaignApplicationFormDataSteps[Steps.NONE]>
    | yup.SchemaOf<CampaignApplicationFormDataSteps[Steps.ORGANIZER]>
} = {
  [Steps.NONE]: undefined,
  [Steps.ORGANIZER]: yup.object().shape({
    organizer: organizer.required(),
  }),
}
