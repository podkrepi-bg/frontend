import React from 'react'
import { AlertProps, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { AnchoredAlert } from './AnchoredAlert'
import {
  DonationFormAuthState,
  DonationFormPaymentMethod,
  DonationFormData,
} from '../helpers/types'
import { useElements } from '@stripe/react-stripe-js'
import { AuthenticateAlertContent } from './AlertsContent'

//TODO: Should be replaced by translated content
const cardAlertDescription = `Таксата на Stripe се изчислява според района на картодържателя: 1.2% + 0.5лв. за Европейската икономическа зона`
const bankAlertDescription = `Таксата за транзакция при банков превод зависи от индивидуалните условия на Вашата банка. от (0-4лв)`

const paymentMethodAlertMap = {
  [DonationFormPaymentMethod.CARD]: cardAlertDescription,
  [DonationFormPaymentMethod.BANK]: bankAlertDescription,
}

function AlertsColumn({
  sectionsRefArray,
}: {
  sectionsRefArray: React.MutableRefObject<HTMLDivElement | null>[]
}) {
  const {
    values: { payment, authentication },
  } = useFormikContext<DonationFormData>()

  const [updatedRefArray, setUpdatedRefArray] =
    React.useState<React.MutableRefObject<HTMLDivElement | null>[]>(sectionsRefArray)
  const elements = useElements()
  const paymentElement = elements?.getElement('payment')
  paymentElement?.once('ready', () => {
    setUpdatedRefArray([...sectionsRefArray])
  })
  const alerts: { [key: string]: AlertProps } = {
    'select-payment-method': {
      color: 'info',
      children: <Typography>{payment && paymentMethodAlertMap[payment]}</Typography>,
      icon: false,
      sx: {
        display: payment ? 'flex' : 'none',
      },
    },
    'select-authentication': {
      color: 'info',
      children: <AuthenticateAlertContent />,
      icon: false,
      sx: {
        display:
          authentication === DonationFormAuthState.AUTHENTICATED || authentication === null
            ? 'none'
            : 'flex',
      },
    },
  }

  return (
    <>
      {updatedRefArray.map((ref, index) => {
        const alert = alerts[ref.current?.id as keyof typeof alerts]
        return <AnchoredAlert key={index} sectionRef={ref} {...alert} />
      })}
    </>
  )
}

export default AlertsColumn
