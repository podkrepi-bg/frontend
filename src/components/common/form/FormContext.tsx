import React, { PropsWithChildren } from 'react'
import { FormikProps } from 'formik'
const { Provider, Consumer } = React.createContext({})

type FormProps = {
  value: FormikProps<any>
}

export type FormContextProps = PropsWithChildren<FormProps>

const FormContext = (props: FormContextProps) => {
  return <Provider value={{ formik: props.value }}>{props.children}</Provider>
}

export { FormContext as FormContextProvider, Consumer as FormContextConsumer }
