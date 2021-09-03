import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FavoriteIcon from '@material-ui/icons/Favorite'
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
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import CampaignProgress from './CampaignProgress'

const useStyles = makeStyles((theme) => ({
  media: {
    backgroundSize: 'contain',
    filter: 'grayscale(1)',
    height: 320,
    marginTop: theme.spacing(4),
    opacity: 0.2,
    transition: 'filter 0.3s, opacity 0.8s',

    '&:hover': {
      filter: 'grayscale(0)',
      opacity: 1,
    },
  },
  amountButtonGroup: {
    width: '100%',
    backgroundColor: '#e60550',
    borderRadius: '0px',
    border: '0px',
  },
  amountButton: {
    backgroundColor: '#e60550',
    color: '#FFFFFF',
    width: '100%',
    border: '0px',

    '&.Mui-selected': {
      backgroundColor: '#e60550',
      color: '#FFFFFF',
      border: '0px',

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
        color: '#FFFFFF',
      },
    },
  },
  donate: {
    backgroundColor: '#e60550',
    boxShadow: '0 3px 2x 2px rgba(255, 105, 135, .3)',
    color: '#FFFFFF',
    width: '100%',
    borderRadius: '0px',
    padding: theme.spacing(1),
    border: '0px',

    '&:hover': {
      backgroundColor: '#c40444',
    },
    '&:hover svg': {
      transition: 'all .2s ease-out-in',
      transform: 'scale(1.5)',
    },
    '& svg': {
      transition: 'all .2s ease-in-out',
      transform: 'scale(1)',
    },
  },
  cardActions: {
    padding: '0px',
  },
  mt: {
    marginTop: theme.spacing(3),
  },
}))

type Props = { id: number }
export default function CampaignCard({ id }: Props) {
  const classes = useStyles()
  const amounts = [20, 50, 100]

  const [alignment, setAlignment] = React.useState<string | null>('left')
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment)
  }

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
      <CardActions className={classes.cardActions}>
        <Grid container className={classes.mt} justify="space-around">
          <CampaignProgress raised="20,000" goal="20,000" percentage={100} />
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              className={classes.amountButtonGroup}
              onChange={handleAlignment}
              aria-label={alignment}>
              {amounts.map((amount, index) => {
                return (
                  <ToggleButton
                    key={index}
                    className={classes.amountButton}
                    value={amount}
                    aria-label={amount}>
                    {amount}
                  </ToggleButton>
                )
              })}
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              size="small"
              className={classes.donate}
              variant="contained"
              startIcon={<FavoriteIcon />}>
              Дари
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
