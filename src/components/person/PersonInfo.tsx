import { Box, Grid, Theme, Typography } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import theme from 'common/theme'
import { format, parseISO } from 'date-fns'
import { PersonResponse } from 'gql/person'
import React from 'react'

type Props = {
  person: PersonResponse
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoHeading: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    infoWrapper: {
      '&>*': {
        marginBottom: theme.spacing(1),
      },
    },
  }),
)

function PersonInfo({ person }: Props) {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Typography className={classes.infoHeading} variant="h6" color={theme.palette.primary.dark}>
          Contact information:
        </Typography>
        <Box className={classes.infoWrapper}>
          <Typography>Email: {person.email}</Typography>
          <Typography>Tel: {person.phone}</Typography>
          <Typography>Adress: {person.address}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography className={classes.infoHeading} variant="h6" color={theme.palette.primary.dark}>
          General information:
        </Typography>
        <Box className={classes.infoWrapper}>
          <Typography>Created at: {format(parseISO(person.createdAt), 'PPpp')}</Typography>
          <Typography>Company: {person.company}</Typography>
          <Typography>Confirmed email: {person.emailConfirmed ? 'Yes' : 'No'}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default PersonInfo
