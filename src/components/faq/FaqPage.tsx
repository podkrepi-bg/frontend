import { TabContext, TabPanel } from '@mui/lab'
import { Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import Layout from 'components/layout/Layout'

import OnHold from './OnHold'
import ContactUs from './ContactUs'
import FaqIntro from './FaqIntro'
import ScrollToTop from './ScrollToTop'
import VerticalTabs from './VerticalTabs'
import ExpandableListItem from './ExpandableListItem'
import {
  DONATION_QUESTIONS,
  COMMON_QUESTIONS,
  MONTHLY_DONATION_QUESTIONS,
  POTENTION_SCAM_QUESTIONS,
  CAMPAIGN_QUESTIONS,
  ATTRACTING_DONATORS_QUESTIONS,
  PARTNERSHIPS_QUESTIONS,
} from './contents'

const faqOnHold = false // Remove this when FAQ is ready

export default function FaqPage({ section }: { section: string }) {
  const { t } = useTranslation()
  const [value, setValue] = useState(section)

  if (faqOnHold) {
    return (
      <Layout title={t('nav.campaigns.faq')}>
        <OnHold />
      </Layout>
    )
  }
  return (
    <Layout title={t('nav.campaigns.faq')}>
      <FaqIntro />
      <TabContext value={value}>
        <Stack direction="row">
          <VerticalTabs setValue={setValue} />
          <TabPanel value="common-questions" sx={{ p: 0 }}>
            {COMMON_QUESTIONS.flatMap(({ header, content, visible }) =>
              visible ? <ExpandableListItem key={header} header={header} content={content} /> : [],
            )}
          </TabPanel>
          <TabPanel value="campaigns" sx={{ p: 0 }}>
            {CAMPAIGN_QUESTIONS.flatMap(({ header, content, visible }) =>
              visible ? <ExpandableListItem key={header} header={header} content={content} /> : [],
            )}
          </TabPanel>
          <TabPanel value="donations" sx={{ p: 0 }}>
            {DONATION_QUESTIONS.flatMap(({ header, content, visible }) =>
              visible ? <ExpandableListItem key={header} header={header} content={content} /> : [],
            )}
          </TabPanel>
          <TabPanel value="recurring-donations" sx={{ p: 0 }}>
            {MONTHLY_DONATION_QUESTIONS.flatMap(({ header, content, visible }) =>
              visible ? <ExpandableListItem key={header} header={header} content={content} /> : [],
            )}
          </TabPanel>
          <TabPanel value="potential-fraud" sx={{ p: 0 }}>
            {POTENTION_SCAM_QUESTIONS.flatMap(({ header, content, visible }) =>
              visible ? <ExpandableListItem key={header} header={header} content={content} /> : [],
            )}
          </TabPanel>
          <TabPanel value="attracting-donators" sx={{ p: 0 }}>
            {ATTRACTING_DONATORS_QUESTIONS.flatMap(({ header, content, visible }) =>
              visible ? <ExpandableListItem key={header} header={header} content={content} /> : [],
            )}
          </TabPanel>
          <TabPanel value="corporate-partnership" sx={{ p: 0 }}>
            {PARTNERSHIPS_QUESTIONS.flatMap(({ header, content, visible }) =>
              visible ? <ExpandableListItem key={header} header={header} content={content} /> : [],
            )}
          </TabPanel>
        </Stack>
      </TabContext>
      <ContactUs />
      <ScrollToTop />
    </Layout>
  )
}
