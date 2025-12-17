import React from 'react'
import { useTranslation } from 'next-i18next'

import { fromMoney } from 'common/util/money'
import { useCampaignDonationHistory, useCampaignList } from 'common/hooks/campaigns'
import { getTotalDonatedMoney, useDonatedUsersCount } from 'common/hooks/donation'
import { toNumberWithSpacesBetween } from 'common/util/number'

import {
  Fraction,
  StatisticsSectionWrapper,
  StatisticsWrapper,
  SubtitleSectionNumber,
  SubtitleSectionText,
} from './Statistics.styled'
import { Stack, Divider } from '@mui/material'

export default function Statistics() {
  const { t } = useTranslation('index')
  const { data: campaigns } = useCampaignList(true)
  const { data: totalDonations } = useCampaignDonationHistory(undefined, 0, 1) //ask only for 1 item to get the total count
  const { data: donorsCount } = useDonatedUsersCount()
  const { data: totalDonatedMoney } = getTotalDonatedMoney()

  const donatedMoney = fromMoney(totalDonatedMoney?.total || 0)
  const unit = donatedMoney.toString().split('.')[0]
  const fraction = donatedMoney?.toFixed(2).toString().split('.')[1]

  const sections: { value?: number; message: string }[] = [
    {
      value: campaigns?.length,
      message: t('platform-statistics.campaigns'),
    },
    {
      value: totalDonations?.total,
      message: t('platform-statistics.donations'),
    },
    {
      value: donorsCount?.count,
      message: t('platform-statistics.donated-users'),
    },
  ]

  return (
    <StatisticsSectionWrapper>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <StatisticsWrapper>
            <SubtitleSectionNumber variant="subtitle1">
              {toNumberWithSpacesBetween(section.value)}
            </SubtitleSectionNumber>
            <SubtitleSectionText variant="subtitle1">{section.message}</SubtitleSectionText>
          </StatisticsWrapper>
          <Divider />
        </React.Fragment>
      ))}
      <StatisticsWrapper>
        <Stack flexDirection="row">
          <SubtitleSectionNumber variant="subtitle1">
            {toNumberWithSpacesBetween(unit)}
          </SubtitleSectionNumber>
          <Fraction>{fraction}</Fraction>
        </Stack>
        <SubtitleSectionText>{t('platform-statistics.donated-euros')}</SubtitleSectionText>
      </StatisticsWrapper>
      <Divider />
    </StatisticsSectionWrapper>
  )
}
