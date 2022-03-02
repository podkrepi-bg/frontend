import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useTranslation } from 'next-i18next'

type Props = {
  open: boolean
  expenseName: string
  closeFn: () => void
  deleteRow: () => void
}

const DeleteRowDialog = ({ open, closeFn, expenseName, deleteRow }: Props) => {
  const { t } = useTranslation('expenses')

  return (
    <Dialog open={open} onClose={closeFn} maxWidth="xs">
      <DialogTitle>
        {t('alerts.delete-row.question')} ({expenseName})?
      </DialogTitle>
      <DialogActions>
        <Button variant="contained" color="secondary" fullWidth onClick={deleteRow}>
          {t('btns.confirm')}
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={closeFn}>
          {t('btns.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteRowDialog
