import * as React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { List, ListItemButton } from '@mui/material'
import { Facebook, LinkedIn, Share } from '@mui/icons-material'

export default function SocialShareList({ url }: { url: string }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick} variant="outlined">
        Сподели в соц. мрежи <Share sx={{ ml: 1 }} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        {/* Create a MUI list and use react-share buttons for the share buttons */}
        <List>
          <ListItemButton>
            <Typography>Share on Facebook</Typography>
            <Facebook sx={{ ml: 1, fill: '#4267B2' }} />
          </ListItemButton>
          <ListItemButton>
            <Typography>Share on LinkedIn</Typography>
            <LinkedIn sx={{ ml: 1, fill: '#0077b5' }} />
          </ListItemButton>
        </List>
      </Popover>
    </div>
  )
}
