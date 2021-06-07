import { setLocale, string } from 'yup'
import { TOptions } from 'i18next'
import { TFunction } from 'next-i18next'

export type TranslatableField = (string | undefined) | { key: string; values?: TOptions }

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
  phone: () => ({ key: 'validation:phone' }),
  name: () => ({ key: 'validation:invalid' }),
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
export const noNumbersRegex = /^[^\d!@#$%^&*()\\/'"_]*$/gi
export const email = string().trim().email()
export const phone = string().trim().matches(phoneRegex, customValidators.phone).min(9).max(15)
export const name = string().trim().matches(noNumbersRegex, customValidators.name).min(2).max(50)
export const companyName = string().trim().min(2).max(50)
