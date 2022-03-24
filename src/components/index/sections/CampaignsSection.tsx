import { Grid, Box } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import CampaignCard from 'components/campaigns/CampaignCard'
import LinkButton from 'components/common/LinkButton'
import { useCampaignList } from 'common/hooks/campaigns'
import { routes } from 'common/routes'

export default function CampaignsSection() {
  const { data } = useCampaignList()
  const { t } = useTranslation()

  if (data === undefined) {
    return null
  } else {
    return (
      <Grid container justifyContent="center" spacing={2}>
        {data?.slice(0, 3).map((campaign, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <Box textAlign="center">
              <CampaignCard campaign={campaign} />
            </Box>
          </Grid>
        ))}
        <LinkButton
          href={routes.campaigns.index}
          variant="outlined"
          endIcon={<ChevronRightIcon />}
          sx={{ marginTop: '10%' }}>
          {t('index:campaign.see-all')}
        </LinkButton>
      </Grid>
    )
  }
}
