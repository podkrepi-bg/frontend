import { setLocale } from 'yup'
import { TOptions } from 'i18next'
import { TFunction } from 'react-i18next'

export const translateError = (
  field: (string | undefined) | { key: string; values?: TOptions },
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
// yup.string().min(6 customValidators.passwordMin)

// Inline translations in validation schema:
// yup.string().min(6, ({ min }) => ({ key: 'validation:password-min', values: { min } }))

export const customValidators = {
  passwordMin: ({ min }: { min: number }) => ({
    key: 'validation:password-min',
    values: { min },
  }),
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
