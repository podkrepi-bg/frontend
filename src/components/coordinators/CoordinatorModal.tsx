import { JSXElementConstructor, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { ModalStore } from 'stores/dashboard/ModalStoreOld'
import Modal from '@mui/material/Modal'
type Props = {
  children: ReactElement<unknown, string | JSXElementConstructor<unknown>>
}

export default observer(function CoordinatorModal({ children }: Props) {
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
