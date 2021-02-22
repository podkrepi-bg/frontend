import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import CommissionsIcon from '../../icons/problems-to-solve-icons/CommissionsIcon'
import TransparencyIcon from '../../icons/problems-to-solve-icons/TransparencyIcon'
import TimelinessIcon from '../../icons/problems-to-solve-icons/TimelinessIcon'

export default function SupportUsSection() {
  const { t } = useTranslation()

  return (
    <Box component="section" mb={10} textAlign="center">
      <Typography variant="h5" paragraph>
        {t('index:problems-to-solve-section.heading')}
      </Typography>
      <Grid container direction="row">
        <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
          <Box display="flex" alignItems="center">
            <CommissionsIcon />
            <Typography variant="h5" paragraph>
              {t('index:problems-to-solve-section.high-commissions')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <TransparencyIcon />
            <Typography variant="h5" paragraph>
              {t('index:problems-to-solve-section.low-transparency')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <TimelinessIcon />
            <Typography variant="h5">
              {t('index:problems-to-solve-section.timeliness')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}
