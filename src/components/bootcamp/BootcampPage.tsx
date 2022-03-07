import { Button, Grid, Tooltip } from '@mui/material'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import Link from 'next/link'
import BootcampLayout from './BootcampLayout'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useTranslation } from 'next-i18next'
import BootcampGrid from './leyout-components/DataGrid'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { deleteTasks } from './survices/bootcampSurvices'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import DeleteModal from './DeleteModal'
import { useRouter } from 'next/router'

export default function BootcampPage() {
  const { t } = useTranslation()
  const [selectedIds, setSelectedIds] = useState([])
  const [openCloseDeleteAll, setDeleteAll] = useState(false)
  const closeModal = () => setDeleteAll(false)
  const openModal = () => setDeleteAll(true)
  const router = useRouter()

  const mutation = useMutation<AxiosResponse<string>, AxiosError<ApiErrors>, []>({
    mutationFn: deleteTasks,
    onError: () => AlertStore.show(t('bootcamp:alerts.delete-row.error'), 'error'),
    onSuccess: () => AlertStore.show(t('bootcamp:alerts.delete-row.success'), 'success'),
  })

  const deleteMany = async () => {
    try {
      await mutation.mutateAsync(selectedIds as [])
      closeModal()
      router.push('bootcamp/')
    } catch (error) {
      alert(error)
    }
  }
  return (
    <BootcampLayout>
      <AdminContainer title={t('bootcamp:nav.title')}>
        <Grid container justifyContent="flex-end">
          <Link passHref href="bootcamp/add">
            <Button title="Add" size="large" color="info" startIcon={<AddCircleIcon />}>
              {t('bootcamp:btns.add')}
            </Button>
          </Link>
          <Tooltip title="Delete selected" placement="top">
            <span>
              <Button
                onClick={openModal}
                color="primary"
                disabled={selectedIds.length == 0}
                startIcon={<DeleteIcon />}>
                {t('bootcamp:btns.delete')}
              </Button>
            </span>
          </Tooltip>
        </Grid>
        <DeleteModal
          open={openCloseDeleteAll}
          confirmHandler={deleteMany}
          closeModal={closeModal}
        />
        <BootcampGrid setIds={setSelectedIds} />
      </AdminContainer>
    </BootcampLayout>
  )
}
