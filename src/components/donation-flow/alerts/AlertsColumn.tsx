import React from 'react'
import { Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { AnchoredAlert, AnchoredAlertProps } from './AnchoredAlert'
import { DonationFormDataPaymentOption, DonationFormDataV2 } from '../helpers/types'

const cardAlertDescription = `Таксата на Stripe се изчислява според района на картодържателя: 1.2% + 0.5лв. за Европейската икономическа зона`
const bankAlertDescription = `Таксата за транзакция при банков превод зависи от индивидуалните условия на Вашата банка. от (0-4лв)`

const paymentMethodAlertMap = {
  [DonationFormDataPaymentOption.CARD]: cardAlertDescription,
  [DonationFormDataPaymentOption.BANK]: bankAlertDescription,
}

function AlertsColumn({
  sectionsRefArray,
}: {
  sectionsRefArray: React.MutableRefObject<HTMLDivElement | null>[]
}) {
  const {
    values: { payment },
  } = useFormikContext<DonationFormDataV2>()

  const alerts: Omit<AnchoredAlertProps, 'sectionRef'>[] = [
    {
      color: 'info',
      children: <Typography>Amount selected is wrong</Typography>,
    },
    {
      color: 'info',
      children: <Typography>{payment && paymentMethodAlertMap[payment]}</Typography>,
      icon: false,
      hidden: !payment,
    },
    {
      color: 'info',
      children: <Typography>Amount selected is wrong</Typography>,
    },
  ]

  return (
    <>
      {sectionsRefArray.map((ref, index) => {
        return <AnchoredAlert key={index} sectionRef={ref} {...alerts[index]} />
      })}
    </>
  )
}

export default AlertsColumn
