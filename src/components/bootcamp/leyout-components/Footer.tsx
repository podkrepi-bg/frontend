import { Typography } from '@mui/material'
import { BottomNavigation } from '@mui/material'

export default function BootcampFooter() {
  return (
    <BottomNavigation
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '45x',
        background: '#294e85',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        paddingInline: 10,
        paddingLeft: '12rem',
      }}>
      <Typography variant="inherit">&copy; Footer</Typography>
    </BottomNavigation>
  )
}
