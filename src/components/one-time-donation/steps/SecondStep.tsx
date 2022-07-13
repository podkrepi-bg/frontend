import { TabContext, TabList } from '@mui/lab'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Tab, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import AnonymousMenu from '../AnonymousForm'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterDialog'

export default function SecondStep() {
  const { t } = useTranslation('one-time-donation')

  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Typography variant="h4">{t('step-labels.personal-profile')}</Typography>
      <Typography>{t('second-step.intro-text')}</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList value={value} onChange={handleChange} aria-label="personal info">
          <Tab label={t('second-step.login')} value="1" />
          <Tab label={t('second-step.new-create-profile')} value="2" />
          <Tab label={t('second-step.donate-anonymously')} value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <LoginForm />
      </TabPanel>
      <TabPanel value="2">
        <RegisterForm />
      </TabPanel>
      <TabPanel value="3">
        <AnonymousMenu />
      </TabPanel>
    </TabContext>
  )
}
