import React from 'react'
const { Provider, Consumer } = React.createContext({})

export type FormContext = {
  value: any
  children: any
}

const FormContext = (props: FormContext) => {
  return <Provider value={{ formik: props.value }}>{props.children}</Provider>
}

export { FormContext as FormContextProvider, Consumer as FormContextConsumer }
