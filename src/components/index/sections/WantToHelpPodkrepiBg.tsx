import { Box, Grid, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import LinkButton from 'components/common/LinkButton'

import { routes } from 'common/routes'
import theme from 'common/theme'
import Heading from 'components/common/Heading'

export default function WantToHelpPodkrepiBgSection() {
  const { t } = useTranslation()
  const discordTeamImagePath = '/img/team-photos/discord-team-image.jpg'

  return (
    <Grid
      sx={{
        display: 'flex',
        padding: '80px 0',
        marginBottom: theme.spacing(12),
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.light,
      }}>
      <Heading
        maxWidth="lg"
        margin="0 auto"
        textAlign="center"
        component="h2"
        variant="h4"
        fontFamily="Montserrat"
        color={theme.palette.primary.dark}
        paddingBottom={theme.spacing(7)}>
        {t('index:join-podkrepi-bg-section.heading')}
      </Heading>
      <Box maxWidth="lg" textAlign="center">
        <Typography variant="subtitle1" marginBottom={theme.spacing(2)}>
          {t('index:join-podkrepi-bg-section.text')}
        </Typography>
        <Box sx={{ margin: '30px 0' }}>
          <Image
            alt="Discord team image"
            src={discordTeamImagePath}
            width="1189px"
            height="789px"
          />
        </Box>
        <LinkButton variant="contained" href={routes.support} endIcon={<ChevronRightIcon />}>
          {t('index:join-podkrepi-bg-section.become-volunteer')}
        </LinkButton>
      </Box>
    </Grid>
  )
}
