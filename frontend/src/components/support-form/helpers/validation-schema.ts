import * as yup from 'yup'

import { name, phone } from 'common/form/validation'

import {
  Benefactor,
  Person,
  Member,
  Partner,
  Company,
  Roles,
  Volunteer,
  Steps,
  SupportFormDataSteps,
} from './support-form.types'

const checkboxError = 'Must have at least one checked box'

function checkboxChecked(this: yup.TestContext, value: { [key: string]: boolean }) {
  const { path, createError } = this
  if (!Object.values(value).filter((value) => value).length) {
    return createError({ path, message: checkboxError })
  }
  return true
}

const person: yup.SchemaOf<Person> = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    name: name.required(),
    phone: phone.required(),
    address: yup.string(),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
  })
  .defined()

const roles: yup.SchemaOf<Roles> = yup
  .object()
  .shape({
    benefactor: yup.bool(),
    partner: yup.bool(),
    volunteer: yup.bool(),
    associationMember: yup.bool(),
    company: yup.bool(),
  })
  .defined()

const benefactor: yup.SchemaOf<Benefactor> = yup
  .object()
  .shape({
    campaignBenefactor: yup.bool(),
    platformBenefactor: yup.bool(),
  })
  .defined()

const associationMember: yup.SchemaOf<Member> = yup
  .object()
  .shape({ isMember: yup.bool() })
  .defined()

const partner: yup.SchemaOf<Partner> = yup
  .object()
  .shape({
    npo: yup.bool(),
    bussiness: yup.bool(),
    other: yup.bool(),
    otherText: yup.string().when('partner.other', {
      is: true,
      then: yup.string(),
    }),
  })
  .defined()

const volunteer: yup.SchemaOf<Volunteer> = yup
  .object()
  .shape({
    backend: yup.bool(),
    frontend: yup.bool(),
    qa: yup.bool(),
    marketing: yup.bool(),
    designer: yup.bool(),
    projectManager: yup.bool(),
    devOps: yup.bool(),
    security: yup.bool(),
    financesAndAccounts: yup.bool(),
    lawyer: yup.bool(),
  })
  .defined()

const company: yup.SchemaOf<Company> = yup
  .object()
  .shape({
    sponsor: yup.bool(),
    volunteer: yup.bool(),
    other: yup.bool(),
    otherText: yup.string(),
  })
  .defined()

export const validationSchema: {
  [key in Steps]?:
    | yup.SchemaOf<SupportFormDataSteps[Steps.NONE]>
    | yup.SchemaOf<SupportFormDataSteps[Steps.ROLES]>
    | yup.SchemaOf<SupportFormDataSteps[Steps.QUESTIONS]>
    | yup.SchemaOf<SupportFormDataSteps[Steps.PERSON]>
    | yup.SchemaOf<SupportFormDataSteps[Steps.NEWSLETTER]>
} = {
  [Steps.NONE]: undefined,
  [Steps.ROLES]: yup.object().shape({
    roles: roles.required().test('checkboxChecked', checkboxError, checkboxChecked),
  }),
  [Steps.QUESTIONS]: yup.object().shape({
    benefactor: yup.object().when('roles.benefactor', {
      is: true,
      then: benefactor.required().test('checkboxChecked', checkboxError, checkboxChecked),
      otherwise: benefactor,
    }),
    associationMember: yup.object().when('roles.associationMember', {
      is: true,
      then: associationMember.required().test('checkboxChecked', checkboxError, checkboxChecked),
      otherwise: associationMember,
    }),
    partner: yup.object().when('roles.partner', {
      is: true,
      then: partner
        .required()
        .test('checkboxChecked', checkboxError, checkboxChecked)
        .test('CustomValidation', 'Custom validation', <yup.TestFunction>(
          function (this: yup.TestContext, values: Partner) {
            const { path, createError } = this
            return values.other && !values.otherText
              ? createError({ path, message: 'field is required' })
              : true
          }
        )),
      otherwise: partner,
    }),
    volunteer: yup.object().when('roles.volunteer', {
      is: true,
      then: volunteer.required().test('checkboxChecked', checkboxError, checkboxChecked),
      otherwise: volunteer,
    }),
    company: yup.object().when('roles.company', {
      is: true,
      then: company
        .required()
        .test('checkboxChecked', checkboxError, checkboxChecked)
        .test(
          'CustomValidation',
          'Custom validation',
          function (this: yup.TestContext, values: Company) {
            const { path, createError } = this
            return values.other && !values.otherText
              ? createError({ path, message: 'field is required' })
              : true
          },
        ),
      otherwise: company,
    }),
  }),
  [Steps.PERSON]: yup.object().shape({
    person: person.required(),
  }),
  [Steps.NEWSLETTER]: yup.object().shape({
    newsletter: yup.bool().required(),
  }),
}
