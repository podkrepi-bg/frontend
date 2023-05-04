import Axios from 'axios'
import { TFunction } from 'react-i18next'

const { isAxiosError } = Axios
export { isAxiosError }

export interface ApiErrors {
  statusCode: number
  message: Message[]
  error: string
}

export interface ApiError {
  statusCode: number
  message: string
  error: string
}

export interface Message {
  property: string
  children: Message[]
  constraints: Constraints
}

export interface Constraints {
  isEmail: string
  isString: string
  isNotEmpty: string
  [key: string]: string
}

export type UniqueConstraints = Partial<Constraints> & {
  companyNumber?: string
  campaignTypeSlug?: string
  slug?: string
  postal_code?: string
  country_code?: string
  ext_payment_intent_id?: string
}

export const matchValidator = (constraints: Constraints): string => {
  if ('isEmail' in constraints) {
    return 'validation:email'
  }

  if ('isNotEmpty' in constraints) {
    return 'validation:required'
  }

  return 'validation:invalid'
}

export const handleUniqueViolation = (
  constraint: UniqueConstraints,
  t: TFunction<'translation', undefined>,
): string => {
  if ('companyNumber' in constraint) {
    return t('validation:unique-field-violation').replace(
      '{1}',
      t('companies:admin.fields.company-number'),
    )
  }

  if ('slug' in constraint) {
    return t('validation:unique-field-violation').replace('{1}', t('campaigns:campaign.slug.name'))
  }

  if ('campaignTypeSlug' in constraint) {
    return t('validation:unique-field-violation').replace('{1}', t('campaign-types:grid:name'))
  }

  if ('postal_code' in constraint) {
    return t('validation:unique-field-violation').replace('{1}', t('cities:postalCode'))
  }

  if ('country_code' in constraint) {
    return t('validation:unique-field-violation').replace('{1}', t('countries:fields.country-code'))
  }

  if ('ext_payment_intent_id' in constraint) {
    return t('validation:unique-field-violation').replace(
      '{1}',
      t('donations:ext-payment-intent-id'),
    )
  }

  return t('common:alerts.error')
}
