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

import { ModalStore } from '../../../../stores/dashboard/ModalStore'

type Props = {
  modalProps: {
    title: string
    slug: string
    description: string
    targetAmount: number
    startDate: string
    endDate: string
    essence: string
    campaignTypeId: string
    beneficiaryId: string
    coordinatorId: string
    currency: string
  }
}

export default observer(function DetailsModal({ modalProps }: Props) {
  const {
    title,
    slug,
    description,
    targetAmount,
    startDate,
    endDate,
    essence,
    campaignTypeId,
    beneficiaryId,
    coordinatorId,
    currency,
  } = modalProps
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails}>
      <Card>
        <CardContent>
          <Typography variant="h5" align="center">
            {t('Детайли на кампанията')}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('Заглавие')}: {title}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Слъг: {slug}
          </Typography>
          {/* <Typography variant="body1" sx={{ fontSize: 24 }}>
            Описание: {description}
          </Typography> */}
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Целева сума: {targetAmount}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Стартова дата: {startDate}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Крайна Дата: {endDate}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Същество: {essence}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Тип на кампанията: {campaignTypeId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Бенефициент: {beneficiaryId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Кординатор: {coordinatorId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Валута: {currency}
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
