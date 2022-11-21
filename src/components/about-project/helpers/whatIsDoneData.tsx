import { staticUrls } from 'common/routes'
import { BankAccount } from 'components/common/BankAccount'

export const leftColumnLabels = [
  {
    label: 'about-project:work-organisation',
  },
  {
    label: 'about-project:choice-of-logo-and-design',
  },
  {
    label: 'about-project:register-association',
  },
  { label: 'about-project:hosting-partnerships' },
  {
    label: 'about-project:self-sufficiency-measures',
  },
  {
    label: <BankAccount />,
  },
]

export const rightColumnLabels = [
  {
    label: 'about-project:ngo-talks',
  },
  {
    label: 'about-project:user-stories',
  },
  {
    label: 'about-project:active-teams',
  },
  {
    label: 'about-project:microservice-architecture',
  },
  { label: 'about-project:github-project', href: staticUrls.github },
  {
    label: 'about-project:documentation-social',
    href: staticUrls.projectDocs,
  },
  { label: 'about-project:documentation-technical', href: staticUrls.devDocs },
  // Currently the architecture map is not available
  // {
  //   label: 'about-project:high-level-map',
  //   href: 'https://docs.podkrepi.bg/general/arkhitektura/architecture',
  // },
]
