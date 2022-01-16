import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

type Props = {
  value: number
  setValue: (newValue: number) => void
  children: JSX.Element[]
}

const VerticalTabs = ({ value, setValue, children }: Props) => {
  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    console.log(newValue)
    setValue(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}>
        <Tab label="Общи въпроси" />
        <Tab label="Условия" />
        <Tab label="Дарения" />
        <Tab label="Месечни дарения" />
        <Tab label="Потенциални злоупотреби" />
        <Tab label="Привличане на дарители" />
        <Tab label="Корпоративни партньорства" />
      </Tabs>
      {children}
    </Box>
  )
}

export default VerticalTabs
