import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'

import { routes } from 'common/routes'
import theme from 'common/theme'

export default function ReadyToStartCampaignSection() {
  const { t } = useTranslation()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box
      sx={{
        backgroundColor: '#F4F4F4',
        paddingY: theme.spacing(6),
        paddingX: theme.spacing(5),
      }}>
      <Grid container maxWidth="lg" margin="0 auto">
        <Grid marginBottom={theme.spacing(3)} item xs={12} md={6}>
          <Typography textAlign={downMd ? 'center' : 'left'} variant="h5">
            {t('index:ready-to-start-campaign-section.text')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} textAlign={downMd ? 'center' : 'right'}>
          <LinkButton
            href={routes.campaigns.create}
            variant="contained"
            color="primary"
            endIcon={<ChevronRightIcon />}>
            {t('index:ready-to-start-campaign-section.button')}
          </LinkButton>
        </Grid>
      </Grid>
    </Box>
  )
}
