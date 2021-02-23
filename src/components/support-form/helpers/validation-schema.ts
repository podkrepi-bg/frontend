import * as yup from 'yup'
import {
  Benefactor,
  Info,
  Member,
  Partner,
  Promoter,
  Roles,
  SupportFormData,
  Volunteer,
} from './support-form.models'

const checkboxError = 'Must have at least one checked box'

function checkboxChecked(this: yup.TestContext, value: { [key: string]: boolean }) {
  const { path, createError } = this
  if (!Object.values(value).filter((value) => value).length) {
    return createError({ path, message: checkboxError })
  }
  return true
}

const info: yup.SchemaOf<Info> = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
  })
  .defined()

const roles: yup.SchemaOf<Roles> = yup
  .object()
  .shape({
    benefactor: yup.bool(),
    partner: yup.bool(),
    volunteer: yup.bool(),
    associationMember: yup.bool(),
    promoter: yup.bool(),
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
    areas: yup.array().of(yup.string()),
  })
  .defined()

const promoter: yup.SchemaOf<Promoter> = yup
  .object()
  .shape({
    mediaPartner: yup.bool(),
    ambassador: yup.bool(),
    other: yup.bool(),
    otherText: yup.string(),
  })
  .defined()

export const validationSchema: yup.SchemaOf<SupportFormData> = yup.object().shape({
  terms: yup.bool().required().oneOf([true], 'common:support-form.termsHelperText'),
  newsletter: yup.bool().required(),
  info: info.required(),
  roles: roles.required().test('checkboxChecked', checkboxError, checkboxChecked),
  benefactor: yup.object().when('roles.benefactor', {
    is: true,
    then: benefactor.required().test('checkboxChecked', checkboxError, checkboxChecked),
    // otherwise: benefactor,
  }),
  associationMember: yup.object().when('roles.associationMember', {
    is: true,
    then: associationMember.required().test('checkboxChecked', checkboxError, checkboxChecked),
    // otherwise: associationMember,
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
    // otherwise: partner,
  }),
  volunteer: yup.object().when('roles.volunteer', { is: true, then: volunteer }),
  promoter: yup.object().when('roles.promoter', {
    is: true,
    then: promoter
      .required()
      .test('checkboxChecked', checkboxError, checkboxChecked)
      .test(
        'CustomValidation',
        'Custom validation',
        function (this: yup.TestContext, values: Promoter) {
          const { path, createError } = this
          return values.other && !values.otherText
            ? createError({ path, message: 'field is required' })
            : true
        },
      ),
    // otherwise: promoter,
  }),
})
