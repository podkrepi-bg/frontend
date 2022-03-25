import { useMediaQuery } from '@mui/material'

export default function useMobile() {
  const mobile = useMediaQuery('(max-width:900px)')
  const small = useMediaQuery('(max-width:600px)')

  return {
    mobile,
    small,
  }
}
