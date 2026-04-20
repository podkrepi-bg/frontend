import React, { useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import IrisPayComponent, {
  IRISAddIbanElementProps,
  IRISAddIbanWithBankElementProps,
  IRISBackend,
  IRISBudgetPaymentElementProps,
  IRISPayCommonProps,
  IRISPaymentDataElementProps,
  IRISPaymentDataWithAccountIdProps,
  IRISPaymentElementProps,
  IRISPayWithCodeElementProps,
  IRISPayWithIbanSelectionProps,
} from './IRISPayComponent'
import { StringifyIrisProps } from './objectToString'
import { IRISPayContext } from './IRISPayContext'

const IRIS_SDK_SCRIPT_URL = 'https://websdk.irispay.bg/assets/irispay-ui/elements.js'
const IRIS_SDK_STYLE_URL = 'https://websdk.irispay.bg/assets/irispay-ui/styles.css'

// Event shapes emitted by the IRIS SDK's `on_payment_event` CustomEvent.
// Derived from the SDK's `emitCustomEvent(type, payload)` call sites in
// elements.js — each variant mirrors what the SDK actually sends.
export type OnPaymentEventLoaded = {
  type: 'loaded'
  payload: { description: string }
}
export type OnPaymentEventCreatingPayment = {
  type: 'creating-payment'
  payload: { description: string }
}
export type OnPaymentEventCloseClicked = {
  type: 'closeClicked'
  payload: { description: string }
}
export type OnPaymentEventLanguageChanged = {
  type: 'languageChanged'
  payload: { description: string; data: { lang: string } }
}
// `message` is the backend's error message — string when present, the raw
// error object otherwise.
export type OnPaymentEventError = {
  type: 'error'
  payload: { message: string | Record<string, unknown>; description: string }
}
// `success` is `true` for bank-approved payments, `false` when the user or
// bank rejected the payment.
export type OnPaymentEventLastStep = {
  type: 'lastStep'
  payload: { success: boolean; description: string; data: unknown }
}

export type OnPaymentEvent =
  | OnPaymentEventLoaded
  | OnPaymentEventCreatingPayment
  | OnPaymentEventCloseClicked
  | OnPaymentEventLanguageChanged
  | OnPaymentEventError
  | OnPaymentEventLastStep

type IRISListenerProps = {
  isMounted?: boolean
  onLoad?: (data: CustomEvent<OnPaymentEventLoaded>) => void
  // Fires on the SDK's `lastStep` — read `data.detail.payload.success` to
  // distinguish bank-approved from rejected.
  onSuccess?: (data: CustomEvent<OnPaymentEventLastStep>) => void
  onError?: (data: CustomEvent<OnPaymentEventError>) => void
}

type ElementWithListener<T> = T & IRISListenerProps
export type IRISPaySDKProps = ElementWithListener<IRISPayCommonProps>

export default function IRISPaySDK(props: IRISPaySDKProps) {
  const context = React.useContext(IRISPayContext)
  if (!context) {
    throw new Error('IRISPay must be a child of IrisSdkElement')
  }

  const hostRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<ShadowRoot | null>(null)
  const irisComponentRef = useRef<HTMLIFrameElement | null>(null)
  const [portalTarget, setPortalTarget] = useState<HTMLDivElement | null>(null)

  const { onLoad, onSuccess, onError, ...restProps } = props
  const stringifiedProps = StringifyIrisProps(restProps)

  const environment: IRISBackend =
    context.backend === 'production'
      ? 'https://developer.irispay.bg/'
      : 'https://developer.sandbox.irispay.bg/'

  // Set up shadow DOM and load SDK assets
  useEffect(() => {
    if (!hostRef.current || shadowRef.current) return

    const shadow = hostRef.current.attachShadow({ mode: 'open' })
    shadowRef.current = shadow

    // Load stylesheet scoped inside shadow DOM
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = IRIS_SDK_STYLE_URL
    shadow.appendChild(link)

    // Load script globally (registers the custom element)
    if (!document.getElementById('iris-sdk')) {
      const script = document.createElement('script')
      script.src = IRIS_SDK_SCRIPT_URL
      script.id = 'iris-sdk'
      document.body.appendChild(script)
    }

    // Create a container inside shadow for React portal
    const container = document.createElement('div')
    shadow.appendChild(container)
    setPortalTarget(container)
  }, [])

  // Attach event listeners once portal is ready
  useEffect(() => {
    const el = irisComponentRef.current
    if (!el) return

    const eventListener = ((data: CustomEvent<OnPaymentEvent>) => {
      switch (data.detail.type) {
        case 'loaded':
          onLoad?.(data as CustomEvent<OnPaymentEventLoaded>)
          break
        case 'lastStep':
          onSuccess?.(data as CustomEvent<OnPaymentEventLastStep>)
          break
        case 'error':
          onError?.(data as CustomEvent<OnPaymentEventError>)
          break
      }
    }) as EventListener

    el.addEventListener('on_payment_event', eventListener)

    return () => {
      el.removeEventListener('on_payment_event', eventListener)
    }
  }, [portalTarget])

  if (!context.paymentSession?.hookHash || !context.paymentSession?.userhash) {
    return null
  }

  return (
    <>
      <div ref={hostRef} />
      {portalTarget &&
        createPortal(
          <IrisPayComponent
            ref={irisComponentRef}
            {...stringifiedProps}
            backend={environment}
            hookhash={context.paymentSession.hookHash}
            userhash={context.paymentSession.userhash}
          />,
          portalTarget,
        )}
    </>
  )
}

export function PaymentDataElement(props: ElementWithListener<IRISPaymentDataElementProps>) {
  const context = useContext(IRISPayContext)

  console.log('PaymentDataElement render:', {
    context: !!context,
    paymentData: context?.paymentData,
    propsPaymentData: props.payment_data,
    publicHash: context?.publicHash,
    currency: context?.currency,
  })

  const paymentData = context?.paymentData || props.payment_data

  if (!paymentData) {
    console.log('No payment data available')
    return null
  }

  if (!context?.publicHash) {
    console.error('publicHash must be set for payment-data or budged-payment types')
    throw new Error('publicHash must be set for payment-data or budged-payment types')
  }

  if (!context?.currency || !['EUR', 'RON'].includes(context.currency)) {
    console.error('Currency missing or invalid:', context?.currency)
    throw new Error(
      'Currency missing from context or has invalid values.\n Supported currencies are: EUR, RON',
    )
  }

  paymentData['publicHash'] = context.publicHash
  paymentData['currency'] = context.currency

  console.log('Final payment data:', paymentData)

  return <IRISPaySDK {...props} payment_data={paymentData} type="payment-data" />
}

export function PaymentElement(props: ElementWithListener<IRISPaymentElementProps>) {
  return <IRISPaySDK {...props} type="payment" />
}

export function PayWithIbanSelectionElement(
  props: ElementWithListener<IRISPayWithIbanSelectionProps>,
) {
  return <IRISPaySDK {...props} type="pay-with-iban-selection" />
}

export function BudgetPaymentElement(props: ElementWithListener<IRISBudgetPaymentElementProps>) {
  const context = useContext(IRISPayContext)
  if (!context?.publicHash)
    throw new Error('publicHash must be set for payment-data or budget-payment types')
  if (!context?.currency || !['BGN', 'EUR', 'RON'].includes(context.currency)) {
    throw new Error(
      'Currency missing from context or has invalid values.\n Supported currencies are: BGN, EUR, RON',
    )
  }
  props.payment_data['publicHash'] = context.publicHash
  props.payment_data['currency'] = context.currency
  return <IRISPaySDK {...props} type="budget-payment" />
}

export function PaymentDataWithAccountIdElement(
  props: ElementWithListener<IRISPaymentDataWithAccountIdProps>,
) {
  return <IRISPaySDK {...props} type="payment-data-with-accountid" />
}

export function PaymentWithCodeElement(props: ElementWithListener<IRISPayWithCodeElementProps>) {
  return <IRISPaySDK {...props} type="pay-with-code" />
}

export function AddIbanElement(props: ElementWithListener<IRISAddIbanElementProps>) {
  return <IRISPaySDK {...props} type="add-iban" />
}

export function AddIbanWithBankElement(
  props: ElementWithListener<IRISAddIbanWithBankElementProps>,
) {
  return <IRISPaySDK {...props} type="add-iban-with-bank" />
}
