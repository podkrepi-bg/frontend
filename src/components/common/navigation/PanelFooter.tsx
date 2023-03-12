import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

function PanelFooter({ children }: Props) {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '45x',
        background: '#294e85',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingInline: 10,
        paddingLeft: '12rem',
      }}>
      {children}
    </Box>
  )
}

export default PanelFooter
