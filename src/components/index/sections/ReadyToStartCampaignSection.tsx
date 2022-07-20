import { Box, Container, Grid, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'

import { routes } from 'common/routes'

export default function ReadyToStartCampaignSection() {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        backgroundColor: '#F4F4F4',
        py: 6,
      }}>
      <Container maxWidth="lg">
        <Grid container textAlign="center">
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ marginBottom: { xs: 2, sm: 0 }, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography sx={{}} variant="h5">
              {t('index:ready-to-start-campaign-section.text')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <LinkButton
              href={routes.campaigns.create}
              variant="contained"
              color="primary"
              endIcon={<ChevronRightIcon />}>
              {t('index:ready-to-start-campaign-section.button')}
            </LinkButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
