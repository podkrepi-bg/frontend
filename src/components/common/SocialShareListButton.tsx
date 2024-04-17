import * as React from 'react'
import {
  List,
  ListItemButton,
  Button,
  Typography,
  Popover,
  PopoverProps,
  ButtonProps,
} from '@mui/material'
import { ContentCopy, Facebook, LinkedIn, Share, Twitter } from '@mui/icons-material'

import { AlertStore } from 'stores/AlertStore'
import theme from 'common/theme'
import { useTranslation } from 'next-i18next'

export default function SocialShareListButton({
  url,
  buttonProps,
  popoverProps,
}: {
  url: string
  buttonProps?: ButtonProps
  popoverProps?: PopoverProps
}) {
  const { t } = useTranslation('common')
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
    <>
      <Button aria-describedby={id} onClick={handleClick} variant="outlined" {...buttonProps}>
        {t('cta.share')} <Share sx={{ ml: 1 }} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        {...popoverProps}>
        <List>
          <ListItemButton
            onClick={() => {
              navigator.clipboard.writeText(url)
              AlertStore.show('Campaign link copied to clipboard', 'success')
              setAnchorEl(null)
            }}>
            <Typography>{t('components.social-share.copy')}</Typography>
            <ContentCopy sx={{ ml: 1, fill: theme.palette.grey[400] }} />
          </ListItemButton>
          <ListItemButton href={`https://www.facebook.com/sharer/sharer.php?u=${serializedUrl}`}>
            <Typography>{t('components.social-share.share')} Facebook</Typography>
            <Facebook sx={{ ml: 1, fill: '#4267B2' }} />
          </ListItemButton>
          <ListItemButton
            href={`
            http://www.linkedin.com/shareArticle?mini=true&url=${serializedUrl}
          `}>
            <Typography>{t('components.social-share.share')} LinkedIn</Typography>
            <LinkedIn sx={{ ml: 1, fill: '#0077b5' }} />
          </ListItemButton>
          <ListItemButton href={`https://twitter.com/intent/tweet?url=${serializedUrl}`}>
            <Typography>{t('components.social-share.share')} Twitter</Typography>
            <Twitter sx={{ ml: 1, fill: '#1DA1F2' }} />
          </ListItemButton>
        </List>
      </Popover>
    </>
  )
}
