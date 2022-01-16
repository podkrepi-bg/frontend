import React, { useState } from 'react'
import { Container } from '@mui/material'
import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import ExpandableListItem from './ExpandableListItem'
import ContactUs from './ContactUs'
import VerticalTabs from './VerticalTabs'
import TabPanel from './TabPanel'
import { TabContext } from '@mui/lab'
import {
  DONATION_QUESTIONS,
  COMMON_QUESTIONS,
  MONTHLY_DONATION_QUESTIONS,
  POTENTION_SCAM_QUESTIONS,
  REQUIREMENTS_QUESTIONS,
  ATTRACTING_DONATORS_QUESTIONS,
  PARTNERSHIPS_QUESTIONS,
} from './contents'
import ScrollToTop from './ScrollToTop'

export default function FaqPage() {
  const { t } = useTranslation()
  const [value, setValue] = useState(0)

  return (
    <Layout title={t('nav.faq')}>
      <TabContext value={value.toString()}>
        <VerticalTabs value={value} setValue={setValue}>
          <TabPanel value={value} index={0}>
            {COMMON_QUESTIONS.map(({ header, content, links }) => (
              <ExpandableListItem key={header} header={header} content={content} links={links} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {REQUIREMENTS_QUESTIONS.map(({ header, content, links }) => (
              <ExpandableListItem key={header} header={header} content={content} links={links} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {DONATION_QUESTIONS.map(({ header, content, links }) => (
              <ExpandableListItem key={header} header={header} content={content} links={links} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {MONTHLY_DONATION_QUESTIONS.map(({ header, content, links }) => (
              <ExpandableListItem key={header} header={header} content={content} links={links} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={4}>
            {POTENTION_SCAM_QUESTIONS.map(({ header, content, links }) => (
              <ExpandableListItem key={header} header={header} content={content} links={links} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={5}>
            {ATTRACTING_DONATORS_QUESTIONS.map(({ header, content, links }) => (
              <ExpandableListItem key={header} header={header} content={content} links={links} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={6}>
            {PARTNERSHIPS_QUESTIONS.map(({ header, content, links }) => (
              <ExpandableListItem key={header} header={header} content={content} links={links} />
            ))}
          </TabPanel>
        </VerticalTabs>
      </TabContext>
      <ContactUs />
      <ScrollToTop />
    </Layout>
  )
}
