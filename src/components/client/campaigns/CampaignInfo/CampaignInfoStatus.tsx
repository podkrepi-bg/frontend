import React from 'react'
import { CampaignResponse } from 'gql/campaigns'
import { useTranslation } from 'next-i18next'

import { bg, enUS } from 'date-fns/locale'
import { Box, Chip, Grid } from '@mui/material'

import { getExactDate } from 'common/util/date'

import { StatusText, StatusLabel, RowWrapper, InfoStatusWrapper } from './CampaignInfo.styled'

type Props = {
  campaign: CampaignResponse
  showExpensesLink: boolean
}

export default function CampaignInfoStatus({ campaign, showExpensesLink }: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language == 'bg' ? bg : enUS

  return (
    <Grid>
      <Box component="span" display="flex" alignItems="center" sx={{ gap: '5px' }}>
        {showExpensesLink && (
          <Chip
            component="a"
            label={t('campaigns:campaign.financial-report')}
            href="#expenses"
            clickable
            variant="outlined"
            color="primary"
            size="small"
          />
        )}
        <Chip
          component="a"
          label={t('campaigns:campaign.news')}
          href="#news"
          clickable
          color="primary"
          variant="outlined"
          size="small"
        />

        <Chip
          component="a"
          label={t('campaigns:campaign.wishes')}
          href="#wishes"
          clickable
          variant="outlined"
          color="primary"
          size="small"
        />
      </Box>
      <InfoStatusWrapper>
        <Grid item xs={12} md={6}>
          <StatusLabel>{campaign.campaignType.name}</StatusLabel>
          <RowWrapper>
            <StatusLabel variant="body2">{t('campaigns:campaign.status')}</StatusLabel>
            <StatusText>{t(`campaigns:campaign-status.${campaign.state}`)}</StatusText>
          </RowWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <RowWrapper>
            <StatusLabel>{t('campaigns:campaign.start-date')}</StatusLabel>
            <StatusText>{getExactDate(campaign.startDate, locale)}</StatusText>
          </RowWrapper>
          <RowWrapper>
            <StatusLabel> {t('campaigns:campaign.end-date')}</StatusLabel>
            <StatusText>
              {campaign.endDate
                ? getExactDate(campaign.endDate, locale)
                : t('campaigns:campaign.indefinite')}
            </StatusText>
          </RowWrapper>
        </Grid>
      </InfoStatusWrapper>
    </Grid>
  )
}
