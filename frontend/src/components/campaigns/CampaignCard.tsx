import React from 'react'
import { useTranslation } from 'next-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import { Campaign } from 'gql/campaigns'
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
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  media: {
    backgroundSize: 'contain',
    filter: 'grayscale(1)',
    height: 250,
    margin: theme.spacing(0, 4),
    opacity: 0.2,
    transition: 'filter 0.3s, opacity 0.8s',

    '&:hover': {
      filter: 'grayscale(0)',
      opacity: 1,
    },
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
}))

type Props = { campaign: Campaign }
export default function CampaignCard({ campaign }: Props) {
  const classes = useStyles()
  const { t } = useTranslation()
  const amounts = [20, 50, 100]

  const [alignment, setAlignment] = React.useState<string | null>('left')
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment)
  }

  return (
    <Card variant="outlined">
      <CardActionArea>
        <Link href={routes.campaigns.viewCampaignBySlug(campaign.slug)}>
          <CardMedia
            className={classes.media}
            image="/podkrepi-icon.svg"
            title="campaign image placeholder"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {campaign.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {campaign.excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Grid container justify="space-around">
          <Box p={2} width={1}>
            <CampaignProgress raised="1,000" goal="20,000" percentage={Math.random() * 100} />
          </Box>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Box p={2}>
              <LinkButton
                href={routes.campaigns.viewCampaignBySlug(campaign.slug)}
                fullWidth
                size="small"
                color="primary"
                variant="contained"
                startIcon={<FavoriteIcon />}>
                {t('campaigns:cta.donate')}
              </LinkButton>
            </Box>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
