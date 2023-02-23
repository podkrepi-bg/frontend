import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from 'common/theme'
import { formatDateString } from 'common/util/date'
import { PersonResponse } from 'gql/person'
import { useTranslation } from 'next-i18next'
import React from 'react'

const PREFIX = 'PersonInfo'

const classes = {
  infoHeading: `${PREFIX}-infoHeading`,
  infoWrapper: `${PREFIX}-infoWrapper`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.infoHeading}`]: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },

  [`& .${classes.infoWrapper}`]: {
    '&>*': {
      marginBottom: theme.spacing(1),
    },
  },
}))

type Props = {
  person: PersonResponse
}

function PersonInfo({ person }: Props) {
  const { t, i18n } = useTranslation()
  return (
    <StyledGrid container>
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
            {t('person:info.createdAt')}: {formatDateString(person.createdAt, i18n.language)}
          </Typography>
          <Typography>
            {t('person:info.company')}: {person.company}
          </Typography>
          <Typography>
            {t('person:info.confirmedEmail')}: {person.emailConfirmed ? 'Yes' : 'No'}
          </Typography>
        </Box>
      </Grid>
    </StyledGrid>
  )
}

export default PersonInfo
