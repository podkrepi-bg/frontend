import React from 'react'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'
import { money } from 'common/util/money'
import LinkButton from 'components/common/LinkButton'
import { CampaignResponse } from 'gql/campaigns'
import CampaignProgress from './CampaignProgress'
import makeStyles from '@mui/styles/makeStyles'
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
import getConfig from 'next/config'

const useStyles = makeStyles((theme) => ({
  media: {
    backgroundSize: 'contain',
    // filter: 'grayscale(1)',
    height: 250,
    margin: theme.spacing(0, 4),
    // opacity: 0,
    transition: 'filter 0.3s, opacity 0.8s',
    // '&:hover': {
    //   filter: 'grayscale(0)',
    //   opacity: 1,
    // },
  },
  amountButtonGroup: {
    backgroundColor: '#e60550',
    border: '0',
    borderRadius: '0',
    width: '100%',
  },
  amountButton: {
    backgroundColor: '#e60550',
    border: '0',
    color: '#fff',
    width: '100%',
    /* stylelint-disable-next-line */
    '&.Mui-selected': {
      backgroundColor: '#e60550',
      border: '0',
      color: '#fff',
      '&:active': {
        backgroundColor: '#c40444',
      },
      '&:hover': {
        backgroundColor: '#c40444',
      },
      '&:focus': {
        backgroundColor: '#c40444',
      },
      '&:selected': {
        backgroundColor: '#c40444',
        color: '#fff',
      },
    },
  },
  donate: {
    backgroundColor: theme.palette.primary.main,
    border: '0',
    borderRadius: '0',
    boxShadow: '0 3px 2x 2px rgba(255, 105, 135, 0.3)',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    width: '100%',
    '&:hover svg': {
      transform: 'scale(1.5)',
      transition: 'all 0.2s ease-out-in',
    },
    svg: {
      transform: 'scale(1)',
      transition: 'all 0.2s ease-in-out',
    },
  },
  cardActions: {
    padding: '0',
  },
  cardWrapper: {
    position: 'relative',
    minHeight: theme.spacing(87),
    backgroundColor: theme.palette.grey[200],
    border: 'none',
    borderRadius: 0,
  },
  campaignTitle: {
    textTransform: 'capitalize',
  },
  supportNowButton: {
    padding: theme.spacing(1, 4),
  },
  seeMoreButton: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 4),
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      border: `2px solid ${theme.palette.primary.dark}`,
    },
  },
  progressBar: {
    margin: theme.spacing(2.5),
    textAlign: 'left',
  },
  cardContent: {
    minHeight: theme.spacing(25),
  },
}))

type Props = { campaign: CampaignResponse }
export default function CampaignCard({ campaign }: Props) {
  const classes = useStyles()
  const { t } = useTranslation()
  const { publicRuntimeConfig } = getConfig()
  //const amounts = [20, 50, 100]
  //const [alignment, setAlignment] = React.useState<string | null>('left')
  // const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
  //   setAlignment(newAlignment)
  // }
  const undefinedUrl = publicRuntimeConfig.API_URL + '/api/campaign-file/' + undefined

  const target = campaign.targetAmount
  const summary = campaign.summary.find(() => true)
  const pictureUrl =
    publicRuntimeConfig.API_URL +
    '/api/campaign-file/' +
    campaign.campaignFiles?.find((x) => x.role == 'campaignListPhoto')?.id
  const reached = summary ? summary.reachedAmount : 0

  return (
    <Card variant="outlined" className={classes.cardWrapper}>
      <CardActionArea>
        <Link href={routes.campaigns.viewCampaignBySlug(campaign.slug)}>
          <CardMedia
            className={classes.media}
            image={pictureUrl == undefinedUrl ? '/podkrepi-icon.svg' : pictureUrl}
            title="campaign image placeholder"
          />
        </Link>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.campaignTitle}>
            {campaign.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
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
          {/* <Grid item xs={12}>
            <ToggleButtonGroup
              exclusive
              value={alignment}
              onChange={handleAlignment}
              aria-label={alignment ?? undefined}>
              {amounts.map((amount, index) => {
                return (
                  <ToggleButton
                    key={index}
                    color="secondary"
                    value={amount.toString()}
                    aria-label={amount.toString() ?? undefined}>
                    {amount}
                  </ToggleButton>
                )
              })}
            </ToggleButtonGroup>
          </Grid> */}
          <Grid item xs={12}>
            <Box mx={2} mb={2}>
              <LinkButton
                fullWidth
                href={routes.campaigns.viewCampaignBySlug(campaign.slug)}
                variant="contained"
                color="secondary"
                className={classes.supportNowButton}
                endIcon={<Favorite color="error" />}>
                {t('campaigns:cta.support-now')}
              </LinkButton>
            </Box>
            <Box mx={2} mb={2}>
              <LinkButton
                fullWidth
                href={routes.campaigns.viewCampaignBySlug(campaign.slug)}
                variant="outlined"
                size="small"
                className={classes.seeMoreButton}
                endIcon={<ArrowForwardIosIcon />}>
                {t('campaigns:cta.see-more')}
              </LinkButton>
            </Box>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
