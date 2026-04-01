import React, { createContext, useState } from 'react'
import {
  IRISSupportedCountries,
  IRISSupportedLangs,
  PaymentData,
  SupportedCurrencies,
} from './IRISPayComponent'

type IPContext = {
  userhash?: string
  hookhash?: string
  backend: 'production' | 'development'
  publicHash: string
  country?: IRISSupportedCountries
  lang?: IRISSupportedLangs
  currency?: SupportedCurrencies
  paymentSession?: SessionData
  updatePaymentSessionData?: (obj: SessionData) => void
  paymentData?: PaymentData | null
  updatePaymentData?: (obj: PaymentData) => void
}
export const IRISPayContext = createContext<IPContext | null>(null)

type IrisElementProps = Omit<
  IPContext,
  'updatePaymentSessionData' | 'paymentSession' | 'paymentData' | 'updatePaymentData'
>
type IRISSDKElements = React.PropsWithChildren<IrisElementProps>

type SessionData = { userhash?: string; hookHash?: string }

export default function IrisElements({
  children,
  userhash,
  backend,
  hookhash,
  publicHash,
  country = 'bulgaria',
  lang = 'bg',
  currency = 'EUR',
}: IRISSDKElements) {
  const [paymentSession, setPaymentSession] = useState<SessionData>({
    hookHash: hookhash,
    userhash: userhash,
  })
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)

  const updatePaymentSessionData = (obj: SessionData) => {
    setPaymentSession(obj)
  }

  const updatePaymentData = (obj: PaymentData) => {
    setPaymentData(obj)
  }

  return (
    <IRISPayContext.Provider
      value={{
        paymentSession,
        updatePaymentSessionData,
        paymentData,
        updatePaymentData,
        backend,
        publicHash,
        country,
        lang,
        currency,
      }}>
      {children}
    </IRISPayContext.Provider>
  )
}
