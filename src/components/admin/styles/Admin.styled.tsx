import { styled } from '@mui/material/styles'
import { DialogContent, DialogTitle } from '@mui/material'

export const StyledDialogContent = styled(DialogContent)({
  overflow: 'hidden',
  padding: '4rem',
  paddingTop: '1rem',
  width: '100%',
})

export const StyledDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
})
