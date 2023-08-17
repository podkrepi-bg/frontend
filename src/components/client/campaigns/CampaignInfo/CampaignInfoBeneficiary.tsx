import React from 'react'
import { CampaignResponse } from 'gql/campaigns'
import { useTranslation } from 'next-i18next'

import { Grid, Stack, Typography } from '@mui/material'

import { beneficiaryCampaignPictureUrl } from 'common/util/campaignImageUrls'
import { BeneficiaryType } from 'components/admin/beneficiary/BeneficiaryTypes'

import { Avatar, Label } from './CampaignInfo.styled'

type Props = {
  campaign: CampaignResponse
}

export default function CampaignInfoBeneficiary({ campaign }: Props) {
  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign)
  const { t } = useTranslation('campaigns')

  return (
    <Grid container gap={3}>
      <Avatar
        src={beneficiaryAvatarSource}
        alt={`${t('campaign.image-of')} ${campaign.beneficiary?.person.firstName} ${
          campaign.beneficiary?.person.lastName
        }`}
        width={100}
        height={100}
      />
      <Stack direction="column">
        <Label variant="body2">{t('campaign.beneficiary.label')}</Label>
        <Typography variant="subtitle2" component="p">
          {campaign.beneficiary.type === BeneficiaryType.individual
            ? campaign.beneficiary.person?.firstName + ' ' + campaign.beneficiary.person?.lastName
            : campaign.beneficiary.company.companyName}
        </Typography>
      </Stack>
    </Grid>
  )
}
