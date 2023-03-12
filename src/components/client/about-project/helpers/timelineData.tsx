import { SvgIconProps } from '@mui/material'
import {
  Folder,
  PlayCircleFilledWhite,
  PlaylistAddCheck,
  Telegram,
  Update,
  VerifiedUser,
} from '@mui/icons-material'

import { socialUrls } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'
import PodkrepiIcon from 'components/common/brand/PodkrepiIcon'
import DiscordIcon from '../icons/DiscordIcon'
import ChecklistIcon from '../icons/ChecklistIcon'
import GlobeIcon from '../icons/GlobeIcon'
import HandIcon from '../icons/HandIcon'
import RocketIcon from '../icons/RocketIcon'

export type TimelineData = {
  icon: React.ComponentType<SvgIconProps>
  title: string
  items: string[]
}

export const timelineData: TimelineData[] = [
  {
    icon: PlayCircleFilledWhite,
    title: 'october-2020-title',
    items: ['platform-idea', 'team-gathering'],
  },
  {
    icon: DiscordIcon,
    title: 'november-2020-title',
    items: [
      `starting ${(<ExternalLink href={socialUrls.discord}>Discord</ExternalLink>)}`,
      'project-server',
      'manifesto-preparation',
      'project-server',
      'meetings-discussions',
      'online-panel',
    ],
  },
  {
    icon: Folder,
    title: 'december-2020-title',
    items: ['distribution', 'name-choice', 'self-support'],
  },
  {
    icon: PodkrepiIcon,
    title: 'december-2020-title',
    items: ['user-stories-preparation', 'logo-choice', 'trademarking'],
  },
  {
    icon: VerifiedUser,
    title: 'february-2021-title',
    items: ['registration', 'work-start'],
  },
  {
    icon: ChecklistIcon,
    title: 'march-2021-title',
    items: ['start-info-site', 'hosting-setup'],
  },
  {
    icon: GlobeIcon,
    title: 'april-2021-title',
    items: ['involve-more-teams', 'bank-accounts-opening', 'payments'],
  },
  {
    icon: HandIcon,
    title: 'may-2021-title',
    items: ['self-support-model'],
  },
  {
    icon: Update,
    title: 'september-2021-title',
    items: ['hackathons'],
  },
  {
    icon: PlaylistAddCheck,
    title: 'april-2022-title',
    items: ['tests-performing'],
  },
  {
    icon: Telegram,
    title: 'august-2022-title',
    items: ['beta-version-launch'],
  },
  {
    icon: RocketIcon,
    title: 'november-2022-title',
    items: ['official-version-launch'],
  },
]
