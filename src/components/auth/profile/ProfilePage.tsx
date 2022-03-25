import React, { SyntheticEvent } from 'react'
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
  const [value, setValue] = React.useState(0)
  const { keycloak } = useSession()
  const classes = useStyles()

  const handleChange = (_: SyntheticEvent, value: number) => {
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
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Дарения" />
              <Tab label="Лична информация" />
              <Tab label="Сертификати" />
              <Tab label="Договор дарение" />
            </Tabs>
          </Box>
        </Box>
        <DonationTab value={value} index={0} />
        <PersonalInfoTab value={value} index={1} />
        <CertificatesTab value={value} index={2} />
        <DonationAgreementTab value={value} index={3} />
      </Box>
    </Layout>
  )
}
