import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'

import { routes } from 'common/routes'
import theme from 'common/theme'
import Heading from 'components/common/Heading'

const PREFIX = 'WantToHelpPodkrepiBg'

const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
}

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.root}`]: {
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

  [`& .${classes.button}`]: {
    color: 'black',
    margin: 'auto',
  },
}))

export default function WantToHelpPodkrepiBgSection() {
  const { t } = useTranslation()

  return (
    <StyledGrid className={classes.root}>
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
        <Grid item xs={12} md={8} sx={{ p: 1 }}>
          <Typography variant="subtitle1">{t('index:help-podkrepi-bg-section.text')}</Typography>
        </Grid>
        <Grid item xs={12} md={4} textAlign="right">
          <LinkButton
            variant="contained"
            href={routes.support}
            className={classes.button}
            endIcon={<ChevronRightIcon />}>
            {t('index:help-podkrepi-bg-section.become-volunteer')}
          </LinkButton>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
