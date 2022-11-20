import React from 'react'
import Tab from '@mui/material/Tab'
import { TabList } from '@mui/lab'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { FaqCategory } from './contents/faq-categories.enum'

type Props = {
  setValue: (newValue: FaqCategory) => void
}

const VerticalTabs = ({ setValue }: Props) => {
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: FaqCategory) => {
    router.push(
      {
        pathname: '/faq/[section]',
        query: { section: newValue },
      },
      undefined,
      { shallow: true },
    )
    setValue(newValue)
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', display: 'flex', justifyContent: 'center' }}>
      <TabList
        orientation="vertical"
        variant="scrollable"
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider', mb: 4 }}>
        <Tab label="Общи въпроси" value={FaqCategory.Common} />
        <Tab label="Кампании" value={FaqCategory.Campaigns} />
        <Tab label="Дарения" value={FaqCategory.Donations} />
        <Tab label="Привличане на дарители" value={FaqCategory.AttractDonators} />
        <Tab label="Корпоративни партньорства" value={FaqCategory.CorporatePartnership} />
      </TabList>
    </Box>
  )
}

export default VerticalTabs
