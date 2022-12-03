import React from 'react'

import { Typography } from '@mui/material'

import { moneyPublicDecimals2 } from 'common/util/money'

type MoneyFormattedProps = {
  money: number
  currency: string
}

const MoneyFormatted: React.FC<MoneyFormattedProps> = ({ money, currency }) => {
  return <Typography component="span">{moneyPublicDecimals2(money, currency)}</Typography>
}

export default MoneyFormatted
