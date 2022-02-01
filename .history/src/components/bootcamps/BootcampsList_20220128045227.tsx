/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Box, CircularProgress, Container, Grid } from '@mui/material'

import Layout from 'components/layout/Layout'

import BootcampsGrid from './grid/BootcampsGrid'
import BootcampCard from './BootcampCard'
import { useBootcampsList } from 'common/hooks/bootcamps'

export default function BootcampsPage() {
  const { data, isLoading } = useBootcampsList()
  return (
    <Grid container justifyContent="center" spacing={2}>
      {isLoading && <CircularProgress size="large" />}
      {data?.map((bootcamp, index) => (
        <Grid key={index} item xs={12} sm={8} lg={4}>
          <Box textAlign="center">
            <BootcampCard bootcamp={bootcamp} />
          </Box>
        </Grid>
      ))}
    </Grid>
    // <Layout>
    //   <Container maxWidth="lg">
    //     <BootcampsGrid />
    //   </Container>
    // </Layout>
  )
}
