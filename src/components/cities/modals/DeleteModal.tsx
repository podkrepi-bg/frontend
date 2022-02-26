import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import { Modal } from '@mui/material'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'
import { useMutation } from 'react-query'
import { deleteCity } from 'service/city'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'

export default function DeleteModal(props: any) {
  const { deleteData, deleteOpen, setDeleteOpen } = props.modalProps
  const router = useRouter()

  const { t } = useTranslation()
  const mutation = useMutation({
    mutationFn: deleteCity,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show('Градът беше преместен в кошчето.', 'warning'),
  })
  const handleDeleteClick = (id: string) => async () => {
    try {
      await mutation.mutateAsync({ id: id })
      router.push(routes.admin.cities.home)
    } catch (error) {
      AlertStore.show(t('common:alert.error'), 'error')
    }
    setDeleteOpen(false)
    router.push(routes.admin.cities.home)
  }

  return (
    <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>{deleteData.title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClick(deleteData.id)} autoFocus>
            Да
          </Button>
          <Button onClick={() => setDeleteOpen(false)}>Не</Button>
        </DialogActions>
      </Dialog>
    </Modal>
  )
}
