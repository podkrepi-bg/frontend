import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export type ConfirmationDialogRef = HTMLDialogElement
export interface ConfirmationDialogProps {
  isOpen: boolean
  handleConfirm: () => void
  handleCancel: () => void
  title: string
  content: string
  confirmButtonLabel: string
  cancelButtonLabel: string
}

const ConfirmationDialog = ({
  isOpen,
  handleConfirm,
  handleCancel,
  title,
  content,
  confirmButtonLabel,
  cancelButtonLabel,
}: ConfirmationDialogProps) => (
  <Dialog
    open={isOpen}
    onClose={handleCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleConfirm} color="primary">
        {confirmButtonLabel}
      </Button>
      <Button onClick={handleCancel} color="secondary">
        {cancelButtonLabel}
      </Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmationDialog
