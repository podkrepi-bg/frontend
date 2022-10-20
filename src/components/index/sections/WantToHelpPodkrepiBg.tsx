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
      component="section"
      sx={{
        display: 'flex',
        padding: theme.spacing(10, 3),
        marginBottom: theme.spacing(12),
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.light,
        marginTop: theme.spacing(8),
        [theme.breakpoints.up('sm')]: {
          marginTop: theme.spacing(12),
        },
      }}>
      <Heading
        maxWidth="lg"
        margin="0 auto"
        textAlign="center"
        component="h2"
        variant="h4"
        fontFamily="Montserrat"
        color={theme.palette.primary.dark}
        marginBottom={theme.spacing(6)}
        fontWeight="500"
        fontSize="16px">
        {t('index:join-podkrepi-bg-section.heading')}
      </Heading>
      <Box textAlign="center">
        <Typography marginBottom={theme.spacing(6)}>
          {t('index:join-podkrepi-bg-section.text')}
        </Typography>
        <Box sx={{ marginTop: theme.spacing(4) }}>
          <Image
            alt="Discord team image"
            src={discordTeamImagePath}
            width="1189px"
            height="789px"
            priority
          />
        </Box>
        <LinkButton
          variant="contained"
          href={routes.support}
          endIcon={<ChevronRightIcon />}
          sx={{
            marginTop: theme.spacing(6),
            fontWeight: 'bold',
            minWidth: { sm: theme.spacing(35) },
          }}>
          {t('index:join-podkrepi-bg-section.become-volunteer')}
        </LinkButton>
      </Box>
    </Grid>
  )
}
