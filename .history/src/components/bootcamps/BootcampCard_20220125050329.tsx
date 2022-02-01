import React from 'react'
import { useTranslation } from 'next-i18next'
import makeStyles from '@mui/styles/makeStyles'
import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import { BootcampResponse } from 'gql/bootcamps'

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
import { money } from 'common/util/money'

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

  bootcampTitle: {
    textTransform: 'capitalize',
  },

  cardButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
    marginBottom: theme.spacing(7),
    textAlign: 'left',
  },
}))

type Props = { bootcamp: BootcampResponse }
export default function BootcampCard({ bootcamp }: Props) {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Card variant="outlined" className={classes.cardWrapper}>
      <CardActionArea>
        <Link href={routes.bootcamps.view(bootcamp.id)}>
          <CardMedia
            className={classes.media}
            image="/podkrepi-icon.svg"
            title="campaign image placeholder"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.bootcampTitle}>
            {bootcamp.firstName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bootcamp.lastName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Grid container justifyContent="space-around">
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
          <Grid item xs={12} className={classes.cardButtons}>
            <Box mx={2} mb={2}>
              <LinkButton
                fullWidth
                href={routes.bootcamps.view(bootcamp.id)}
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
                href={routes.bootcamps.view(bootcamp.id)}
                variant="outlined"
                size="small"
                className={classes.seeMoreButton}
                endIcon={<ArrowForwardIosIcon />}>
                {t('nav.campaigns.see-more-button')}
              </LinkButton>
            </Box>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
