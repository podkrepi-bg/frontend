import { FormikConfig, useFormik } from 'formik'

export { translateError, customValidators } from 'common/form/validation'

export default function useForm<T>({
  validateOnChange = true,
  validateOnBlur = false,
  ...formikProps
}: FormikConfig<T>) {
  const formik = useFormik({ validateOnChange, validateOnBlur, ...formikProps })

  return { formik }
}
