import { Grid, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'

import { routes } from 'common/routes'
import theme from 'common/theme'

const useStyles = makeStyles(() =>
  createStyles({
    text: {
      color: theme.palette.primary.dark,
      fontWeight: 500,
      textAlign: 'center',
    },
    button: {
      margin: 'auto',
      background: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      color: 'black',
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginBottom: '1rem',
      paddingTop: '60px',
      paddingBottom: '60px',
      paddingLeft: '20vw',
      paddingRight: '20vw',
      backgroundColor: theme.palette.secondary.light,
    },
  }),
)

export default function ReadyToStartCampaignSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid className={classes.content}>
      <Grid item>
        <Typography variant="h5" className={classes.text}>
          {t('index:ready-to-start-campaign-section.text')}
        </Typography>
      </Grid>
      <Grid item>
        <LinkButton
          href={routes.campaigns.create}
          variant="contained"
          color="primary"
          endIcon={<ChevronRightIcon />}
          className={classes.button}>
          {t('index:ready-to-start-campaign-section.button')}
        </LinkButton>
      </Grid>
    </Grid>
  )
}
