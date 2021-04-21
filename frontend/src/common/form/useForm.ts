import { useFormik, FormikConfig, FormikProps } from 'formik'

export { translateError, customValidators } from 'common/form/validation'

export type FormikType<T> = { formik: FormikProps<T> }

export default function useForm<Values>({
  validateOnChange = true,
  validateOnBlur = false,
  ...formikProps
}: FormikConfig<Values>): FormikType<Values> {
  const formik = useFormik<Values>({
    validateOnChange,
    validateOnBlur,
    ...formikProps,
  })

  return { formik }
}
