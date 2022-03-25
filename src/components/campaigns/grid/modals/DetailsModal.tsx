import React from 'react'
import {
  Dialog,
  Card,
  CardContent,
  Typography,
  Divider,
  DialogActions,
  Button,
  DialogTitle,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CampaignResponse } from 'gql/campaigns'

type Props = {
  campaign: CampaignResponse
  onClose: () => void
}

export default function DetailsModal({ campaign, onClose }: Props) {
  const { t } = useTranslation()

  return (
    <Dialog open scroll="body" onClose={onClose}>
      <DialogTitle>{t('Детайли на кампанията')}</DialogTitle>
      <Card>
        <Divider />
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body1">
            {t('Заглавие')}: {campaign.title}
          </Typography>
          <Typography variant="body1">Слъг: {campaign.slug}</Typography>
          <Typography variant="body1">Целева сума: {campaign.targetAmount}</Typography>
          <Typography variant="body1">Стартова дата: {campaign.startDate}</Typography>
          <Typography variant="body1">Крайна Дата: {campaign.endDate}</Typography>
          <Typography variant="body1">Същество: {campaign.essence}</Typography>
          <Typography variant="body1">Тип на кампанията: {campaign.campaignTypeId}</Typography>
          <Typography variant="body1">Бенефициент: {campaign.beneficiaryId}</Typography>
          <Typography variant="body1">Кординатор: {campaign.coordinatorId}</Typography>
          <Typography variant="body1">Валута: {campaign.currency}</Typography>
          <Typography variant="body1">
            Описание: {campaign.description}
            {campaign.description}
            {campaign.description}
            {campaign.description}
          </Typography>
        </CardContent>
      </Card>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Затвори
        </Button>
      </DialogActions>
    </Dialog>
  )
}
