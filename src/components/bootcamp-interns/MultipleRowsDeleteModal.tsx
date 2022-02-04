import React, { useContext } from 'react'
import { Dialog, DialogTitle, DialogActions, Button, Modal } from '@mui/material'

import { DrawerContext } from 'context/SwipeableDrawerContext'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import router from 'next/router'
import { routes } from 'common/routes'

type Props = {
  modalProps: {
    deleteData: string[]
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
    deleteOpen: boolean
  }
}

export default function MultipleRowsDeleteModal({
  modalProps: { deleteData, setDeleteOpen, deleteOpen },
}: Props) {
  const { setNotificationMessage, setNotificationsOpen }: any = useContext(DrawerContext)
  const hasSelectedMultipleRows = deleteData?.length > 1
  console.log(deleteData)

  const handleDelete = async () => {
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
      await axios.delete(endpoints.bootcampIntern.listBootcampIntern.url + '/' + deleteData[0])
      setNotificationsOpen(true)
      setNotificationMessage(`Sucessfully deleted single row`)
      setDeleteOpen(false)
      router.push(routes.bootcampIntern.index)
    }
  }

  return (
    <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>
          Are you sure you want to delete the selected {hasSelectedMultipleRows ? 'rows' : 'row'}{' '}
        </DialogTitle>
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
