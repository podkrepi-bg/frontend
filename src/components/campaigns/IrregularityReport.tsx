import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ReportGmailerrorred } from '@mui/icons-material'

import { CampaignResponse } from 'gql/campaigns'

import LinkButton from 'components/common/LinkButton'

const PREFIX = 'IrrregularityReport'

const classes = {
  irregularityReportWrapper: `${PREFIX}-irregularityReportWrapper`,
  reportButton: `${PREFIX}-reportButton`,
  reportIcon: `${PREFIX}-reportIcon`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.irregularityReportWrapper}`]: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(1),
    height: 'fit-content',
    boxShadow: '1px 2px 8px #8888888c',
  },
  [`& .${classes.reportButton}`]: {
    padding: theme.spacing(0.75, 1),
    borderColor: theme.palette.warning.main,
    color: 'black',
    textAlign: 'center',
  },
  [`& .${classes.reportIcon}`]: {
    marginLeft: theme.spacing(2),
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function IrregularityReport({ campaign }: Props) {
  const { t } = useTranslation()

  return (
    <StyledGrid item xs={12} mt={5} p={3} className={classes.irregularityReportWrapper}>
      <LinkButton
        fullWidth
        href={`/campaigns/${campaign.slug}/irregularity`}
        variant="outlined"
        size="small"
        startIcon={<ReportGmailerrorred className={classes.reportIcon} />}
        color="secondary"
        className={classes.reportButton}>
        {t('campaigns:campaign.report-irregularity')}
      </LinkButton>
    </StyledGrid>
  )
}
