import { Grid, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'

import { routes } from 'common/routes'
import theme from 'common/theme'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '5%',
      marginTop: '4%',
    },
    text: {
      color: theme.palette.primary.dark,
      fontWeight: 500,
      textAlign: 'center',
    },
    button: {
      background: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: '61px',
      color: 'black',
    },
  }),
)

export default function ReadyToStartCampaignSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid className={classes.root}>
      <Grid item>
        <Typography variant="h5" className={classes.text}>
          {t('index:ready-to-start-campaign-section.text')}
        </Typography>
      </Grid>
      <Grid item>
        <LinkButton
          href={routes.campaigns.create}
          variant="outlined"
          endIcon={<ChevronRightIcon />}
          className={classes.button}>
          {t('index:ready-to-start-campaign-section.button')}
        </LinkButton>
      </Grid>
    </Grid>
  )
}
