import { Grid, Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import CampaignCard from 'components/campaigns/CampaignCard'
import LinkButton from 'components/common/LinkButton'
import { useCampaignList } from 'common/hooks/campaigns'
import { routes } from 'common/routes'

import Heading from 'components/common/Heading'

const PREFIX = 'CampaignsSection'

const classes = {
  heading: `${PREFIX}-heading`,
  container: `${PREFIX}-container`,
  graphic: `${PREFIX}-graphic`,
}

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.heading}`]: {
    paddingBottom: theme.spacing(7),
    color: theme.palette.primary.dark,
    textAlign: 'center',
  },

  [`& .${classes.container}`]: {
    marginBottom: theme.spacing(12),
    textAlign: 'center',
  },

  [`& .${classes.graphic}`]: {
    marginTop: theme.spacing(5),
  },
}))

export default function CampaignsSection() {
  const { data } = useCampaignList()
  const { t } = useTranslation()

  if (data === undefined) {
    return null
  } else {
    return (
      <StyledContainer maxWidth="lg">
        <Heading id="what-we-do" variant="h4" component="h2" className={classes.heading}>
          {t('index:campaign.emergency-causes')}
        </Heading>
        <Grid container justifyContent="center" spacing={2}>
          {data?.slice(0, 3).map((campaign, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4}>
              <Box textAlign="center">
                <CampaignCard campaign={campaign} />
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} textAlign="center">
            <LinkButton
              href={routes.campaigns.index}
              variant="outlined"
              color="primary"
              endIcon={<ChevronRightIcon />}
              sx={{ marginTop: '2rem' }}>
              {t('index:campaign.see-all')}
            </LinkButton>
          </Grid>
        </Grid>
      </StyledContainer>
    )
  }
}
