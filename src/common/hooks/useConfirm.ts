import { useState } from 'react'

export type ConfirmProps = {
  onConfirm?: () => void | Promise<void>
  onClose?: () => void | Promise<void>
}
export type ConfirmHookProps = {
  open: boolean
  loading: boolean
  openHandler: () => void
  confirmHandler: () => void
  closeHandler: () => void
}

const useConfirm = ({ onConfirm, onClose }: ConfirmProps): ConfirmHookProps => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  return {
    open,
    loading,
    openHandler: () => {
      setOpen(true)
    },
    confirmHandler: async () => {
      setOpen(false)
      if (typeof onConfirm === 'function') {
        setLoading(true)
        await onConfirm()
        setLoading(false)
      }
    },
    closeHandler: async () => {
      setOpen(false)
      if (typeof onClose === 'function') {
        setLoading(true)
        await onClose()
        setLoading(false)
      }
    },
  }
}

export default useConfirm
