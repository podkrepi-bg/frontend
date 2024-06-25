import React, { createContext } from 'react'
import { Actions, CreatePayment, createPaymentStepReducer } from './createPaymentStepReducer'
import CreatePaymentStepper from '../create-payment/CreatePaymentStepper'
import { observer } from 'mobx-react'

export type PaymentContext = {
  payment: CreatePayment
  dispatch: React.Dispatch<Actions>
}
export const PaymentContext = createContext<PaymentContext>({} as PaymentContext)

function CreatePaymentDialog() {
  const [payment, dispatch] = createPaymentStepReducer()
  return (
    <PaymentContext.Provider value={{ payment, dispatch }}>
      <CreatePaymentStepper />
    </PaymentContext.Provider>
  )
}

export default observer(CreatePaymentDialog)
