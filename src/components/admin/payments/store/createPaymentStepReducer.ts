import { useReducer } from 'react'

export const ACTIONS = {
  CREATE_PAYMENT: 'CREATE_PAYMENT',
  INCREMENT_STEP: 'INCREMENT_STEP',
  DECREMENT_STEP: 'DECREMENT_STEP',
  UPDATE_PAYMENT_SOURCE: 'UPDATE_PAYMENT_SOURCE',
  RESET_MODAL: 'RESET_MODAL',
  SET_BENEVITY_IMPORT_TYPE: 'SET_BENEVITY_IMPORT_TYPE',
}
export type SelectedPaymentSource = 'none' | 'stripe' | 'benevity'
export type BenevityImportType = 'none' | 'file' | 'manual'

export type CreatePayment = {
  paymentSource: SelectedPaymentSource
  step: number
  dialogOpen: boolean
  benevityImportType?: BenevityImportType
}

export type Actions = {
  type: keyof typeof ACTIONS
  payload?: unknown
}

const initialValues: CreatePayment = {
  paymentSource: 'none',
  step: 0,
  dialogOpen: true,
}

function reducer(state: CreatePayment, actions: Actions): CreatePayment {
  switch (actions.type) {
    case 'CREATE_PAYMENT':
      return {
        ...state,
        paymentSource: actions.payload as SelectedPaymentSource,
        step: 0,
        dialogOpen: true,
      }
    case 'UPDATE_PAYMENT_SOURCE':
      return {
        ...state,
        paymentSource: actions.payload as SelectedPaymentSource,
      }
    case 'INCREMENT_STEP':
      return {
        ...state,
        step: state.step + 1,
      }
    case 'RESET_MODAL':
      return initialValues
    case 'SET_BENEVITY_IMPORT_TYPE':
      return {
        ...state,
        benevityImportType: actions.payload as BenevityImportType,
        step: 1,
      }
    case 'DECREMENT_STEP':
      return {
        ...state,
        paymentSource:
          state.paymentSource !== 'none' && state.step === 0 ? 'none' : state.paymentSource,
        step: state.step - 1 > 1 ? state.step-- : 0,
      }
    default:
      return state
  }
}

export const createPaymentStepReducer = (initialState = initialValues) =>
  useReducer(reducer, initialState)
