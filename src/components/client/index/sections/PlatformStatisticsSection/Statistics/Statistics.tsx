import React from 'react'
import { useTranslation } from 'next-i18next'

import { fromMoney } from 'common/util/money'
import { useCampaignDonationHistory, useCampaignList } from 'common/hooks/campaigns'
import { getTotalDonatedMoney, useDonatedUsersCount } from 'common/hooks/donation'
import { toNumberWithSpacesBetween } from 'common/util/number'

import {
  SectionDivider,
  StatisticsSectionWrapper,
  StatisticsWrapper,
  SubtitleSectionNumber,
  SubtitleSectionText,
} from './Statistics.styled'

export default function Statistics() {
  const { t } = useTranslation('index')
  const { data: campaigns } = useCampaignList()
  const { data: totalDonations } = useCampaignDonationHistory()
  const { data: donorsCount } = useDonatedUsersCount()
  const { data: totalDonatedMoney } = getTotalDonatedMoney()

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
    {
      value: fromMoney(totalDonatedMoney?.total ?? 0),
      message: t('platform-statistics.donated-leva'),
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
          <SectionDivider />
        </React.Fragment>
      ))}
    </StatisticsSectionWrapper>
  )
}
