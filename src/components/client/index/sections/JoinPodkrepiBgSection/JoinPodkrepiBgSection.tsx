import { useTranslation } from 'next-i18next'

import { Box } from '@mui/material'

import { routes } from 'common/routes'

import {
  Root,
  BecomeVolunteerButton,
  BecomeVolunteerHeading,
  JoinIcon,
} from './JoinPodkrepiBgSection.styled'

export default function WantToHelpPodkrepiBgSection() {
  const { t } = useTranslation('index')
  const joinIconSource = '/img/JoinIcon.png'

  return (
    <Root aria-labelledby="join-us--heading">
      <JoinIcon alt="Join icon" src={joinIconSource} width={150} height={100} />
      <BecomeVolunteerHeading variant="h4" component={'h2'} id={'join-us--heading'}>
        {t('join-podkrepi-bg-section.heading')}
      </BecomeVolunteerHeading>
      <Box textAlign="center">
        <BecomeVolunteerButton variant="contained" href={routes.support}>
          {t('join-podkrepi-bg-section.become-volunteer')}
        </BecomeVolunteerButton>
      </Box>
    </Root>
  )
}
