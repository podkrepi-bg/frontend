import React from 'react'
import { useTranslation } from 'next-i18next'
import makeStyles from '@mui/styles/makeStyles'
import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import { BootcampFormData, BootcampInput, BootcampResponse } from 'gql/bootcamps'

import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Link,
} from '@mui/material'
import { Favorite } from '@mui/icons-material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import router from 'next/router'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { deleteBootcamp } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'

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

  cardActions: {
    padding: '0',
  },

  cardWrapper: {
    position: 'relative',
    minHeight: theme.spacing(1),
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

  const mutation = useMutation({
    mutationFn: deleteBootcamp,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onClick = async () => {
    try {
      await mutation.mutateAsync({ id: bootcamp.id })
      router.push(routes.bootcamps.index)
    } catch (error) {
      console.error(error)
      AlertStore.show(t('common:alert.error'), 'error')
    }
  }

  return (
    <Card variant="outlined" className={classes.cardWrapper}>
      <CardActionArea>
        <Link href={routes.bootcamps.viewBootcampById(bootcamp.id)}>
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
          <Box mx={2} mb={2}>
            <LinkButton
              onClick={onClick}
              href={routes.bootcamps.deleteBootcamp}
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.supportNowButton}
              endIcon={<Favorite color="error" />}>
              {t('Изтрии')}
            </LinkButton>
          </Box>
          <Box mx={2} mb={2}>
            <LinkButton
              href={routes.bootcamps.editBootcampById(bootcamp.id)}
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.supportNowButton}
              endIcon={<Favorite color="error" />}>
              {t('Промени')}
            </LinkButton>
          </Box>
          <Box mx={2} mb={2}>
            <LinkButton
              fullWidth
              href={routes.bootcamps.viewBootcampById(bootcamp.id)}
              variant="outlined"
              size="small"
              className={classes.seeMoreButton}
              endIcon={<ArrowForwardIosIcon />}>
              {t('nav.campaigns.see-more-button')}
            </LinkButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
