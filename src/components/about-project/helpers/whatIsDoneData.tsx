import { staticUrls } from 'common/routes'
import { BankAccount } from 'components/common/BankAccount'

export const leftColumnLabels = [
  {
    label: 'work-organisation',
  },
  {
    label: 'choice-of-logo-and-design',
  },
  {
    label: 'register-association',
  },
  { label: 'hosting-partnerships' },
  {
    label: 'self-sufficiency-measures',
  },
  {
    label: <BankAccount />,
  },
]

export const rightColumnLabels = [
  {
    label: 'ngo-talks',
  },
  {
    label: 'user-stories',
  },
  {
    label: 'active-teams',
  },
  {
    label: 'microservice-architecture',
  },
  { label: 'github-project', href: staticUrls.github },
  {
    label: 'documentation-social',
    href: staticUrls.projectDocs,
  },
  { label: 'documentation-technical', href: staticUrls.devDocs },
  // Currently the architecture map is not available
  // {
  //   label: 'high-level-map',
  //   href: 'https://docs.podkrepi.bg/general/arkhitektura/architecture',
  // },
]
