import { Box, Grid, Theme, Typography } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import theme from 'common/theme'
import { format, parseISO } from 'date-fns'
import { PersonResponse } from 'gql/person'
import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation()
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Typography className={classes.infoHeading} variant="h6" color={theme.palette.primary.dark}>
          {t('person:info.contact')}
        </Typography>
        <Box className={classes.infoWrapper}>
          <Typography>
            {t('person:info.email')}: {person.email}
          </Typography>
          <Typography>
            {t('person:info.tel')}: {person.phone}
          </Typography>
          <Typography>
            {t('person:info.address')}: {person.address}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography className={classes.infoHeading} variant="h6" color={theme.palette.primary.dark}>
          {t('person:info.general')}
        </Typography>
        <Box className={classes.infoWrapper}>
          <Typography>
            {t('person:info.createdAt')}: {format(parseISO(person.createdAt), 'PPpp')}
          </Typography>
          <Typography>
            {t('person:info.company')}: {person.company}
          </Typography>
          <Typography>
            {t('person:info.confirmedEmail')}: {person.emailConfirmed ? 'Yes' : 'No'}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default PersonInfo
