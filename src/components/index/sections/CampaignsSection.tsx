import { Grid, Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import CampaignCard from 'components/campaigns/CampaignCard'
import LinkButton from 'components/common/LinkButton'
import { useCampaignList } from 'common/hooks/campaigns'
import { routes } from 'common/routes'

import Heading from 'components/common/Heading'
import { CampaignResponse } from 'gql/campaigns'

const PREFIX = 'CampaignsSection'

const classes = {
  heading: `${PREFIX}-heading`,
  container: `${PREFIX}-container`,
  graphic: `${PREFIX}-graphic`,
}

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.heading}`]: {
    paddingBottom: theme.spacing(7),
    color: theme.palette.common.black,
    textAlign: 'center',
    fontWeight: 500,

    [theme.breakpoints.up('lg')]: {
      fontSize: theme.spacing(6),
    },
  },

  [`& .${classes.container}`]: {
    marginBottom: theme.spacing(12),
    textAlign: 'center',
  },

  [`& .${classes.graphic}`]: {
    marginTop: theme.spacing(5),
  },
}))

const cardAlignment = (index: number, array: CampaignResponse[]) => {
  if (index === array.length - 1 && array.length % 2 === 1) {
    return 'center'
  }
  if (index % 2 === 0) {
    return 'right'
  } else {
    return 'left'
  }
}

export default function CampaignsSection() {
  const { data } = useCampaignList()
  const { t } = useTranslation()

  if (data === undefined) {
    return null
  } else {
    return (
      <StyledContainer maxWidth="lg">
        <Heading id="what-we-do" variant="h3" component="h2" className={classes.heading}>
          {t('index:campaign.urgent-campaigns')}
        </Heading>
        <Grid container justifyContent="center" spacing={2}>
          {data?.slice(0, 4).map((campaign, index, array) => (
            <Grid key={index} item xs={12} sm={6} lg={3}>
              <Box
                sx={(theme) => ({
                  textAlign: 'center',
                  [theme.breakpoints.down('lg')]: { textAlign: cardAlignment(index, array) },
                  [theme.breakpoints.down('md')]: { textAlign: 'center' },
                })}>
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
