import { useState } from 'react'
import { CircularProgress, Grid, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useBootcampersList } from 'common/hooks/bootcamp'
import BootcampersLayout from './layout/Layout'
import { useTranslation } from 'next-i18next'
import GenericGrid from './utils/Grid'
import { useRouter } from 'next/router'
import SubmitButton from 'components/common/form/SubmitButton'
import theme from './layout/theme'
import RefetchStore from './layout/RefetchStore'

export default function BootcampPage() {
  const [isRefetch] = useState(RefetchStore.isRefetch)
  const { t } = useTranslation()
  const router = useRouter()
  const info = useBootcampersList()
  const isLoading = info.isLoading
  const bootcampers = info.data

  if (isRefetch) {
    info.refetch()
  }

  return (
    <BootcampersLayout>
      <Grid item style={{ marginTop: '10%', marginLeft: '10%' }}>
        <Typography variant="h4">{t('nav.bootcamp.bootcampers')}</Typography>
        <SubmitButton
          sx={{
            fontSize: '13px',
            marginTop: '1%',
            marginBottom: '1%',
            bgcolor: theme.palette.primary.light,
          }}
          onClick={() => {
            router.push('/bootcamp/add')
          }}
          href="#"
          label="Add bootcamper">
          <AddIcon></AddIcon> Add bootcamper
        </SubmitButton>
      </Grid>
      <Grid>
        {isLoading && <CircularProgress size="large" />}
        <GenericGrid data={bootcampers || []} />
      </Grid>
    </BootcampersLayout>
  )
}
