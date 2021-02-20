import React from 'react'
import { useSession } from 'next-auth/client'
import { Avatar, Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { AccountCircle } from '@material-ui/icons'

import { routes } from 'common/routes'
import LinkIconButton from 'components/common/LinkIconButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {},
    logoutBtn: {
      color: theme.palette.error.main,
      boxShadow: theme.shadows[4],
    },
  }),
)

export default function ProfileMenu() {
  const classes = useStyles()
  const [session] = useSession()
  if (!session) {
    return null
  }
  const title = `${session.user.name}\n(${session.user.email})`
  return (
    <Grid container justify="flex-end" direction="row" wrap="nowrap" spacing={2}>
      <Grid item>
        <LinkIconButton href={routes.about}>
          {session.user.image ? (
            <Avatar title={title} alt={title} src={session.user.image} className={classes.avatar} />
          ) : (
            <AccountCircle />
          )}
        </LinkIconButton>
      </Grid>
    </Grid>
  )
}
