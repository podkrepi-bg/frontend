import React from 'react'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

type Props = {
  modalStore: ModalStoreImpl
  deleteHandler: () => void
}

export default observer(function DeleteModal({ modalStore, deleteHandler }: Props) {
  const { isDeleteAllOpen, hideDeleteAll, selectedIdsToDelete } = modalStore
  const { t } = useTranslation('admin')

  return (
    <Dialog open={isDeleteAllOpen} onClose={hideDeleteAll}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('modals.delete-all.title')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('modals.delete-all.content')} ({selectedIdsToDelete.length})!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              {t('cta.submit')}
            </Button>
            <Button onClick={hideDeleteAll}>{t('cta.cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
