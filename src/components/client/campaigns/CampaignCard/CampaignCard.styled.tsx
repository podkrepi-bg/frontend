import { Card } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Root = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'initial',
  boxShadow: 'none',
  position: 'relative',

  '&:hover': {
    filter: 'grayscale(15%)',
    backgroundColor: '#F8F8F8	',
  },
}))
