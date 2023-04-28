import React from 'react'
import { useTranslation } from 'next-i18next'

import { fromMoney } from 'common/util/money'
import { useCampaignDonationHistory, useCampaignList } from 'common/hooks/campaigns'
import { getTotalDonatedMoney, useDonatedUsersCount } from 'common/hooks/donation'
import {
  SectionDivider,
  StatisticsSectionWrapper,
  SubtitleSectionNumber,
  SubtitleSectionText,
} from './StatisticsSection.styled'
import { toNumberWithSpacesBetween } from 'common/util/number'

export default function StatisticsSection() {
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
          <SubtitleSectionNumber variant="subtitle1">
            {toNumberWithSpacesBetween(section.value)}+
          </SubtitleSectionNumber>
          <SubtitleSectionText variant="subtitle1">{section.message}</SubtitleSectionText>
          <SectionDivider />
        </React.Fragment>
      ))}
    </StatisticsSectionWrapper>
  )
}
