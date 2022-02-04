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
        {/* <SubmitButton
          sx={{
            fontSize: '13px',
            marginTop: '1%',
            width: '25%',
            marginLeft: '20%',
            bgcolor: theme.palette.primary.light,
          }}
          onClick={() => {
            router.push('/city/add')
          }}
          href="#"
          label="Add city">
          <AddIcon></AddIcon> Add city
        </SubmitButton> */}
      </Grid>
      <Grid>
        {isLoading && <CircularProgress size="large" />}
        <GenericGrid data={bootcampers || []} />
      </Grid>
    </BootcampersLayout>
  )
}
