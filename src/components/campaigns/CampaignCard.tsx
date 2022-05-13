import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'
import { money } from 'common/util/money'
import LinkButton from 'components/common/LinkButton'
import { CampaignResponse } from 'gql/campaigns'
import CampaignProgress from './CampaignProgress'
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Link,
} from '@mui/material'
import { Favorite } from '@mui/icons-material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'

const PREFIX = 'CampaignCard'

const classes = {
  media: `${PREFIX}-media`,
  donate: `${PREFIX}-donate`,
  cardActions: `${PREFIX}-cardActions`,
  cardWrapper: `${PREFIX}-cardWrapper`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  progressBar: `${PREFIX}-progressBar`,
  cardContent: `${PREFIX}-cardContent`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`& .${classes.media}`]: {
    backgroundSize: 'contain',
    height: 250,
    margin: theme.spacing(0, 4),
    transition: 'filter 0.3s, opacity 0.8s',
  },

  [`& .${classes.cardActions}`]: {
    padding: '0',
  },

  [`&.${classes.cardWrapper}`]: {
    position: 'relative',
    minHeight: theme.spacing(87),
    backgroundColor: theme.palette.secondary.light,
    border: 'none',
    borderRadius: 0,
  },

  [`& .${classes.campaignTitle}`]: {
    textTransform: 'capitalize',
  },

  [`& .${classes.progressBar}`]: {
    margin: theme.spacing(2.5),
    textAlign: 'left',
  },

  [`& .${classes.cardContent}`]: {
    minHeight: theme.spacing(25),
  },
}))

type Props = { campaign: CampaignResponse }
export default function CampaignCard({ campaign }: Props) {
  const { t } = useTranslation()

  const target = campaign.targetAmount
  const summary = campaign.summary.find(() => true)
  const pictureUrl = campaignListPictureUrl(campaign)
  const reached = summary ? summary.reachedAmount : 0

  return (
    <StyledCard variant="outlined" className={classes.cardWrapper}>
      <CardActionArea>
        <Link href={routes.campaigns.viewCampaignBySlug(campaign.slug)}>
          <CardMedia
            className={classes.media}
            image={pictureUrl}
            title="campaign image placeholder"
          />
        </Link>
        <CardContent className={classes.cardContent}>
          <Typography textAlign={'left'} gutterBottom variant="h5" component="h2">
            {campaign.title}
          </Typography>
          <Typography textAlign={'left'} variant="body2" color="textSecondary" component="p">
            {campaign.essence}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Grid container justifyContent="space-around">
          <Box p={2} width={1}>
            <CampaignProgress raised={reached} target={target} />
          </Box>
          <Typography variant="subtitle1" component="p" className={classes.progressBar}>
            {t('campaigns:campaign.reached')} <b>{money(reached)}</b> /{' '}
            {t('campaigns:campaign.target')} <b>{money(target)}</b>
          </Typography>
          <Grid item xs={12}>
            <Box mx={2} mb={2}>
              <LinkButton
                fullWidth
                href={routes.campaigns.oneTimeDonation(campaign.slug)}
                variant="contained"
                color="secondary"
                endIcon={<Favorite color="error" />}>
                {t('campaigns:cta.support-now')}
              </LinkButton>
            </Box>
            <Box mx={2} mb={2}>
              <LinkButton
                fullWidth
                href={routes.campaigns.viewCampaignBySlug(campaign.slug)}
                variant="outlined"
                endIcon={<ArrowForwardIosIcon />}>
                {t('campaigns:cta.see-more')}
              </LinkButton>
            </Box>
          </Grid>
        </Grid>
      </CardActions>
    </StyledCard>
  )
}
