import { Typography, Box, Toolbar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { IconButton } from '@mui/material'
type Props = {
  title: string
}

export default function AppBarMenu({ title }: Props) {
  return (
    <Toolbar
      disableGutters
      variant="dense"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        background: 'white',
        width: '100%',
        borderRadius: '13px 13px 0 0',
        pl: '24px',
      }}>
      <Typography variant="h5" color="primary">
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton>
          <HomeIcon color="action" />
        </IconButton>
        <Typography fontSize={'18px'} sx={{ px: 0.5, height: '20px' }}>
          /
        </Typography>
        <IconButton sx={{ borderRadius: '10px' }}>
          <Typography>{title}</Typography>
        </IconButton>
      </Box>
    </Toolbar>
  )
}
