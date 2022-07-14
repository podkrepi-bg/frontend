import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { AccountCircle } from '@mui/icons-material'
import { Avatar, Grid, IconButton, lighten, Menu, Typography } from '@mui/material'

import theme from 'common/theme'
import { routes } from 'common/routes'
import { isAdmin } from 'common/util/roles'
import LinkMenuItem from 'components/common/LinkMenuItem'
import { useRouter } from 'next/router'

const PREFIX = 'PrivateMenu'

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
    href: routes.admin.index,
    label: 'nav.admin.index',
  },
  {
    href: routes.admin.infoRequests,
    label: 'nav.admin.info-requests',
  },
  {
    href: routes.admin.supporters,
    label: 'nav.admin.supporters',
  },
]

export default function PrivateMenu() {
  const { t } = useTranslation()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  if (!session) {
    return null
  }

  const title = `${session.name}\n(${session.email})`
  return (
    <StyledGrid item>
      <IconButton onClick={handleMenu} size="large">
        {session?.user?.picture ? (
          <Avatar title={title} alt={title} src={session?.user?.picture} />
        ) : (
          <AccountCircle sx={{ fill: theme.palette.success.light }} />
        )}
      </IconButton>
      <Menu
        keepMounted
        id="menu-appbar"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <LinkMenuItem href={routes.profile.index} className={classes.dropdownLinkText}>
          <Typography variant="button">{t('nav.profile')}</Typography>
        </LinkMenuItem>
        {status === 'authenticated' &&
          isAdmin(session) &&
          adminItems.map(({ href, label, target }, key) => (
            <LinkMenuItem
              href={href}
              selected={router.asPath === href}
              key={key}
              target={target}
              className={classes.dropdownLinkButton}>
              <Typography variant="button" className={classes.dropdownLinkText}>
                {t(label)}
              </Typography>
            </LinkMenuItem>
          ))}
        <LinkMenuItem href={routes.logout} className={classes.dropdownLinkText}>
          <Typography variant="button">{t('nav.logout')}</Typography>
        </LinkMenuItem>
      </Menu>
    </StyledGrid>
  )
}
