import React from 'react'
import { CampaignResponse } from 'gql/campaigns'
import { useTranslation } from 'next-i18next'

import { bg, enUS } from 'date-fns/locale'
import { Grid } from '@mui/material'
import { Assessment } from '@mui/icons-material'

import { getExactDate } from 'common/util/date'

import {
  StatusText,
  StatusLabel,
  RowWrapper,
  InfoStatusWrapper,
  ExpensesButton,
} from './CampaignInfo.styled'

type Props = {
  campaign: CampaignResponse
  showExpensesLink: boolean
}

export default function CampaignInfo({ campaign, showExpensesLink }: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language == 'bg' ? bg : enUS

  return (
    <Grid>
      {showExpensesLink && (
        <ExpensesButton startIcon={<Assessment />} href={'#expenses'}>
          {t('campaigns:campaign.financial-report')}
        </ExpensesButton>
      )}
      <InfoStatusWrapper>
        <Grid>
          <StatusLabel>{campaign.campaignType.name}</StatusLabel>
          <RowWrapper>
            <StatusLabel variant="body2">{t('campaigns:campaign.status')}</StatusLabel>
            <StatusText>{t(`campaigns:campaign-status.${campaign.state}`)}</StatusText>
          </RowWrapper>
        </Grid>
        <Grid>
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
