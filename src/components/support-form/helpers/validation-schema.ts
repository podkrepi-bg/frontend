import * as yup from 'yup'
import { SupportFormData } from './support-form.models'

function checkboxChecked(this: any, value: { [key: string]: boolean }) {
  const { path, createError } = this
  if (!Object.values(value).filter((value) => value).length) {
    return createError({ path, message: 'Must have at least one checked box' })
  }
  return true
}

export const validationSchema: yup.SchemaOf<SupportFormData> = yup.object().shape({
  terms: yup.bool().required().oneOf([true], 'common:support-form.termsHelperText'),
  newsletter: yup.bool().required(),
  info: yup
    .object()
    .shape({
      email: yup.string().email().required(),
      name: yup.string().required(),
      phone: yup.string().required(),
      address: yup.string().required(),
    })
    .required(),
  roles: yup
    .object()
    .shape({
      benefactor: yup.bool(),
      partner: yup.bool(),
      volunteer: yup.bool(),
      associationMember: yup.bool(),
      promoter: yup.bool(),
    })
    .required()
    .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked),
  benefactor: yup.object().when('roles.benefactor', {
    is: true,
    then: yup
      .object()
      .shape({
        campaignBenefactor: yup.bool(),
        platformBenefactor: yup.bool(),
      })
      .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked),
  }),
  associationMember: yup.object().when('roles.associationMember', {
    is: true,
    then: yup
      .object()
      .shape({
        isMember: yup.bool(),
      })
      .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked),
  }),
  partner: yup.object().when('roles.partner', {
    is: true,
    then: yup
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
      .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked)
      .test('CustomValidation', 'Custom validation', function (this: any, values: any) {
        const { path, createError } = this
        return values.other && !values.otherText
          ? createError({ path, message: 'field is required' })
          : true
      }),
  }),
  volunteer: yup.object().when('roles.volunteer', {
    is: true,
    then: yup
      .object()
      .shape({
        backend: yup.bool(),
        frontend: yup.bool(),
        qa: yup.bool(),
        marketing: yup.bool(),
      })
      .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked),
  }),
  promoter: yup.object().when('roles.promoter', {
    is: true,
    then: yup
      .object()
      .shape({
        mediaPartner: yup.bool(),
        ambassador: yup.bool(),
        other: yup.bool(),
        otherText: yup.string(),
      })
      .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked)
      .test('CustomValidation', 'Custom validation', function (this: any, values: any) {
        const { path, createError } = this
        return values.other && !values.otherText
          ? createError({ path, message: 'field is required' })
          : true
      }),
  }),
})
