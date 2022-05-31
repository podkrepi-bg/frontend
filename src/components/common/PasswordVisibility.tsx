import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'

type VisibilityProps = {
  type: string
  setType: (type: string) => void
}
export default function PasswordVisibility({ type, setType }: VisibilityProps) {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => (type === 'password' ? setType('text') : setType('password'))}
        edge="end">
        {type !== 'password' ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  )
}
