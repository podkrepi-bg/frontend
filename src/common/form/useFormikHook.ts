import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FormValues, ValidationSchema } from './models'
import getValidationSchema from './schemas'

export default function useFormikHook({
  initialValues,
  onSubmitHandler,
  schema,
}: {
  //To return properly form values, errors etc.'initialValues' type should be the same as the type of particular form
  initialValues: any
  onSubmitHandler: (values: any) => void
  schema: ValidationSchema
}) {
  const { t, i18n } = useTranslation()

  yup.setLocale({
    mixed: {
      default: 'field is invalid',
      required: () => t('auth:validation.required'),
      oneOf: ({ path }: { path: string }) => {
        if (path === 'confirmPassword') {
          return t('auth:validation.password-match')
        }
        return
      },
    },
    string: {
      min: ({ min }: { min: number }) => t('auth:validation.password-min', { count: min }),
      email: () => t('auth:validation.email'),
    },
  })

  const formik = useFormik({
    initialValues,
    validationSchema: getValidationSchema(schema),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmitHandler,
  })

  //Workaround for translate properly error message when the languages have been changed
  useEffect(() => {
    i18n.on('languageChanged', (lng) => {
      Object.keys(formik.errors).forEach((fieldName) => {
        if (Object.keys(formik.touched).includes(fieldName)) {
          formik.validateForm()
        }
      })
    })
    return () => {
      i18n.off('languageChanged', (lng) => {
        return
      })
    }
  }, [formik.errors])

  return { formik }
}
