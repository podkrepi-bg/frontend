import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import { Modal } from '@mui/material'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

export default function DeleteModal(props: any) {
  const { deleteData, dialogTitle, deleteOpen, setDeleteOpen } = props.modalProps
  const router = useRouter()

  const handleDelete = async () => {
    await axios.delete(endpoints.bootcampIntern.listBootcampIntern.url + '/' + deleteData.id)
    setDeleteOpen(false)
    router.push(routes.bootcampIntern.index)
  }

  return (
    <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>{deleteData.dialogTitle}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  )
}
