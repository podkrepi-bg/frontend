import { Grid, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'

import { routes } from 'common/routes'
import theme from 'common/theme'
import Heading from 'components/common/Heading'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      paddingBottom: '5%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    text: {
      color: 'black',
      textAlign: 'center',
      // width: '762px',
      marginTop: '2%',
    },
    button: {
      background: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: '61px',
      color: 'black',
      marginTop: '10%',
    },
  }),
)

export default function WantToHelpPodkrepiBgSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid className={classes.root}>
      <Grid item>
        <Heading textAlign="center" variant="h4">
          {t('index:help-podkrepi-bg-section.want-to-help')}
        </Heading>
      </Grid>
      <Grid item>
        <Grid item>
          <Typography variant="h5" className={classes.text}>
            {t('index:help-podkrepi-bg-section.text')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <LinkButton href={routes.support} className={classes.button} endIcon={<ChevronRightIcon />}>
          {t('index:help-podkrepi-bg-section.become-volunteer')}
        </LinkButton>
      </Grid>
    </Grid>
  )
}
