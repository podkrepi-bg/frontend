import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { useState } from 'react'
import { DialogStore } from 'stores/DialogStore'

function conf() {
  const [open, setOpen] = useState(true)
  const handleConfirm = () => {
    console.log('confirm')
  }
  const handleCancel = () => {
    console.log('cancel')
  }

  return (
    <div>
      <button>open</button>
      <ConfirmationDialog
        isOpen={open}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        title={'title'}
        content={'Content'}
        confirmButtonLabel={'confirmbuttonlabel'}
        cancelButtonLabel={'cancelButtonLabel'}
      />
    </div>
  )
}

export default conf
