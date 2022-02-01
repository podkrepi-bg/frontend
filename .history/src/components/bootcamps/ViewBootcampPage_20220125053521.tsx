import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { Grid, Theme, Typography } from '@mui/material'

import NotFoundPage from 'pages/404'
import { money } from 'common/util/money'
import Layout from 'components/layout/Layout'
import { useViewBootcamp } from 'common/hooks/bootcamps'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginTop: {
      marginTop: theme.spacing(3),
    },
    progressCardWrapper: {
      backgroundColor: '#c6eed6',
      borderRadius: theme.spacing(3),
    },
  }),
)

type Props = { id: string }
export default function ViewBootcampPage({ id }: Props) {
  const classes = useStyles()
  const { data } = useBootcamp(id)

  if (!data || !data.bootcamp) return <NotFoundPage />

  const { bootcamp } = data
  return (
    <Layout title={bootcamp.firstName}>
      <Grid container spacing={6} className={classes.marginTop}>
        <Grid item xs={12} md={8}>
          <Typography className={classes.marginTop}>{bootcamp.lastName}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
        </Grid>
      </Grid>
    </Layout>
  )
}

