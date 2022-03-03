import { TabContext } from '@mui/lab'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useMemo, useState } from 'react'

import Layout from 'components/layout/Layout'

import OnHold from './OnHold'
import TabPanel from './TabPanel'
import ContactUs from './ContactUs'
import ScrollToTop from './ScrollToTop'
import VerticalTabs from './VerticalTabs'
import ExpandableListItem from './ExpandableListItem'
import {
  DONATION_QUESTIONS,
  COMMON_QUESTIONS,
  MONTHLY_DONATION_QUESTIONS,
  POTENTION_SCAM_QUESTIONS,
  REQUIREMENTS_QUESTIONS,
  ATTRACTING_DONATORS_QUESTIONS,
  PARTNERSHIPS_QUESTIONS,
} from './contents'

const faqOnHold = false // Remove this when FAQ is ready

export default function FaqPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const section = useMemo(() => Number(router.asPath.split('#').pop()), [])
  const [value, setValue] = useState(isNaN(section) ? 0 : section)

  if (faqOnHold) {
    return (
      <Layout title={t('nav.campaigns.faq')}>
        <OnHold />
      </Layout>
    )
  }

  return (
    <Layout title={t('nav.campaigns.faq')}>
      <TabContext value={value.toString()}>
        <VerticalTabs value={value} setValue={setValue}>
          <TabPanel value={value} index={0}>
            {COMMON_QUESTIONS.flatMap(({ header, content, visible }) =>
              visible === true ? (
                <ExpandableListItem key={header} header={header} content={content} />
              ) : (
                []
              ),
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {REQUIREMENTS_QUESTIONS.map(({ header, content }) => (
              <ExpandableListItem key={header} header={header} content={content} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {DONATION_QUESTIONS.map(({ header, content }) => (
              <ExpandableListItem key={header} header={header} content={content} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {MONTHLY_DONATION_QUESTIONS.map(({ header, content }) => (
              <ExpandableListItem key={header} header={header} content={content} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={4}>
            {POTENTION_SCAM_QUESTIONS.map(({ header, content }) => (
              <ExpandableListItem key={header} header={header} content={content} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={5}>
            {ATTRACTING_DONATORS_QUESTIONS.map(({ header, content }) => (
              <ExpandableListItem key={header} header={header} content={content} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={6}>
            {PARTNERSHIPS_QUESTIONS.map(({ header, content }) => (
              <ExpandableListItem key={header} header={header} content={content} />
            ))}
          </TabPanel>
        </VerticalTabs>
      </TabContext>
      <ContactUs />
      <ScrollToTop />
    </Layout>
  )
}
