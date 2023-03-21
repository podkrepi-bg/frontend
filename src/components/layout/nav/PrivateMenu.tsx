import React, { useState } from 'react'
import { styled, lighten } from '@mui/material/styles'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Avatar, Grid, IconButton, Menu, Typography } from '@mui/material'

import theme from 'common/theme'
import { routes } from 'common/routes'
import { isAdmin } from 'common/util/roles'
import LinkMenuItem from 'components/common/LinkMenuItem'
import { useRouter } from 'next/router'
import { useCurrentPerson } from 'common/util/useCurrentPerson'

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
]

export default function PrivateMenu() {
  const { t } = useTranslation()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const { data: currentPerson } = useCurrentPerson()
  const userPicture = currentPerson?.user.picture

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  if (!session) {
    return null
  }

  const title = `${session?.user?.name}\n(${session?.user?.email})`

  return (
    <StyledGrid item>
      <IconButton onClick={handleMenu} size="medium">
        {session?.user?.picture ? (
          <Avatar
            sx={{ width: '32px', height: '32px' }}
            title={title}
            alt={title}
            src={session?.user?.picture}
          />
        ) : (
          userPicture && (
            <Avatar
              sx={{
                bgcolor: theme.palette.success.light,
                height: theme.spacing(4),
                width: theme.spacing(4),
                fontSize: '1rem',
              }}
              src={userPicture}
            />
          )
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
        <LinkMenuItem href={routes.profile.index} className={classes.dropdownLinkText}>
          <Typography variant="button">{t('nav.profile')}</Typography>
        </LinkMenuItem>
        {status === 'authenticated' &&
          isAdmin(session) &&
          adminItems.map(({ href, label }, key) => (
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
        <LinkMenuItem href={routes.logout} className={classes.dropdownLinkText}>
          <Typography variant="button">{t('nav.logout')}</Typography>
        </LinkMenuItem>
      </Menu>
    </StyledGrid>
  )
}
