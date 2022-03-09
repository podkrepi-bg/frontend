import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Container, Grid, Checkbox, Button } from '@mui/material'

import { routes } from 'common/routes'
import { isAdmin } from 'common/util/roles'
import ProfileLayout from 'components/layout/ProfileLayout'
import { useSession } from 'common/util/useSession'
import LinkButton from 'components/common/LinkButton'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import DonationTab from './DonationTab'
import PersonalInfoTab from './PersonalInfoTab'

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
      <ProfileLayout
        title={t('nav.profile')}
        githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/auth/profile/ProfilePage.tsx"
        figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5987%3A21094">
        Not authenticated
      </ProfileLayout>
    )
  }

  return (
    <ProfileLayout
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
          </Tabs>
        </Box>
        <DonationTab value={value} index={0}></DonationTab>
        <PersonalInfoTab value={value} index={1}></PersonalInfoTab>
        <TabPanel value={value} index={2}>
          Сертификати
        </TabPanel>
        <TabPanel value={value} index={3}>
          Договор дарение
        </TabPanel>
      </Box>

      <Box textAlign="center">
        <LinkButton variant="contained" href={routes.logout}>
          {t('nav.logout')}
        </LinkButton>
      </Box>
    </ProfileLayout>
  )
}
