import React from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

type MoneyFormattedProps = {
  money: number
  currency?: string
}

//Function that takes in a number and returns the last 2 digits and the rest of the number
const getDecimalAndWhole = (num: number) => {
  const numString = num.toString()
  const decimal = Number(numString.slice(-2))
  const whole = Number(numString.slice(0, -2))

  return [whole, decimal]
}

function getDecimalSeparator(locale: string) {
  const numberWithDecimalSeparator = 1.1
  return Intl.NumberFormat(locale)
    .formatToParts(numberWithDecimalSeparator)
    .find((part) => part.type === 'decimal')?.value
}
const MoneyFormatted: React.FC<MoneyFormattedProps> = ({ money }) => {
  const [whole, decimal] = getDecimalAndWhole(money)
  const { i18n } = useTranslation()
  return (
    <Box display="flex">
      <Typography fontSize="1rem" component="span">
        {Intl.NumberFormat(i18n.language).format(whole)}
        {getDecimalSeparator(i18n.language)}
      </Typography>
      <Typography fontWeight="light" fontSize="0.8rem" component="span">
        {decimal}
      </Typography>
    </Box>
  )
}

export default MoneyFormatted
