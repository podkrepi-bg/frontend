import { Container, Tab } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import Layout from 'components/client/layout/Layout'
import { PartnersTab, PartnersTabs, tabs } from './helpers/tabs'
import { StyledTabs, Title } from './Partners.styled'

export default function ContactPage() {
  const [value, setValue] = React.useState('')

  const { t } = useTranslation()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => setValue(newValue)

  const tab = useMemo<PartnersTab>(() => {
    return tabs.find((tab) => tab.slug === value) ?? tabs[0]
  }, [value])

  const { Component: SelectedTab } = tab

  return (
    <Layout title={t('partners:title')}>
      <Container>
        <StyledTabs value={tab.slug} onChange={handleChange} variant="scrollable">
          <Tab value={PartnersTabs.partners} label={<Title>{t('partners:tabs.partners')}</Title>} />
          <Tab
            value={PartnersTabs.giversAndGuarants}
            label={<Title>{t('partners:tabs.giversAndGuarants')}</Title>}
          />
          <Tab
            value={PartnersTabs.theMediasAboutUs}
            label={<Title>{t('partners:tabs.theMediaAboutUs')}</Title>}
          />
        </StyledTabs>
      </Container>

      {SelectedTab && <SelectedTab />}
    </Layout>
  )
}
