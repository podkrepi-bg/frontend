import * as React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { List, ListItemButton } from '@mui/material'
import { ContentCopy, Facebook, LinkedIn, Share, Twitter } from '@mui/icons-material'
import { AlertStore } from 'stores/AlertStore'
import theme from 'common/theme'

export default function SocialShareListButton({ url }: { url: string }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const serializedUrl = new URLSearchParams(url).toString()
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
        <List>
          <ListItemButton
            onClick={() => {
              navigator.clipboard.writeText(url)
              AlertStore.show('Campaign link copied to clipboard', 'success')
            }}>
            <Typography>Copy campaign link</Typography>
            <ContentCopy sx={{ ml: 1, fill: theme.palette.grey[400] }} />
          </ListItemButton>
          <ListItemButton href={`https://www.facebook.com/sharer/sharer.php?u=${serializedUrl}`}>
            <Typography>Share on Facebook</Typography>
            <Facebook sx={{ ml: 1, fill: '#4267B2' }} />
          </ListItemButton>
          <ListItemButton
            href={`
            http://www.linkedin.com/shareArticle?mini=true&url=${serializedUrl}
          `}>
            <Typography>Share on LinkedIn</Typography>
            <LinkedIn sx={{ ml: 1, fill: '#0077b5' }} />
          </ListItemButton>
          <ListItemButton href={`https://twitter.com/intent/tweet?url=${serializedUrl}`}>
            <Typography>Share on Twitter</Typography>
            <Twitter sx={{ ml: 1, fill: '#1DA1F2' }} />
          </ListItemButton>
        </List>
      </Popover>
    </div>
  )
}
