import React from 'react'
import { CampaignResponse } from 'gql/campaigns'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { Grid, Stack, Typography } from '@mui/material'

import { beneficiaryCampaignPictureUrl } from 'common/util/campaignImageUrls'
import theme from 'common/theme'
import { BeneficiaryType } from 'components/admin/beneficiary/BeneficiaryTypes'

type Props = {
  campaign: CampaignResponse
}

export default function CampaignInfoBeneficiary({ campaign }: Props) {
  const beneficiaryAvatarSource = beneficiaryCampaignPictureUrl(campaign)
  const { t } = useTranslation('campaigns')

  return (
    <Grid container gap={3}>
      <Image
        src={beneficiaryAvatarSource}
        alt={`${t('campaign.image-of')} ${campaign.beneficiary?.person.firstName} ${
          campaign.beneficiary?.person.lastName
        }`}
        width={100}
        height={100}
      />
      <Stack direction="column">
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ fontWeight: 600, fontSize: theme.spacing(1.6) }}>
          {t('campaign.beneficiary.label')}
        </Typography>
        <Typography variant="subtitle2" component="p">
          {campaign.beneficiary.type === BeneficiaryType.individual
            ? campaign.beneficiary.person?.firstName + ' ' + campaign.beneficiary.person?.lastName
            : campaign.beneficiary.company.companyName}
        </Typography>
      </Stack>
    </Grid>
  )
}
