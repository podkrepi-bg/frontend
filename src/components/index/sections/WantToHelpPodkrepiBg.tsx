import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
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
      marginBottom: theme.spacing(12),
      padding: theme.spacing(6, 5),
      alignItems: 'center',
      backgroundColor: theme.palette.secondary.light,
    },
    text: {
      color: 'black',
      fontFamily: 'Montserrat',
    },
    button: {
      color: 'black',
      margin: 'auto',
    },
  }),
)

export default function WantToHelpPodkrepiBgSection() {
  const classes = useStyles()
  const { t } = useTranslation()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box className={classes.root}>
      <Heading
        maxWidth="lg"
        margin="0 auto"
        textAlign="center"
        variant="h4"
        fontFamily="Montserrat"
        color={theme.palette.primary.dark}>
        {t('index:help-podkrepi-bg-section.want-to-help')}
      </Heading>
      <Grid
        maxWidth="lg"
        margin="0 auto"
        container
        alignItems="center"
        marginTop={theme.spacing(1)}
        rowSpacing={4}>
        <Grid item xs={12} md={6} textAlign={mdDown ? 'center' : 'left'}>
          <Typography variant="subtitle1" className={classes.text}>
            {t('index:help-podkrepi-bg-section.text')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} textAlign={mdDown ? 'center' : 'right'}>
          <LinkButton
            variant="contained"
            href={routes.support}
            className={classes.button}
            endIcon={<ChevronRightIcon />}>
            {t('index:help-podkrepi-bg-section.become-volunteer')}
          </LinkButton>
        </Grid>
      </Grid>
    </Box>
  )
}
