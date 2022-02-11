import { useState } from 'react'
import { CircularProgress, Container, Divider, Grid, Typography } from '@mui/material'
import { usePersonList } from 'common/hooks/person'
import BootcampersLayout from './layout/Layout'
import GenericGrid from './utils/Grid'
import RefetchStore from './layout/RefetchStore'

export default function BootcampPage() {
  const [isRefetch] = useState(RefetchStore.isRefetch)
  const info = usePersonList()
  const isLoading = info.isLoading
  const bootcampers = info.data

  if (isRefetch) {
    info.refetch()
  }

  return (
    <BootcampersLayout>
      <Container
        sx={{
          bgcolor: '#E9F6FF',
          border: '2px solid #E9F6FF',
          borderRadius: '1%',
        }}>
        <Container
          style={{
            // backgroundColor: '#E9F6FF',
            border: '5px solid white',
            borderRadius: '1%',
            marginTop: '2%',
            width: '90%',
            overflow: 'hidden',
            // marginLeft: '10%',
            // marginTop: '-2%',
            // padding: "5% 5% 5% 5%"
          }}>
          <Grid item style={{ marginTop: '10%', marginLeft: '10%' }}>
            <Typography variant="h4" style={{ fontSize: '24px' }}>
              ALL PEOPLE
            </Typography>
          </Grid>
          <Divider></Divider>
          <Grid>
            {isLoading && <CircularProgress size="large" />}
            <GenericGrid data={bootcampers || []} />
          </Grid>
        </Container>
      </Container>
    </BootcampersLayout>
  )
}
