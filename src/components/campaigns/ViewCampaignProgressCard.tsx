import React from 'react'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'
import CampaignProgress from './CampaignProgress'
import LinkButton from 'components/common/LinkButton'
import { Box, Button, Grid, Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { Share, Favorite } from '@mui/icons-material'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outlinedButton: {
      color: theme.palette.primary.dark,
      border: `2px solid ${theme.palette.primary.dark}`,
      borderRadius: theme.spacing(3),
      width: '100%',
      whiteSpace: 'nowrap',
      height: theme.spacing(6),
      marginTop: theme.spacing(3),
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 500,
    },
    donateNowButton: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(3),
      width: '100%',
      height: theme.spacing(6),
      marginTop: theme.spacing(3),
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 500,
    },
    buttonWrapper: {
      display: 'inline-flex',
      width: '100%',
      gap: theme.spacing(2),
    },
  }),
)

export default function ViewCampaignProgressCard() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      <Box p={2} width={1}>
        <CampaignProgress raised="1,000" goal="20,000" percentage={Math.random() * 100} />
        <Button variant="outlined" className={classes.outlinedButton} endIcon={<Share />}>
          {t('campaigns:cta.share')}
        </Button>
        <Button variant="outlined" className={classes.donateNowButton} endIcon={<Favorite />}>
          {t('campaigns:cta.donate-now')}
        </Button>
        <Box className={classes.buttonWrapper}>
          <LinkButton
            href={routes.campaigns.index}
            variant="outlined"
            className={classes.outlinedButton}>
            {t('campaigns:cta.see-all')}
          </LinkButton>
          <Button variant="outlined" className={classes.outlinedButton}>
            {t('campaigns:cta.see-top-10')}
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}
