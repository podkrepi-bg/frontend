import { Dialog } from '@mui/material'
import React from 'react'
import { CreatePaymentStore } from '../store/BenevityImportStore'

export default function FileImportDialog() {
  const { isImportModalOpen, importType } = CreatePaymentStore
  return (
    <Dialog fullWidth open={isImportModalOpen && importType === 'file'}>
      FileImportDialog
    </Dialog>
  )
}
