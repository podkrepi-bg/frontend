/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import { Modal } from '@mui/material'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'
import { useMutation } from 'react-query'
import { deleteBootcamp } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'

export default function DeleteModal(props: any) {
  const { deleteData, deleteOpen, setDeleteOpen } = props.modalProps
  const router = useRouter()

  const { t } = useTranslation()
  const mutation = useMutation({
    mutationFn: deleteBootcamp,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })
  const handleDeleteClick = (id: string) => async () => {
    try {
      await mutation.mutateAsync({ id: id })
      router.push(routes.bootcamps.home)
    } catch (error) {
      AlertStore.show(t('common:alert.error'), 'error')
    }
    setDeleteOpen(false)
    router.push(routes.bootcamps.home)
  }
  // const handleDelete = async () => {
  //   await axios.delete(endpoints.bootcamp.deleteBootcamp(deleteData.id).url)
  //   setDeleteOpen(false)
  //   router.push(routes.bootcamps.home)
  // }

  return (
    <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>{deleteData.title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClick(deleteData.id)} autoFocus>
            Yes
          </Button>
          <Button onClick={() => setDeleteOpen(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </Modal>
  )
}
