import React from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'
import theme from 'common/theme'

function BankIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="43"
      height="45"
      viewBox="0 0 43 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M4.3 19.2857H10.75V34.2857H4.3V19.2857ZM18.275 19.2857H24.725V34.2857H18.275V19.2857ZM0 38.5714H43V45H0V38.5714ZM32.25 19.2857H38.7V34.2857H32.25V19.2857ZM21.5 0L0 10.7143V15H43V10.7143L21.5 0Z"
        fill={theme.palette.primary.main}
      />
    </SvgIcon>
  )
}

export default BankIcon
