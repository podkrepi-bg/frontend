import React from 'react'

import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'

import { Grid, Button } from '@mui/material'
import { isAdmin } from 'common/util/roles'
import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

import { AuthLink, AuthLinksWrapper, SlashSymbol } from './AuthLinks.styled'

export const AuthLinks = () => {
  const { t } = useTranslation()

  const { data: session, status } = useSession()

  if (session) {
    return (
      <>
        <Grid item>
          <LinkButton fullWidth href={routes.profile.index}>
            {t('nav.profile')}
          </LinkButton>
        </Grid>
        {status === 'authenticated' && isAdmin(session) && (
          <Grid item>
            <Button fullWidth href={routes.admin.index}>
              {t('nav.admin.index')}
            </Button>
          </Grid>
        )}
        <Grid item>
          <LinkButton fullWidth href={routes.logout}>
            {t('nav.logout')}
          </LinkButton>
        </Grid>
      </>
    )
  }

  return (
    <>
      <AuthLinksWrapper>
        <AuthLink href={routes.login}>{t('nav.login')}</AuthLink>
        <SlashSymbol>/</SlashSymbol>
        <AuthLink href={routes.register}>{t('nav.register')}</AuthLink>
      </AuthLinksWrapper>
    </>
  )
}
