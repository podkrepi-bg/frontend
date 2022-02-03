import { ModalStore } from 'stores/cars/ModalStore'
import Modal from '@mui/material/Modal'
import { observer } from 'mobx-react'
import BasicCard from './Details'
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
