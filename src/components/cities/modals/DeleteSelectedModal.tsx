import Modal from '@mui/material/Modal'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'

function DeleteSelectedModal({
  isOpen,
  handleDeleteModalClose,
  handleDelete,
}: {
  isOpen: boolean
  handleDeleteModalClose: () => void
  handleDelete: () => void
}) {
  return (
    <Modal open={isOpen} onClose={handleDeleteModalClose}>
      <Dialog open={isOpen} onClose={handleDeleteModalClose}>
        <DialogTitle>Искате ли да изтриете избраните градове?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            Да
          </Button>
          <Button onClick={handleDeleteModalClose}>Не</Button>
        </DialogActions>
      </Dialog>
    </Modal>
  )
}

export default DeleteSelectedModal
