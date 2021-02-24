import { FormikValues } from 'formik'
import React, { PropsWithChildren, useContext } from 'react'

import { FormikType } from 'common/form/useForm'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = React.createContext<FormikType<any>>(null as any)

export type FormContextProps<T> = PropsWithChildren<FormikType<T>>

export function FormContextProvider<T>({ formik, children }: FormContextProps<T>) {
  return <FormContext.Provider value={{ formik }}>{children}</FormContext.Provider>
}

export function useFormContext<T extends FormikValues>() {
  return useContext<FormikType<T>>(FormContext)
}
