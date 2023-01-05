import React from 'react'
import { styled } from '@mui/material/styles'
import { useFormikContext } from 'formik'

import { OneTimeDonation } from 'gql/donations'
import RadioCardGroup from '../common/RadioCardGroup'
import CardIcon from '../icons/CardIcon'
import BankIcon from '../icons/BankIcon'

const PREFIX = 'AMOUNT'

const classes = {
  divider: `${PREFIX}-divider`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.divider}`]: {
    border: '1px solid #000000',
  },
}))

export default function PaymentMethod() {
  const formik = useFormikContext<OneTimeDonation>()
  const options = [
    {
      value: 'card',
      label: 'Card',
      icon: <CardIcon sx={{ width: 80, height: 80 }} />,
      disabled: !formik.values.amount,
    },
    {
      value: 'bank',
      label: 'Bank Transfer',
      icon: <BankIcon sx={{ width: 80, height: 80 }} />,
    },
  ]
  return (
    <Root>
      <RadioCardGroup columns={2} name="payment" options={options} />
    </Root>
  )
}
