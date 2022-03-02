import React from 'react'
import { observer } from 'mobx-react'
import {
  Dialog,
  Card,
  CardContent,
  Typography,
  Divider,
  DialogActions,
  Button,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ModalStore } from 'stores/documents/ModalStore'

type Props = {
  modalProps: {
    name: string
    postalCode: string
  }
}

export default observer(function DetailsModal({ modalProps }: Props) {
  const { name, postalCode } = modalProps
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">
            {t('cities:cta:details')}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('cities:name')}: {name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Пощенски Код: {postalCode}
          </Typography>
        </CardContent>
      </Card>
      <DialogActions>
        <Button variant="contained" onClick={hideDetails}>
          Затвори
        </Button>
      </DialogActions>
    </Dialog>
  )
})
