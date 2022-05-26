import { Container, Grid, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'

import { routes } from 'common/routes'
import theme from 'common/theme'
import Heading from 'components/common/Heading'

export default function WantToHelpPodkrepiBgSection() {
  const { t } = useTranslation()
  return (
    <Grid
      sx={{
        display: 'flex',
        paddingTop: '36px',
        paddingBottom: '36px',
        marginBottom: theme.spacing(12),
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.light,
      }}>
      <Heading
        maxWidth="lg"
        margin="0 auto"
        textAlign="center"
        variant="h4"
        fontFamily="Montserrat"
        color={theme.palette.primary.dark}>
        {t('index:help-podkrepi-bg-section.want-to-help')}
      </Heading>
      <Container maxWidth="lg">
        <Grid
          margin="0 auto"
          container
          alignItems="center"
          marginTop={theme.spacing(1)}
          rowSpacing={4}>
          <Grid item xs={12} md={6} sx={{ textAlign: 'left', xs: { textAlign: 'center' } }}>
            <Typography variant="subtitle1">{t('index:help-podkrepi-bg-section.text')}</Typography>
          </Grid>
          <Grid item xs={12} md={6} textAlign="right">
            <LinkButton variant="contained" href={routes.support} endIcon={<ChevronRightIcon />}>
              {t('index:help-podkrepi-bg-section.become-volunteer')}
            </LinkButton>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
