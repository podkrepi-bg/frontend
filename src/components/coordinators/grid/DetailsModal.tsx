import { observer } from 'mobx-react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'next-i18next'

import { ModalStore } from 'stores/dashboard/ModalStore'

const useStyles = makeStyles({
  infoBtn: {
    margin: '0 auto',
  },
})

export default observer(function DetailsModal() {
  const { isDetailsOpen, hideDetails, selectedRecord } = ModalStore
  const { t } = useTranslation('coordinator')
  const classes = useStyles()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} maxWidth="xs" disableScrollLock>
      <DialogTitle>{t('headings.info')}</DialogTitle>
      <DialogContent>
        <p>
          <b>Id:</b> {selectedRecord?.id}
        </p>
        <p>
          <b>{t('fields.name')}:</b> {selectedRecord?.name}
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.infoBtn}
          onClick={hideDetails}>
          {t('btns.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
})
