import React from 'react'
import { CampaignResponse } from 'gql/campaigns'
import { useTranslation } from 'next-i18next'

import { bg, enUS } from 'date-fns/locale'
import { Box, Chip, Grid2 } from '@mui/material'

import { getExactDate } from 'common/util/date'
import theme from 'common/theme'
import { routes } from 'common/routes'

import { StatusText, StatusLabel, RowWrapper, InfoStatusWrapper } from './CampaignInfo.styled'

type Props = {
  campaign: CampaignResponse
  showExpensesLink: boolean
}

export default function CampaignInfoStatus({ campaign, showExpensesLink }: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n?.language == 'bg' ? bg : enUS

  return (
    <Grid2>
      <Box
        component="span"
        sx={{
          display: 'flex',
          gap: theme.spacing(1),
          flexWrap: 'wrap',
          margin: theme.spacing(3, 0, 6),
          alignItems: 'center',
        }}>
        {showExpensesLink && (
          <Chip
            component="a"
            label={t('campaigns:campaign.financial-report')}
            href="#expenses"
            clickable
            size="small"
            sx={{ backgroundColor: theme.palette.primary.light }}
          />
        )}
        <Chip
          component="a"
          label={t('campaigns:campaign.news')}
          href="#news"
          clickable
          size="small"
          sx={{ backgroundColor: theme.palette.primary.light }}
        />
        <Chip
          component="a"
          label={t('campaigns:campaign.wishes')}
          href="#wishes"
          clickable
          size="small"
          sx={{ backgroundColor: theme.palette.primary.light }}
        />
        {!!campaign.summary.reachedAmount && (
          <Chip
            component="a"
            label={t('campaigns:statistics.button')}
            href={routes.campaigns.statistics.viewBySlug(campaign.slug)}
            clickable
            size="small"
            sx={{ backgroundColor: theme.palette.primary.light }}
          />
        )}
      </Box>
      <InfoStatusWrapper>
        <Grid2
          size={{
            xs: 12,
            md: 6
          }}>
          <StatusLabel>
            {t(`campaigns:campaignTypesFields.${campaign.campaignType.category}`)}
          </StatusLabel>
          <RowWrapper>
            <StatusLabel variant="body2">{t('campaigns:campaign.status')}</StatusLabel>
            <StatusText>{t(`campaigns:campaign-status.${campaign.state}`)}</StatusText>
          </RowWrapper>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 6
          }}>
          <RowWrapper>
            <StatusLabel>{t('campaigns:campaign.start-date')}</StatusLabel>
            <StatusText>{getExactDate(campaign.startDate, locale)}</StatusText>
          </RowWrapper>
          <RowWrapper>
            <StatusLabel> {t('campaigns:campaign.end-date')}</StatusLabel>
            <StatusText>
              {campaign.endDate
                ? getExactDate(campaign.endDate, locale)
                : t('campaigns:indefinite')}
            </StatusText>
          </RowWrapper>
        </Grid2>
      </InfoStatusWrapper>
    </Grid2>
  );
}
