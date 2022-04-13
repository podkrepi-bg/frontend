import { Box } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import Layout from 'components/layout/Layout'
import { useSession } from 'common/util/useSession'

import { ProfileTabs, ProfileTab, tabs } from './tabs'

const useStyles = makeStyles({
  h1: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '45px',
    lineHeight: '112px',
    letterSpacing: '-1.5px',
    color: '#000000',
    margin: '0',
    marginLeft: '10px',
  },
})

export default function ProfilePage() {
  const { t } = useTranslation()
  const { keycloak } = useSession()
  const classes = useStyles()
  const router = useRouter()

  const currentTab = router.query.slug ?? ProfileTabs.donations
  const tab = useMemo<ProfileTab>(() => {
    return tabs.find((tab) => tab.slug === currentTab) ?? tabs[0]
  }, [currentTab])

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

  const { Component: SelectedTab } = tab

  return (
    <Layout profilePage={true}>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px 10px 0px 0px',
            padding: '10px 30px',
          }}>
          <h1 className={classes.h1}>Дарителски профил</h1>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab.slug}>
              <Tab
                value={ProfileTabs.donations}
                label="Дарения"
                onClick={() => router.push(routes.profile.donations)}
              />
              <Tab
                value={ProfileTabs.personalInformation}
                label="Лична информация"
                onClick={() => router.push(routes.profile.personalInformation)}
              />
              <Tab
                value={ProfileTabs.certificates}
                label="Сертификати"
                onClick={() => router.push(routes.profile.certificates)}
              />
              <Tab
                value={ProfileTabs.contractDonation}
                label="Договор дарение"
                onClick={() => router.push(routes.profile.contractDonation)}
              />
            </Tabs>
          </Box>
        </Box>
        {SelectedTab && <SelectedTab />}
      </Box>
    </Layout>
  )
}
