import React, { PropsWithChildren } from 'react'
import { FormikValues } from 'formik'
const { Provider, Consumer } = React.createContext({})

type FormProps = {
  value: FormikValues
}

export type FormContextProps = PropsWithChildren<FormProps>

const FormContext = (props: FormContextProps) => {
  return <Provider value={{ formik: props.value }}>{props.children}</Provider>
}

export { FormContext as FormContextProvider, Consumer as FormContextConsumer }
