import Modal from '@mui/material/Modal'
import BasicCard from './Details'
import { ModalStore } from 'stores/cars/ModalStore'
import { observer } from 'mobx-react'
export default observer(function BasicModal() {
  const { isModalOpen, closeModal } = ModalStore
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => {
          closeModal()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <BasicCard></BasicCard>
      </Modal>
    </div>
  )
})
