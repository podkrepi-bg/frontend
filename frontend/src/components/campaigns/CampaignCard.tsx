import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  media: {
    backgroundSize: 'contain',
    filter: 'grayscale(1)',
    height: 220,
    marginTop: theme.spacing(2),
    opacity: 0.2,
    transition: 'filter 0.3s, opacity 0.8s',

    '&:hover': {
      filter: 'grayscale(0)',
      opacity: 1,
    },
  },
}))

type Props = { id: number }
export default function CampaignCard({ id }: Props) {
  const classes = useStyles()

  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/podkrepi-icon.svg"
          title="campaign image placeholder"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Кампания {id + 1}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Описание на примерна кампания
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="space-around">
          <Grid item xs={6}>
            <Button fullWidth size="small" color="primary">
              Виж повече
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth size="small" color="primary" variant="outlined">
              Дари
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
