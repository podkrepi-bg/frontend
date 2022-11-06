import { SvgIconProps } from '@mui/material'

import VoluntaryIcon from '../icons/VoluntaryIcon'
import ProactiveIcon from '../icons/ProactiveIcon'
import ExpertiseIcon from '../icons/ExpertiseIcon'
import RespectIcon from '../icons/RespectIcon'
import TransparencyIcon from '../icons/TransparencyIcon'
import AwarenessIcon from '../icons/AwarenessIcon'
import PrivacyIcon from '../icons/PrivacyIcon'

export type PrinciplesData = {
  icon: React.ComponentType<SvgIconProps>
  heading: string
  content: string
}

export const principlesData: PrinciplesData[] = [
  {
    icon: VoluntaryIcon,
    heading: 'principlesThatUniteUs.voluntary.heading',
    content: 'principlesThatUniteUs.voluntary.content',
  },
  {
    icon: ProactiveIcon,
    heading: 'principlesThatUniteUs.proactivity.heading',
    content: 'principlesThatUniteUs.proactivity.content',
  },
  {
    icon: ExpertiseIcon,
    heading: 'principlesThatUniteUs.expertise.heading',
    content: 'principlesThatUniteUs.expertise.content',
  },
  {
    icon: RespectIcon,
    heading: 'principlesThatUniteUs.respect.heading',
    content: 'principlesThatUniteUs.respect.content',
  },
  {
    icon: TransparencyIcon,
    heading: 'principlesThatUniteUs.transparency.heading',
    content: 'principlesThatUniteUs.transparency.content',
  },
  {
    icon: PrivacyIcon,
    heading: 'principlesThatUniteUs.privacy.heading',
    content: 'principlesThatUniteUs.privacy.content',
  },
  {
    icon: AwarenessIcon,
    heading: 'principlesThatUniteUs.awareness.heading',
    content: 'principlesThatUniteUs.awareness.content',
  },
  {
    icon: AwarenessIcon,
    heading: 'principlesThatUniteUs.sharing.heading',
    content: 'principlesThatUniteUs.sharing.content',
  },
]
