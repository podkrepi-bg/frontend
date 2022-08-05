import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'
import { moneyPublic } from 'common/util/money'
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
import Image from 'next/image'

const PREFIX = 'CampaignCard'

const classes = {
  media: `${PREFIX}-media`,
  cardActions: `${PREFIX}-cardActions`,
  cardWrapper: `${PREFIX}-cardWrapper`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  progressBar: `${PREFIX}-progressBar`,
  cardContent: `${PREFIX}-cardContent`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`& .${classes.media}`]: {
    backgroundSize: 'contain',
    height: 200,
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
    [theme.breakpoints.down('lg')]: {
      width: '70%',
      display: 'inline-block',
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '400px',
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '300px',
      width: '100%',
    },
  },

  [`& .${classes.campaignTitle}`]: {
    fontWeight: '500',
    textAlign: 'left',
  },

  [`& .${classes.progressBar}`]: {
    margin: theme.spacing(2.5),
    textAlign: 'left',
    minHeight: theme.spacing(5),
  },

  [`& .${classes.cardContent}`]: {
    minHeight: theme.spacing(32),
    maxHeight: theme.spacing(32),
    [theme.breakpoints.down('md')]: {
      minHeight: theme.spacing(25),
      maxHeight: theme.spacing(25),
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: 'fit-content',
    },
  },
}))

type Props = { campaign: CampaignResponse }

export default function CampaignCard({ campaign }: Props) {
  const { t } = useTranslation()
  const target = campaign.targetAmount
  const summary = campaign.summary.find(() => true)
  const pictureUrl = campaignListPictureUrl(campaign)
  const reached = summary ? summary.reachedAmount : 0
  const currency = campaign.currency

  return (
    <StyledCard variant="outlined" className={classes.cardWrapper}>
      <CardActionArea href={routes.campaigns.viewCampaignBySlug(campaign.slug)}>
        <CardMedia className={classes.media} title={campaign.title}>
          <div
            style={{ position: 'relative', width: '100%', minHeight: '100%', maxHeight: '100%' }}>
            <Image src={pictureUrl} layout="fill" objectFit="contain" />
          </div>
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" className={classes.campaignTitle}>
            {campaign.title}
          </Typography>
          {/* Campaign subtext is currently not needed */}
          {/* <Typography textAlign={'left'} variant="body2" color="textSecondary" component="p">
            {campaign.essence}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Grid container justifyContent="space-around">
          <Box p={2} width={1}>
            <CampaignProgress raised={reached} target={target} />
          </Box>
          <Typography variant="body1" component="p" className={classes.progressBar}>
            {t('campaigns:campaign.reached')} <b>{moneyPublic(reached, currency)}</b>{' '}
            {t('campaigns:campaign.from')} {t('campaigns:campaign.target')}{' '}
            <b>{moneyPublic(target, currency)}</b>
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
