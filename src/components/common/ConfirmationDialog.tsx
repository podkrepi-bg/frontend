import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import theme from 'common/theme'

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
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <IconButton onClick={handleCancel} sx={{ marginRight: theme.spacing(1) }}>
        <CloseIcon />
      </IconButton>
    </Box>
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
