import { TabContext, TabList } from '@mui/lab'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Tab, Typography, useMediaQuery } from '@mui/material'
import { OneTimeDonation } from 'gql/donations'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import AnonymousMenu from '../AnonymousForm'
import LoggedUserDialog from '../LoggedUserDialog'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterDialog'
import { useFormikContext } from 'formik'

enum Tabs {
  Login = '1',
  Register = '2',
  Anonymous = '3',
}
export default function SecondStep() {
  const { t } = useTranslation('one-time-donation')
  const mobile = useMediaQuery('(max-width:575px)')
  const { data: session } = useSession()

  const [value, setValue] = useState('1')
  const formik = useFormikContext<OneTimeDonation>()
  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    if (newTab === Tabs.Anonymous) {
      formik.setFieldValue('isAnonymous', true)
    } else {
      formik.setFieldValue('isAnonymous', false)
    }
    setValue(newTab)
  }

  return (
    <TabContext value={value}>
      <Typography variant="h4">{t('step-labels.personal-profile')}</Typography>
      <Typography>{t('second-step.intro-text')}</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          variant="fullWidth"
          orientation={mobile ? 'vertical' : 'horizontal'}
          centered
          value={value}
          onChange={handleChange}
          aria-label="personal info">
          <Tab label={t('second-step.login')} value="1" />
          <Tab
            label={t('second-step.new-create-profile')}
            value="2"
            disabled={session && session.accessToken ? true : false}
          />
          {formik.values.isRecurring ? null : (
            <Tab label={t('second-step.donate-anonymously')} value="3" />
          )}
        </TabList>
      </Box>
      <TabPanel value="1">
        {session && session.accessToken ? <LoggedUserDialog /> : <LoginForm />}
      </TabPanel>
      <TabPanel value="2">
        <RegisterForm />
      </TabPanel>
      {formik.values.isRecurring ? null : (
        <TabPanel value="3">
          <AnonymousMenu />
        </TabPanel>
      )}
    </TabContext>
  )
}
