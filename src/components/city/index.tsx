import { useState } from 'react'
import { CircularProgress, Grid, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useCityList } from 'common/hooks/city'
import BootcampersLayout from './layout/Layout'
import GenericGrid from './utils/Grid'
import { useRouter } from 'next/router'
import SubmitButton from 'components/common/form/SubmitButton'
import theme from './layout/theme'
import RefetchStore from './layout/RefetchStore'

export default function BootcampPage() {
  const [isRefetch] = useState(RefetchStore.isRefetch)
  const router = useRouter()
  const info = useCityList()
  const isLoading = info.isLoading
  const bootcampers = info.data

  if (isRefetch) {
    info.refetch()
  }

  return (
    <BootcampersLayout>
      <Grid item style={{ marginTop: '10%', marginLeft: '10%' }}>
        <Typography variant="h4" style={{ fontSize: '20px', marginLeft: '41%' }}>
          ALL CITIES
        </Typography>
      </Grid>
      <Grid>
        {isLoading && <CircularProgress size="large" />}
        <GenericGrid data={bootcampers || []} />
      </Grid>
    </BootcampersLayout>
  )
}
