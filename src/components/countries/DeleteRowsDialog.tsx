import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useTranslation } from 'next-i18next'

type Props = {
  open: boolean
  itemsCount: number
  closeFn: () => void
  deleteRows: () => void
}

const DeleteRowsDialog = ({ open, itemsCount, closeFn, deleteRows }: Props) => {
  const { t } = useTranslation('countries')

  return (
    <Dialog open={open} onClose={closeFn} maxWidth="xs">
      <DialogTitle>
        {t('alerts.delete-rows.question')} ({itemsCount}{' '}
        {itemsCount == 1 ? t('alerts.delete-rows.count') : t('alerts.delete-rows.counts')})?
      </DialogTitle>
      <DialogActions>
        <Button variant="contained" color="secondary" fullWidth onClick={deleteRows}>
          {t('btns.confirm')}
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={closeFn}>
          {t('btns.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteRowsDialog
