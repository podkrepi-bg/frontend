import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Layout from 'components/layout/Layout'
import { useSession } from 'common/util/useSession'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import DonationTab from './DonationTab'
import PersonalInfoTab from './PersonalInfoTab'
import CertificatesTab from './CertificatesTab'
import DonationAgreementTab from './DonationAgreementTab'
import Link from 'components/common/Link'
import { useRouter } from 'next/router'

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

const tabs = [
  {
    slug: 'donations',
    label: 'Дарения',
    component: DonationTab,
    index: 0,
  },
  {
    slug: 'personal-information',
    label: 'Лична информация',
    component: PersonalInfoTab,
    index: 1,
  },
  {
    slug: 'certificates',
    label: 'Лична информация',
    component: CertificatesTab,
    index: 2,
  },
  {
    slug: 'contract-donation',
    label: 'Договор дарение',
    component: DonationAgreementTab,
    index: 3,
  },
]
export default function ProfilePage() {
  const { t } = useTranslation()
  const { keycloak } = useSession()
  const classes = useStyles()
  const router = useRouter()
  const findTabToRender = () => {
    return tabs.find((tab) => tab.slug === router.query.slug)
  }
  const TabToRender = findTabToRender()
  useEffect(() => {
    const foundTab = findTabToRender()
    if (router.query.slug && !foundTab) router.push('/404')
  }, [router])

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
            <Tabs value={TabToRender?.index} aria-label="basic tabs example">
              <Link href="/profile/donations">
                <Tab value={0} label="Дарения" />
              </Link>
              <Link href="/profile/personal-information">
                <Tab value={1} label="Лична информация" />
              </Link>
              <Link href="/profile/certificates">
                <Tab value={2} label="Сертификати" />
              </Link>
              <Link href="/profile/contract-donation">
                <Tab value={3} label="Договор дарение" />
              </Link>
            </Tabs>
          </Box>
        </Box>
        {TabToRender ? (
          <TabToRender.component value={TabToRender.index} index={TabToRender.index} />
        ) : (
          'No tab selected'
        )}
      </Box>
    </Layout>
  )
}
