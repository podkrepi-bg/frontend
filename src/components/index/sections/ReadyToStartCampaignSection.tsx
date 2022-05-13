import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'

import { routes } from 'common/routes'
import theme from 'common/theme'

const PREFIX = 'ReadyToStartCampaignSection'

const classes = {
  text: `${PREFIX}-text`,
  button: `${PREFIX}-button`,
  content: `${PREFIX}-content`,
}

const StyledGrid = styled(Grid)(() => ({
  [`& .${classes.text}`]: {
    color: theme.palette.primary.dark,
    fontWeight: 500,
    textAlign: 'center',
  },

  [`& .${classes.button}`]: {
    margin: 'auto',
    color: 'black',
  },

  [`&.${classes.content}`]: {
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
}))

export default function ReadyToStartCampaignSection() {
  const { t } = useTranslation()

  return (
    <StyledGrid className={classes.content}>
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
    </StyledGrid>
  )
}
