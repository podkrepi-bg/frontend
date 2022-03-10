import React from 'react'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ModalStore } from 'stores/dashboard/ModalStore'

type Props = {
  deleteHandler: () => void
}

export default observer(function DeleteModal({ deleteHandler }: Props) {
  const { isDeleteOpen, hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation('admin')

  return (
    <Dialog open={isDeleteOpen} onClose={hideDelete}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('modals.delete.title')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('modals.delete.content')} <b>{selectedRecord.name}</b>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              {t('cta.confirm')}
            </Button>
            <Button onClick={hideDelete}>{t('cta.cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
