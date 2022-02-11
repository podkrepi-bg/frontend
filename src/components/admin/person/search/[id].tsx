import { useState } from 'react'
import { CircularProgress, Container, Divider, Grid, Typography } from '@mui/material'
import { usePersonList } from 'common/hooks/person'
import BootcampersLayout from '../layout/Layout'
import GenericGrid from '../utils/Grid'
import RefetchStore from '../layout/RefetchStore'
import { useRouter } from 'next/router'

export default function BootcampPage() {
  const [isRefetch] = useState(RefetchStore.isRefetch)
  const { query } = useRouter()
  const queryId = (Array.isArray(query.id) ? query.id[0] : query.id) || ''

  const info = usePersonList()
  const isLoading = info.isLoading
  const bootcampers = info.data?.filter(
    (x) =>
      x.firstName.toLocaleLowerCase().includes(queryId.toLocaleLowerCase()) ||
      x.lastName.toLocaleLowerCase().includes(queryId.toLocaleLowerCase()),
  )

  if (isRefetch) {
    info.refetch()
  }

  return (
    <BootcampersLayout>
      <Container
        sx={{
          bgcolor: '#E9F6FF',
          border: '2px solid white',
          borderRadius: '1%',
        }}>
        <Container
          style={{
            border: '5px solid white',
            borderRadius: '1%',
            marginTop: '2%',
            width: '90%',
            overflow: 'hidden',
          }}>
          <Grid item style={{ marginTop: '10%', marginLeft: '10%' }}>
            <Typography variant="h4" style={{ fontSize: '24px' }}>
              SEARCH RESULTS FOR &apos;{queryId.toLocaleUpperCase()}&apos;
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
