import React from 'react'
import Tab from '@mui/material/Tab'
import { TabList } from '@mui/lab'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

type Props = {
  setValue: (newValue: string) => void
}

const VerticalTabs = ({ setValue }: Props) => {
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
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
        <Tab label="Общи въпроси" value="common-questions" />
        <Tab label="Кампании" value="campaigns" />
        <Tab label="Дарения" value="donations" />
        <Tab label="Месечни дарения" value="recurring-donations" />
        <Tab label="Потенциални злоупотреби" value="potential-fraud" />
        <Tab label="Привличане на дарители" value="attracting-donators" />
        <Tab label="Корпоративни партньорства" value="corporate-partnership" />
      </TabList>
    </Box>
  )
}

export default VerticalTabs
