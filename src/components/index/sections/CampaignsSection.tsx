import { Grid, Box, Theme, Container } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import CampaignCard from 'components/campaigns/CampaignCard'
import LinkButton from 'components/common/LinkButton'
import { useCampaignList } from 'common/hooks/campaigns'
import { routes } from 'common/routes'

import Heading from 'components/common/Heading'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      paddingBottom: theme.spacing(7),
      color: theme.palette.primary.dark,
      fontFamily: 'Montserrat',
      textAlign: 'center',
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    graphic: {
      marginTop: theme.spacing(5),
    },
  }),
)

export default function CampaignsSection() {
  const { data } = useCampaignList()
  const { t } = useTranslation()
  const classes = useStyles()

  if (data === undefined) {
    return null
  } else {
    return (
      <Container maxWidth="md">
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
          <LinkButton
            href={routes.campaigns.index}
            variant="outlined"
            endIcon={<ChevronRightIcon />}
            sx={{ marginTop: '2rem' }}>
            {t('index:campaign.see-all')}
          </LinkButton>
        </Grid>
      </Container>
    )
  }
}
