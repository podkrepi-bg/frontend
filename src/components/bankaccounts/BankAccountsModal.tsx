import { JSXElementConstructor, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { ModalStore } from 'stores/cars/ModalStore'
import Modal from '@mui/material/Modal'
type Props = {
  children: ReactElement<any, string | JSXElementConstructor<any>>
}

export default observer(function BankAccountsModal({ children }: Props) {
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
