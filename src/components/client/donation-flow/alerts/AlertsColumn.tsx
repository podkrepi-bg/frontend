import React from 'react'
import { useTranslation } from 'react-i18next'
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
import { ids } from '../common/DonationFormSections'

function AlertsColumn({
  sectionsRefArray,
}: {
  sectionsRefArray: React.MutableRefObject<HTMLDivElement | null>[]
}) {
  const { t } = useTranslation('donation-flow')
  const {
    values: { payment, authentication },
  } = useFormikContext<DonationFormData>()
  const cardAlertDescription = t('step.payment-method.alert.card-fee')
  const bankAlertDescription = t('step.payment-method.alert.bank-fee')
  const paymentMethodAlertMap = {
    [DonationFormPaymentMethod.CARD]: cardAlertDescription,
    [DonationFormPaymentMethod.BANK]: bankAlertDescription,
  }
  const [updatedRefArray, setUpdatedRefArray] =
    React.useState<React.MutableRefObject<HTMLDivElement | null>[]>(sectionsRefArray)
  const elements = useElements()
  const paymentElement = elements?.getElement('payment')
  paymentElement?.once('ready', () => {
    setUpdatedRefArray([...sectionsRefArray])
  })
  const alerts: { [key: string]: AlertProps } = {
    [ids['payment']]: {
      color: 'info',
      children: <Typography>{payment && paymentMethodAlertMap[payment]}</Typography>,
      icon: false,
      sx: {
        display: payment ? 'flex' : 'none',
      },
    },
    [ids['authentication']]: {
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
