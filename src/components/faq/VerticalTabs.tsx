import React from 'react'
import Tab from '@mui/material/Tab'
import { TabList } from '@mui/lab'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { FaqCategory } from './contents/faq-categories.enum'
import { useTranslation } from 'react-i18next'

type Props = {
  faqCategories: FaqCategory[]
  setSelectedFaqCategory: (newValue: FaqCategory) => void
}

const VerticalTabs = ({ faqCategories, setSelectedFaqCategory }: Props) => {
  const router = useRouter()
  const { t } = useTranslation('faq')

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: FaqCategory) => {
    router.push(
      {
        pathname: '/faq/[section]',
        query: { section: newValue },
      },
      undefined,
      { shallow: true },
    )
    setSelectedFaqCategory(newValue)
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', display: 'flex', justifyContent: 'center' }}>
      <TabList
        orientation="vertical"
        variant="scrollable"
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider', mb: 4 }}>
        {faqCategories.map((category) => {
          return <Tab key={category} value={category} label={t(`categories.${category}`)} />
        })}
      </TabList>
    </Box>
  )
}

export default VerticalTabs
