import React from 'react'
import { useTranslation } from 'next-i18next'
import { Divider, Grid } from '@mui/material'

import { fromMoney } from 'common/util/money'
import { getAllDonatedMoney } from 'common/hooks/vaults'
import { useCampaignDonationHistory, useCampaignList } from 'common/hooks/campaigns'
import { useDonatedUsersCount } from 'common/hooks/donation'
import { SubtitleSectionNumber, SubtitleSectionText } from './StatisticsSection.styled'
import { toNumberWithSpacesBetween } from 'common/util/number'

export default function StatisticsSection() {
  const { t } = useTranslation('index')
  const { data: campaigns } = useCampaignList()
  const { data: totalDonations } = useCampaignDonationHistory()
  const { data: donatedUsers } = useDonatedUsersCount()
  const { data: donatedMoney } = getAllDonatedMoney()

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
      value: donatedUsers?.count,
      message: t('platform-statistics.donated-users'),
    },
    {
      value: fromMoney(donatedMoney?.total ?? 0),
      message: t('platform-statistics.donated-leva'),
    },
  ]

  return (
    <Grid>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <SubtitleSectionNumber variant="subtitle1">
            {toNumberWithSpacesBetween(section.value)}+
          </SubtitleSectionNumber>
          <SubtitleSectionText variant="subtitle1">{section.message}</SubtitleSectionText>
          <Divider />
        </React.Fragment>
      ))}
    </Grid>
  )
}
