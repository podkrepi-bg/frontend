import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

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
