import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import FinancesIcon from '../../icons/support-us-icons/FinancesIcon'
import LabourIcon from '../../icons/support-us-icons/LabourIcon'
import MediaIcon from '../../icons/support-us-icons/MediaIcon'
import PartnershipIcon from '../../icons/support-us-icons/PartnershipIcon'

export default function SupportUsSection() {
  const { t } = useTranslation()

  return (
    <Box component="section" mb={10} textAlign="center">
      <Typography variant="h5" paragraph>
        {t('index:support-us-section.heading')}
      </Typography>
      <Grid container direction="row">
        <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
          <Box textAlign="center">
            <FinancesIcon />
            <Typography variant="h5" paragraph>
              {t('index:support-us-section.financial-support')}
            </Typography>
          </Box>
          <Box textAlign="center">
            <LabourIcon />
            <Typography variant="h5" paragraph>
              {t('index:support-us-section.labour-support')}
            </Typography>
          </Box>
          <Box textAlign="center">
            <MediaIcon />
            <Typography variant="h5" paragraph>
              {t('index:support-us-section.media-support')}
            </Typography>
          </Box>
          <Box textAlign="center">
            <PartnershipIcon />
            <Typography variant="h5" paragraph>
              {t('index:support-us-section.become-a-partner')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}
