import { Box, Grid, Typography } from '@mui/material'
import theme from 'common/theme'
import { format, parseISO } from 'date-fns'
import { PersonResponse } from 'gql/person'
import React from 'react'

type Props = {
  person: PersonResponse
}

function PersonInfo({ person }: Props) {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" color={theme.palette.primary.dark}>
          Contact information:
        </Typography>
        <Box>
          <Typography>Email: {person.email}</Typography>
          <Typography>Tel: {person.phone}</Typography>
          <Typography>Tel: {person.address}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" color={theme.palette.primary.dark}>
          General information:
        </Typography>
        <Box>
          <Typography>Created at: {format(parseISO(person.createdAt), 'PPpp')}</Typography>
          <Typography>Company: {person.company}</Typography>
          <Typography>Confirmed email: {person.emailConfirmed ? 'Yes' : 'No'}</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default PersonInfo
