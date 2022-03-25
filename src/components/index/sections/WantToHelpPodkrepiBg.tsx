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
      justifyContent: 'space-between',
      paddingBottom: '5%',
    },
    text: {
      color: 'black',
      textAlign: 'center',
      width: '762px',
    },
    button: {
      background: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: '61px',
      color: 'black',
      width: '330px',
    },
  }),
)

export default function WantToHelpPodkrepiBgSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <Heading textAlign="center" variant="h4">
        {t('index:help-podkrepi-bg-section.want-to-help')}
      </Heading>
      <Grid className={classes.root}>
        <Grid item>
          <Typography variant="h5" className={classes.text}>
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
    </>
  )
}
