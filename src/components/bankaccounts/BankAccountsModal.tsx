import { ModalStore } from 'stores/cars/ModalStore'
import Modal from '@mui/material/Modal'
import { observer } from 'mobx-react'
export default observer(function BankAccountsModal({ children }: any) {
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
        {children}
      </Modal>
    </div>
  )
})
