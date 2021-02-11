import * as yup from 'yup'
import { ValidationSchema } from './models'

export default function getValidationSchema(schema: ValidationSchema) {
  const LoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })

  const RegisterSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })

  const ForgottenPasswordSchema = yup.object().shape({
    email: yup.string().email().required(),
  })

  const ChangePasswordSchema = yup.object().shape({
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null]),
  })

  const mapSchema: any = {
    login: () => LoginSchema,
    register: () => RegisterSchema,
    'forgotten-password': () => ForgottenPasswordSchema,
    'change-password': () => ChangePasswordSchema,
  }

  return mapSchema[schema]()
}
