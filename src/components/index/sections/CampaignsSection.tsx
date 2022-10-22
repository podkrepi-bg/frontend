import { Grid, Box } from '@mui/material'
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
  seeAll: `${PREFIX}-seeAll`,
}

const StyledContainer = styled('section')(({ theme }) => ({
  margin: theme.spacing(7, 3, 0, 3),

  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(12, 4, 0, 4),
  },

  [`& .${classes.heading}`]: {
    marginBottom: theme.spacing(6),
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

  [`& .${classes.seeAll}`]: {
    marginTop: theme.spacing(3),
    fontWeight: 'bold',
    color: theme.palette.common.black,

    [theme.breakpoints.up('sm')]: {
      minWidth: theme.spacing(35),
    },
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
      <StyledContainer>
        <Heading variant="h3" component="h2" className={classes.heading}>
          {t('index:campaign.urgent-campaigns')}
        </Heading>
        <Grid container justifyContent="center" spacing={4}>
          {data?.slice(0, 8).map((campaign, index, array) => (
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
              endIcon={<ChevronRightIcon />}
              className={classes.seeAll}>
              {t('index:campaign.see-all')}
            </LinkButton>
          </Grid>
        </Grid>
      </StyledContainer>
    )
  }
}
