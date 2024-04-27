import React from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Avatar, Grid, Typography } from '@mui/material'

import theme from 'common/theme'
import { routes } from 'common/routes'
import { isAdmin } from 'common/util/roles'
import LinkMenuItem from 'components/common/LinkMenuItem'
import { useRouter } from 'next/router'
import GenericNavMenu from './GenericNavMenu'

const PREFIX = 'PrivateMenu'

const classes = {
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
}

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

  if (!session) {
    return null
  }

  const title = `${session?.user?.name}\n(${session?.user?.email})`
  const lettersAvatar = `${session.user?.given_name?.charAt(0) || session.user?.email?.charAt(0)}${
    session.user?.family_name?.charAt(0) || session.user?.email?.charAt(1)
  }`.toUpperCase()

  const Icon = (
    <>
      {session?.user?.picture ? (
        <Avatar title={title} alt={title} src={session?.user?.picture} />
      ) : (
        <Avatar
          sx={{
            bgcolor: theme.palette.success.light,
            height: theme.spacing(4.5),
            width: theme.spacing(4.5),
            fontSize: theme.typography.pxToRem(16),
          }}>
          {lettersAvatar}
        </Avatar>
      )}
    </>
  )
  return (
    <Grid item component={'li'}>
      <GenericNavMenu buttonType="icon" id="test" label={'ahoy'} icon={Icon}>
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
      </GenericNavMenu>
    </Grid>
  )
}
