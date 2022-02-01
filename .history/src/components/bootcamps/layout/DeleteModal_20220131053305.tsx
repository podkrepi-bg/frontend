import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import { Modal } from '@mui/material'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

export default function DeleteModal(props: any) {
  const { deleteData, deleteOpen, setDeleteOpen } = props.modalProps
  const router = useRouter()

  const handleDelete = async () => {
    await axios.delete(endpoints.bootcamp.deleteBootcamp(deleteData.id).url)
    setDeleteOpen(false)
    router.push(routes.bootcamps.home)
  }

  return (
    <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>{deleteData.dialogTitle}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
          <Button onClick={() => setDeleteOpen(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </Modal>
  )
}
