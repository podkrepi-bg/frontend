import { useTranslation } from 'next-i18next'

import { Grid, Box } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import CampaignCard from 'components/campaigns/CampaignCard'
import { useCampaignList } from 'common/hooks/campaigns'
import { routes } from 'common/routes'
import { shuffleArray } from 'common/util/shuffle'

import { OutlinedButton } from '../../IndexPage.styled'
import { Root, UrgentCampaignsHeading } from './CampaignsSection.styled'

export default function CampaignsSection() {
  const { data } = useCampaignList()
  const { t } = useTranslation('index')

  if (data === undefined) {
    return null
  } else {
    // NOTE: this sorts the campaigns so that each gets its fair chance to be on top row
    // TODO: add filters&sorting of campaigns so people can select based on personal preferences
    shuffleArray(data)

    return (
      <Root>
        <UrgentCampaignsHeading variant="h3">
          {t('campaign.urgent-campaigns')}
        </UrgentCampaignsHeading>
        <Grid container justifyContent="center" spacing={4}>
          {data?.slice(0, 12).map((campaign, index) => (
            <Grid key={index} item xs={12} sm={6} lg={3}>
              <Box>
                <CampaignCard campaign={campaign} />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid textAlign="center">
          <OutlinedButton
            href={routes.campaigns.index}
            variant="outlined"
            endIcon={<ChevronRightIcon />}>
            {t('campaign.see-all')}
          </OutlinedButton>
        </Grid>
      </Root>
    )
  }
}
