import { SvgIconProps } from '@mui/material'
import JoinLeftIcon from '@mui/icons-material/JoinLeft'
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices'
import SettingsIcon from '@mui/icons-material/Settings'

type TechnologyData = {
  icon: React.ComponentType<SvgIconProps>
  label: string
  items: string[]
}

export const data: TechnologyData[] = [
  {
    icon: JoinLeftIcon,
    label: 'DevOps',
    items: [
      'about-project:tech-stack.docker',
      'about-project:tech-stack.kubernetes',
      'about-project:tech-stack.ci-cd-pipeline',
      'Rancher',
      'Keycloak Authentication',
    ],
  },
  {
    icon: ImportantDevicesIcon,
    label: 'Frontend',
    items: [
      'TypeScript',
      'Next.js',
      'NextAuth',
      'React',
      'MaterialUI',
      'SCSS',
      'Formik',
      'MobX',
      'React Query',
      'Yup',
      'Sentry',
    ],
  },
  {
    icon: SettingsIcon,
    label: 'Backend',
    items: ['TypeScript', 'Nest.js', 'PostgreSQL', 'Prisma', 'Jest', 'Sentry'],
  },
]
