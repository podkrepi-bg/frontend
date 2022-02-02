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
  const isArray = Array.isArray(deleteData)
  const hasSelectedMultipleRows = isArray && deleteData.length > 1

  let dialogTitle

  if (deleteData?.dialogTitle) {
    dialogTitle = deleteData.dialogTitle
  } else {
    dialogTitle = 'Are you sure you want to delete the selected '
    if (hasSelectedMultipleRows) {
      dialogTitle += 'rows'
    } else {
      dialogTitle += 'row'
    }
  }

  const router = useRouter()

  const handleDelete = async () => {
    if (deleteData.id) {
      await axios.delete(endpoints.bootcampIntern.listBootcampIntern.url + '/' + deleteData.id)
      setNotificationsOpen(true)
      setNotificationMessage(
        deleteData.email
          ? `Sucessfully deleted ${deleteData.email}`
          : 'Sucessfully deleted the selected row.',
      )
      setDeleteOpen(false)
      router.push(routes.bootcampIntern.index)
      return
    }

    if (hasSelectedMultipleRows) {
      deleteData.map(async (id: string) => {
        await axios.delete(
          `http://localhost:5010/api${endpoints.bootcampIntern.listBootcampIntern.url}/${id}`,
        )
        setNotificationsOpen(true)
        setNotificationMessage(`Sucessfully deleted ${deleteData.length} rows.`)
        setDeleteOpen(false)

        router.push(routes.bootcampIntern.index)
      })
    } else {
      console.log(deleteData[0])
      await axios.delete(endpoints.bootcampIntern.listBootcampIntern.url + '/' + deleteData[0])
      setNotificationsOpen(true)
      setNotificationMessage(
        deleteData.email
          ? `Sucessfully deleted ${deleteData.email}`
          : 'Sucessfully deleted the selected row.',
      )
      setDeleteOpen(false)
      router.push(routes.bootcampIntern.index)
    }
  }

  return (
    <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
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
