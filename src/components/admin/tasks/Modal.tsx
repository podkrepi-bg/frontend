import { ModalContext } from 'context/ModalContext'
import * as React from 'react'
import Modal from '@mui/material/Modal'
import BasicCard from './Details'
export default function BasicModal() {
  const { open, setOpen }: any = React.useContext(ModalContext)
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <BasicCard></BasicCard>
      </Modal>
    </div>
  )
}
