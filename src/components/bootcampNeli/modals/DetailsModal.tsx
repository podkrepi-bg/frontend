import React from 'react'
import { observer } from 'mobx-react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'

import {
  Dialog,
  Card,
  CardContent,
  Typography,
  Divider,
  DialogActions,
  Button,
} from '@mui/material'

import { useBootcampNeli } from 'common/hooks/bookcampNeli'

import { ModalStore } from 'stores/bootcampNeli/ModalStore'

import { BootcampNeliResponse } from 'gql/bootcampNeli'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { data }: UseQueryResult<BootcampNeliResponse> = useBootcampNeli(String(id))
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">
            {t('bootcampNeli:cta:details')}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('bootcampNeli:first-name')}: {data?.firstName}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('bootcampNeli:last-name')}: {data?.lastName}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('bootcampNeli:email')}: {data?.email}
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
