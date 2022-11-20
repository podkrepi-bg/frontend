import { TabContext, TabPanel } from '@mui/lab'
import { Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import Layout from 'components/layout/Layout'

import ContactUs from './ContactUs'
import ScrollToTop from './ScrollToTop'
import VerticalTabs from './VerticalTabs'
import ExpandableListItem from './ExpandableListItem'
import {
  DONATION_QUESTIONS,
  COMMON_QUESTIONS,
  CAMPAIGN_QUESTIONS,
  ATTRACTING_DONATORS_QUESTIONS,
  PARTNERSHIPS_QUESTIONS,
} from './contents'
import { FaqCategory } from './contents/faq-categories.enum'
import { ContentType } from './contents/content-type'
import { filterFaqQuestionByVisibility } from './helpers/filters'

const FAQ_PAGE_QUESTIONS: Record<string, ContentType[]> = {
  [FaqCategory.Common]: COMMON_QUESTIONS,
  [FaqCategory.Campaigns]: CAMPAIGN_QUESTIONS,
  [FaqCategory.Donations]: DONATION_QUESTIONS,
  [FaqCategory.AttractDonators]: ATTRACTING_DONATORS_QUESTIONS,
  [FaqCategory.CorporatePartnership]: PARTNERSHIPS_QUESTIONS,
}

export default function FaqPage({ section }: { section: FaqCategory }) {
  const { t } = useTranslation()
  const [value, setValue] = useState(section)

  return (
    <Layout title={t('nav.campaigns.faq')}>
      {/* <FaqIntro /> */}
      <TabContext value={value}>
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <VerticalTabs setValue={setValue} />

          {Object.keys(FAQ_PAGE_QUESTIONS).map((categoryKey) => {
            return (
              <TabPanel key={categoryKey} value={categoryKey} sx={{ p: 0 }}>
                {FAQ_PAGE_QUESTIONS[categoryKey]
                  .filter(filterFaqQuestionByVisibility)
                  .flatMap(({ header, content }) => (
                    <ExpandableListItem key={header} header={header} content={content} />
                  ))}
              </TabPanel>
            )
          })}
        </Stack>
      </TabContext>
      <ContactUs />
      <ScrollToTop />
    </Layout>
  )
}
