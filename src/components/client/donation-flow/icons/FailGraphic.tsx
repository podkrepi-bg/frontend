import { SvgIcon, SvgIconProps } from '@mui/material'
import theme from 'common/theme'

function FailGraphic(props: SvgIconProps) {
  return (
    <SvgIcon
      width="194"
      height="194"
      viewBox="0 0 194 194"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M96.565 193.13C149.896 193.13 193.13 149.896 193.13 96.565C193.13 43.2336 149.896 0 96.565 0C43.2336 0 0 43.2336 0 96.565C0 149.896 43.2336 193.13 96.565 193.13Z"
        fill={theme.palette.warning.dark}
      />
      <path
        d="M75.7053 70.0485L70.0485 75.7053L117.425 123.081L123.081 117.425L75.7053 70.0485Z"
        fill="white"
      />
      <path
        d="M123.081 75.7054L117.425 70.0486L70.0484 117.425L75.7053 123.082L123.081 75.7054Z"
        fill="white"
      />
    </SvgIcon>
  )
}

export default FailGraphic
