import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Button, Theme } from '@mui/material'
import { isAdmin } from 'common/util/roles'
import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import { useSession } from 'next-auth/react'
import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    authLinksWrapper: {
      display: 'flex',
      borderTop: '2px solid lightgrey',
      marginLeft: theme.spacing(0.25),
      minHeight: theme.spacing(8),
    },
    authLink: {
      color: theme.palette.common.black,
    },
    slashSymbol: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
)

export const AuthLinks = () => {
  const { data: session, status } = useSession()
  const { t } = useTranslation()
  const classes = useStyles()

  if (session) {
    return (
      <>
        <Grid item>
          <LinkButton fullWidth variant="outlined" href={routes.profile.index}>
            {t('nav.profile')}
          </LinkButton>
        </Grid>
        {status === 'authenticated' && isAdmin(session) && (
          <Grid item>
            <Button fullWidth variant="outlined" href={routes.admin.index}>
              {t('nav.admin.index')}
            </Button>
          </Grid>
        )}
        <Grid item>
          <LinkButton fullWidth variant="outlined" href={routes.logout}>
            {t('nav.logout')}
          </LinkButton>
        </Grid>
      </>
    )
  }
  return (
    <>
      <Grid item className={classes.authLinksWrapper}>
        <LinkButton href={routes.login} className={classes.authLink}>
          {t('nav.login')}
        </LinkButton>
        <span className={classes.slashSymbol}>/</span>
        <LinkButton href={routes.register} className={classes.authLink}>
          {t('nav.register')}
        </LinkButton>
      </Grid>
    </>
  )
}
