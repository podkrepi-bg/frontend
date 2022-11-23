import { CircularProgress } from '@mui/material'
import { styled } from '@mui/styles'

//center spinner absolutely
const CenteredSpinner = styled(CircularProgress)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}))

export default CenteredSpinner
