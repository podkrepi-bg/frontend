import MyLayout from '../MyLayout'
import { Grid } from '@mui/material'
import BootcampInternEditForm from '../BootcampInternEditForm'
import { UseBaseQueryResult, useQuery } from 'react-query'
import { BootcampIntern } from 'lib/interfaces/BootcampIntern'
import { useFetchBootcampIntern } from 'common/hooks/bootcampIntern'
import { queryFn } from 'common/rest'

export default function EditBootcampInternPage() {
  return (
    <MyLayout>
      <Grid container>
        <BootcampInternEditForm />
      </Grid>
    </MyLayout>
  )
}
