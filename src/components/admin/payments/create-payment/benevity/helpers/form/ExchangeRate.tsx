import { Typography } from '@mui/material'

type ExchangeRateProps = {
  exchangeRate: number
}
export const ExchangeRate = ({ exchangeRate }: ExchangeRateProps) => {
  return <Typography fontSize={17}>Курс: {exchangeRate.toFixed(2)}</Typography>
}
