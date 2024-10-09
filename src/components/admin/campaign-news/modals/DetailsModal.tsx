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

import { getExactDateTime } from 'common/util/date'
import { AdminCampaignNewsResponse } from 'gql/campaign-news'

type Props = {
  article: AdminCampaignNewsResponse
  onClose: () => void
}

export default function DetailsModal({ article, onClose }: Props) {
  const { t } = useTranslation()

  return (
    <Dialog open scroll="body" onClose={onClose}>
      <DialogTitle>{t('Детайли на новината')}</DialogTitle>
      <Card>
        <Divider />
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body1">
            {t('Заглавие')}: {article.title}
          </Typography>
          <Typography variant="body1">Кратко наименование: {article.slug}</Typography>
          <Typography variant="body1">
            <Typography variant="body1">Автор: {article.author}</Typography>
            Създадена на: {getExactDateTime(article.createdAt)}
          </Typography>
          <Typography variant="body1">
            Публикувана на: {getExactDateTime(article.publishedAt)}
          </Typography>
          <Typography variant="body1">Кампания: {article.campaign.title}</Typography>
          <Typography variant="body1">Описание: {article.description}</Typography>
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
