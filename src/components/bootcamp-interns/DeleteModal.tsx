import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import { Modal } from '@mui/material'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'
import { useContext } from 'react'
import { DrawerContext } from 'context/DrawerContext'

export default function DeleteModal(props: any) {
  const { setNotificationMessage, setNotificationsOpen }: any = useContext(DrawerContext)

  const { deleteData, deleteOpen, setDeleteOpen } = props.modalProps
  const router = useRouter()

  const handleDelete = async () => {
    await axios.delete(endpoints.bootcampIntern.listBootcampIntern.url + '/' + deleteData.id)
    setNotificationsOpen(true)
    setNotificationMessage('Sucessfully deleted ' + deleteData.email)
    setDeleteOpen(false)
    router.push(routes.bootcampIntern.index)
  }

  return (
    <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>{deleteData.dialogTitle}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  )
}
