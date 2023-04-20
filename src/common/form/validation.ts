import { setLocale, string } from 'yup'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'
export type TranslatableField =
  | (string | undefined)
  | { key: string; values?: Record<string, string> }

export const translateError = (
  field: TranslatableField,
  translate: TFunction,
): string | undefined => {
  if (!field) {
    return undefined
  }
  if (typeof field === 'string') {
    return translate(field)
  }
  return translate(field.key, field.values)
}

// Default translations:
// return 'validation:<key>'

// Default translations with interpolation:
// return { key: 'validation:<key>', values: { min, max } }

// Custom translations in validation schema:
// yup.string().min(6, customValidators.passwordMin)

// Inline translations in validation schema:
// yup.string().min(6, ({ min }) => ({ key: 'validation:password-min', values: { min } }))

export const customValidators = {
  passwordMin: ({ min }: { min: number }) => ({
    key: 'validation:password-min',
    values: { min },
  }),
  passwordMax: ({ max }: { max: number }) => ({
    key: 'validation:password-max',
    values: { max },
  }),
  password: () => ({ key: 'validation:password' }),
  confirmPassword: () => ({ key: 'validation:password-match' }),
  phone: () => ({ key: 'validation:phone' }),
  name: () => ({ key: 'validation:invalid' }),
  paymentRef: () => ({ key: 'validation:payment-reference' }),
}

setLocale({
  mixed: {
    default: 'validation:invalid',
    required: 'validation:required',
  },
  string: {
    min: ({ min }: { min: number }) => ({
      key: 'validation:field-too-short',
      values: { min },
    }),
    max: ({ max }: { max: number }) => ({
      key: 'validation:field-too-long',
      values: { max },
    }),
    email: 'validation:email',
  },
})

export const phoneRegex = /^\+?(\d+\s)*\d+$/ // optional +, digits with single spaces
export const noNumbersRegex = /^[^\d!@#$%^&*()\\/'"_.:=+~<>?{}[\];|]*$/gi
export const email = string().trim().email()
export const phone = string().trim().matches(phoneRegex, customValidators.phone).min(9).max(15)
export const name = string().trim().matches(noNumbersRegex, customValidators.name).min(2).max(50)
export const companyName = string().trim().min(2).max(50)

// according to password policy in Keycloak- 1 uppercase, 1 digit, 1 special character, min 8 characters
export const loginPassword = string().trim()
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_.?'"+=-])[A-Za-z\d!@#$%^&*_.?'"+=-]{8,30}$/
export const password = string()
  .trim()
  .min(8, customValidators.passwordMin)
  .max(30, customValidators.passwordMax)
  .matches(passwordRegex, customValidators.password)

export const confirmPassword = string().oneOf(
  [yup.ref('password')],
  customValidators.confirmPassword,
)

export const paymentRefRegex = /\b[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}\b/g
export const paymentRef = string()
  .trim()
  .matches(paymentRefRegex, customValidators.paymentRef)
  .min(14)
  .max(14)
