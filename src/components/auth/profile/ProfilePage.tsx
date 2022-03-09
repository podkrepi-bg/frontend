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

function TabPanel(props) {
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
        <TabPanel value={value} index={0}>
          <h2>Абонамент месечни дарения</h2>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                backgroundColor: '#EEEEEE',
                flexGrow: 1,
                marginRight: '10px',
                padding: '10px',
              }}>
              <h3 style={{ fontSize: '16px', margin: 0 }}>Дарения</h3>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '24px', margin: 0 }}>Онлайн дарения</h4>
                <p style={{ fontSize: '22px' }}>0.00 лв.</p>
              </Box>
              <p>Към момента няма направени дарения</p>
              <hr></hr>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '24px', margin: 0 }}>Тотал онлайн дарения</h4>
                <p style={{ fontSize: '22px' }}>0.00 лв.</p>
              </Box>
              <hr></hr>
            </Box>
            <Box sx={{ backgroundColor: '#C4C4C4', padding: '10px', position: 'relative' }}>
              <h2>Бъди промяната</h2>
              <h3>помогни на хора в нужда</h3>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                sx={{ position: 'absolute', bottom: '35px' }}>
                Дари сега ❤️
              </Button>
            </Box>
          </Box>
          <h2>История на даренията</h2>
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              flexGrow: 1,
              marginRight: '10px',
              padding: '10px',
            }}>
            <h3 style={{ fontSize: '16px', margin: 0 }}>Онлайн дарения</h3>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '70%',
              }}>
              <span>Покажи:</span>
              <Box>
                <Checkbox defaultChecked />
                <span>еднократни</span>
              </Box>
              <Box>
                <Checkbox defaultChecked />
                <span>месечни</span>
              </Box>
              <span>възможност за търсене по по дата</span>
            </Box>
            <h3 style={{ fontSize: '25px' }}>Към момента няма направени дарения</h3>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Лична информация
        </TabPanel>
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
