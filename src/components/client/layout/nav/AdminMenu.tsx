import React, { useState } from 'react'
import { styled, lighten } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Avatar, Grid, IconButton, Menu, Typography } from '@mui/material'

import theme from 'common/theme'
import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'
import { useRouter } from 'next/router'

const PREFIX = 'AdminMenu'

const classes = {
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.dropdownLinkButton}`]: {
    '&:hover': {
      backgroundColor: lighten(theme.palette.primary.main, 0.9),
    },
  },

  [`& .${classes.dropdownLinkText}`]: {
    color: theme.palette.primary.dark,
    width: '100%',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

type NavItem = {
  href: string
  label: string
  target?: string
  enabled?: boolean
}

const adminItems: NavItem[] = [
  {
    href: routes.profile.index,
    label: 'nav.profile',
  },
  {
    href: routes.admin.index,
    label: 'nav.admin.index',
  },
  {
    href: routes.logout,
    label: 'nav.logout',
  },
]

export default function AdminMenu() {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  if (!session) {
    return null
  }

  const title = `${session?.user?.name}\n(${session?.user?.email})`
  const lettersAvatar = `${session.user?.given_name.charAt(0)}${session.user?.family_name.charAt(
    0,
  )}`.toUpperCase()

  return (
    <StyledGrid item>
      <IconButton onClick={handleMenu} size="large">
        {session?.user?.picture ? (
          <Avatar title={title} alt={title} src={session?.user?.picture} />
        ) : (
          <Avatar
            sx={{
              bgcolor: theme.palette.success.light,
              height: theme.spacing(4.5),
              width: theme.spacing(4.5),
              fontSize: '1rem',
            }}>
            {lettersAvatar}
          </Avatar>
        )}
      </IconButton>
      <Menu
        disableScrollLock={true}
        keepMounted
        id="menu-appbar"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {adminItems.map(({ href, label }, key) => (
          <LinkMenuItem
            href={href}
            selected={router.asPath === href}
            key={key}
            className={classes.dropdownLinkButton}>
            <Typography variant="button" className={classes.dropdownLinkText}>
              {t(label)}
            </Typography>
          </LinkMenuItem>
        ))}
      </Menu>
    </StyledGrid>
  )
}
