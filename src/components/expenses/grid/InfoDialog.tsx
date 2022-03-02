import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'next-i18next'

import { ExpenseResponse } from 'gql/expenses'

const useStyles = makeStyles({
  infoBtn: {
    margin: '0 auto',
  },
})

type Props = {
  open: boolean
  closeFn: () => void
  expense: ExpenseResponse | undefined
}

const InfoDialog = ({ open, closeFn, expense }: Props) => {
  const { t } = useTranslation('expenses')
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={closeFn} maxWidth="xs">
      <DialogTitle>{t('headings.info')}</DialogTitle>
      <DialogContent>
        <p>
          <b>Id:</b> {expense?.id}
        </p>
        <p>
          <b>{t('fields.type')}:</b> {expense?.type}
        </p>
        <p>
          <b>{t('fields.status')}:</b> {expense?.status}
        </p>
        <p>
          <b>{t('fields.currency')}:</b> {expense?.currency}
        </p>
        <p>
          <b>{t('fields.amount')}:</b> {expense?.amount}
        </p>
        <p>
          <b>{t('fields.vaultId')}:</b> {expense?.vaultId}
        </p>
        <p>
          <b>{t('fields.deleted')}:</b> {expense?.deleted.toString()}
        </p>
        <p>
          <b>{t('fields.description')}:</b> {expense?.description}
        </p>
        <p>
          <b>{t('fields.documentId')}:</b> {expense?.documentId}
        </p>
        <p>
          <b>{t('fields.approvedById')}:</b> {expense?.approvedById}
        </p>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" className={classes.infoBtn} onClick={closeFn}>
          {t('btns.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InfoDialog
