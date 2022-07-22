import { Box, Grid, Typography } from '@mui/material'
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
        padding: '16px',
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
        color={theme.palette.primary.dark}
        paddingBottom={theme.spacing(7)}>
        {t('index:help-podkrepi-bg-section.want-to-help')}
      </Heading>
      <Box maxWidth="lg" textAlign="center">
        <Typography variant="subtitle1" marginBottom={theme.spacing(2)}>
          {t('index:help-podkrepi-bg-section.text')}
        </Typography>
        <LinkButton variant="contained" href={routes.support} endIcon={<ChevronRightIcon />}>
          {t('index:help-podkrepi-bg-section.become-volunteer')}
        </LinkButton>
      </Box>
    </Grid>
  )
}
