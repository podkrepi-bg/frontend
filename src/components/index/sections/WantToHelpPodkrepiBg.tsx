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
      paddingTop: '36px',
      paddingBottom: '36px',
      paddingLeft: '25vw',
      paddingRight: '25vw',
      marginBottom: theme.spacing(12),
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.secondary.light,
    },
    text: {
      color: 'black',
      fontFamily: 'Montserrat',
    },
    button: {
      background: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: '61px',
      color: 'black',
      margin: 'auto',
    },
  }),
)

export default function WantToHelpPodkrepiBgSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid className={classes.root}>
      <Heading
        textAlign="center"
        variant="h4"
        fontFamily="Montserrat"
        color={theme.palette.primary.dark}>
        {t('index:help-podkrepi-bg-section.want-to-help')}
      </Heading>
      <Grid
        container
        display="flex"
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        paddingTop="36px">
        <Grid item style={{ width: '60%' }}>
          <Typography variant="subtitle1" className={classes.text}>
            {t('index:help-podkrepi-bg-section.text')}
          </Typography>
        </Grid>
        <Grid item>
          <LinkButton
            href={routes.support}
            className={classes.button}
            endIcon={<ChevronRightIcon />}>
            {t('index:help-podkrepi-bg-section.become-volunteer')}
          </LinkButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
