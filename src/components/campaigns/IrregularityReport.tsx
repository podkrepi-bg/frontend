import { useTranslation } from 'next-i18next'

import { Grid, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { ReportGmailerrorred } from '@mui/icons-material'

import { CampaignResponse } from 'gql/campaigns'

import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    reportWrapper: {
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(1),
      height: 'fit-content',
      boxShadow: '1px 2px 8px #8888888c',
    },
    reportButton: {
      padding: theme.spacing(0.75, 1),
      borderColor: theme.palette.warning.main,
      color: 'black',
      textAlign: 'center',
    },
    reportIcon: {
      marginLeft: theme.spacing(2),
    },
  }),
)

type Props = {
  campaign: CampaignResponse
}

export default function IrregularityReport({ campaign }: Props) {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid item xs={12} mt={5} p={3} className={classes.reportWrapper}>
      <LinkButton
        fullWidth
        href={`/campaigns/${campaign.slug}/report`}
        variant="outlined"
        size="small"
        startIcon={<ReportGmailerrorred className={classes.reportIcon} />}
        color="secondary"
        className={classes.reportButton}>
        {t('irregularity-report:report-btn')}
      </LinkButton>
    </Grid>
  )
}
