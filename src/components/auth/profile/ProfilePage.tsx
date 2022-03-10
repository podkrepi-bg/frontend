import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Button } from '@mui/material'

import { routes } from 'common/routes'
import Layout from 'components/layout/Layout'
import { useSession } from 'common/util/useSession'
import LinkButton from 'components/common/LinkButton'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import DonationTab from './DonationTab'
import PersonalInfoTab from './PersonalInfoTab'
import CertificatesTab from './CertificatesTab'
import DonationAgreementTab from './DonationAgreementTab'
import Link from 'next/link'

function TabPanel(props: any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function ProfilePage() {
  const { t } = useTranslation()
  const [value, setValue] = React.useState(0)
  const { keycloak, session } = useSession()

  const handleChange = (_: any, value: number) => {
    setValue(value)
  }

  if (!keycloak?.authenticated) {
    return (
      <Layout
        title={t('nav.profile')}
        githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/auth/profile/ProfilePage.tsx"
        figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5987%3A21094">
        Not authenticated
      </Layout>
    )
  }

  return (
    <Layout
      title={`Добре дошъл, ${session?.given_name}!`}
      githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/auth/profile/ProfilePage.tsx"
      figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5987%3A21094">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Дарения" />
            <Tab label="Лична информация" />
            <Tab label="Сертификати" />
            <Tab label="Договор дарение" />
            <Link href={routes.campaigns.create} passHref>
              <Button variant="contained" size="medium">
                Създай кампания
              </Button>
            </Link>
          </Tabs>
        </Box>
        <DonationTab value={value} index={0}></DonationTab>
        <PersonalInfoTab value={value} index={1}></PersonalInfoTab>
        <CertificatesTab value={value} index={2}></CertificatesTab>
        <DonationAgreementTab value={value} index={3}></DonationAgreementTab>
      </Box>

      <Box textAlign="center">
        <LinkButton variant="contained" href={routes.logout}>
          {t('nav.logout')}
        </LinkButton>
      </Box>
    </Layout>
  )
}
