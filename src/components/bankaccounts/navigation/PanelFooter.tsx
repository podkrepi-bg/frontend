import { Box } from '@mui/material'

function PanelFooter({ children }: any) {
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
        justifyContent: 'space-between',
        paddingInline: 10,
      }}>
      {children}
    </Box>
  )
}

export default PanelFooter
