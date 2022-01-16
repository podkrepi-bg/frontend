import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useMediaQuery } from '@mui/material'

type Props = {
  value: number
  setValue: (newValue: number) => void
  children: JSX.Element[]
}

const VerticalTabs = ({ value, setValue, children }: Props) => {
  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue)
  }
  const isMobile = useMediaQuery('(max-width:900px)')

  return (
    <Box sx={{ bgcolor: 'background.paper', display: `${isMobile ? 'block' : 'flex'}` }}>
      <Tabs
        orientation={isMobile ? 'horizontal' : 'vertical'}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider', mb: 4 }}>
        <Tab sx={{ alignItems: 'start' }} label="Общи въпроси" />
        <Tab sx={{ alignItems: 'start' }} label="Условия" />
        <Tab sx={{ alignItems: 'start' }} label="Дарения" />
        <Tab sx={{ alignItems: 'start' }} label="Месечни дарения" />
        <Tab sx={{ alignItems: 'start' }} label="Потенциални злоупотреби" />
        <Tab sx={{ alignItems: 'start' }} label="Привличане на дарители" />
        <Tab sx={{ alignItems: 'start' }} label="Корпоративни партньорства" />
      </Tabs>
      {children}
    </Box>
  )
}

export default VerticalTabs
