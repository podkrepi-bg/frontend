import React from 'react'

import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'

import { Grid2 } from '@mui/material'
import { isAdmin } from 'common/util/roles'
import { routes } from 'common/routes'

import { AuthLink, AuthLinksWrapper, StyledAuthButton, SlashSymbol } from './AuthLinks.styled'

export const AuthLinks = () => {
  const { t } = useTranslation()

  const { data: session, status } = useSession()

  if (session) {
    return (
      <>
        <Grid2>
          <StyledAuthButton fullWidth href={routes.profile.index}>
            {t('nav.profile')}
          </StyledAuthButton>
        </Grid2>
        {status === 'authenticated' && isAdmin(session) && (
          <Grid2>
            <StyledAuthButton fullWidth href={routes.admin.index}>
              {t('nav.admin.index')}
            </StyledAuthButton>
          </Grid2>
        )}
        <Grid2>
          <StyledAuthButton fullWidth href={routes.logout}>
            {t('nav.logout')}
          </StyledAuthButton>
        </Grid2>
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
