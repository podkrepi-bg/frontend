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

import { AdminCampaignResponse } from 'gql/campaigns'
import { money } from 'common/util/money'
import { getExactDateTime } from 'common/util/date'

type Props = {
  campaign: AdminCampaignResponse
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
          <Typography variant="body1">
            Целева сума: {money(campaign.targetAmount, campaign.currency)}
          </Typography>
          <Typography variant="body1">
            Стартова дата: {getExactDateTime(campaign.startDate)}
          </Typography>
          <Typography variant="body1">Крайна Дата: {getExactDateTime(campaign.endDate)}</Typography>
          <Typography variant="body1">Същество: {campaign.essence}</Typography>
          <Typography variant="body1">Тип на кампанията: {campaign.campaignType.name}</Typography>
          <Typography variant="body1">
            Бенефициент: {campaign.beneficiary.person?.firstName}{' '}
            {campaign.beneficiary.person?.lastName}
          </Typography>
          <Typography variant="body1">
            Координатор: {campaign.coordinator.person.firstName}{' '}
            {campaign.coordinator.person.lastName}
          </Typography>
          <Typography variant="body1">
            Организатор: {campaign.organizer?.person.firstName || ''}{' '}
            {campaign.organizer?.person.lastName || ''}
          </Typography>
          <Typography variant="body1">Валута: {campaign.currency}</Typography>
          <Typography variant="body1">Описание: {campaign.description}</Typography>
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
