import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { Box } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { routes } from 'common/routes'

import { InfoText, Heading } from '../../IndexPage.styled'
import { Root, BecomeVolunteerButton } from './JoinPodkrepiBgSection.styled'

export default function WantToHelpPodkrepiBgSection() {
  const { t } = useTranslation('index')

  const discordTeamImagePath = '/img/team-photos/discord-team-image.jpg'

  return (
    <Root>
      <Heading variant="h4">{t('join-podkrepi-bg-section.heading')}</Heading>
      <Box textAlign="center">
        <InfoText>{t('join-podkrepi-bg-section.text')}</InfoText>
        <Box>
          {/* A11Y TODO: Translate alt text */}
          <Image
            alt="Discord team image"
            src={discordTeamImagePath}
            width={1189}
            height={789}
            layout="intrinsic"
            priority
          />
        </Box>
        <BecomeVolunteerButton
          variant="contained"
          href={routes.support}
          endIcon={<ChevronRightIcon />}>
          {t('join-podkrepi-bg-section.become-volunteer')}
        </BecomeVolunteerButton>
      </Box>
    </Root>
  )
}
