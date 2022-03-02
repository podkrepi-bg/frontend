import { Button, Grid, Tooltip } from '@mui/material'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import Link from 'next/link'
import BootcampLayout from './BootcampLayout'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useTranslation } from 'next-i18next'
import BootcampGrid from './leyout-components/DataGrid'

export default function BootcampPage() {
  const { t } = useTranslation()
  return (
    <BootcampLayout>
      <AdminContainer title={t('Bootcamp-Borislav')}>
        <Grid container justifyContent="flex-end">
          <Link passHref href="bootcamp/add">
            <Button title="Add" size="large" color="info" startIcon={<AddCircleIcon />}>
              Добави
            </Button>
          </Link>
          <Tooltip title="Delete selected" placement="top">
            <span>
              <Button color="primary" disabled="true" startIcon={<DeleteIcon />}>
                Изтрий
              </Button>
            </span>
          </Tooltip>
        </Grid>
        <BootcampGrid />
      </AdminContainer>
    </BootcampLayout>
  )
}
