import React from 'react'
import { Container } from '@mui/material'

import Layout from 'components/layout/Layout'

import BootcampsGrid from './BootcampsGrid'
import BootcampCard from './BootcampCard'

export default function BootcampsPage() {
  return (
    <Grid container justifyContent="center" spacing={2}>
    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    {isLoading && <CircularProgress size="large" />}
    {data?.map((campaign, index) => (
      <Grid key={index} item xs={12} sm={8} lg={4}>
        <Box textAlign="center">
          <CampaignCard campaign={campaign} />
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
