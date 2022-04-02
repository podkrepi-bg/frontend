import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

import useMobile from 'common/hooks/useMobile'

type Props = {
  value: number
  setValue: (newValue: number) => void
  children: JSX.Element[]
}

const VerticalTabs = ({ value, setValue, children }: Props) => {
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    router.push(`#${newValue}`)
    setValue(newValue)
  }
  const { mobile } = useMobile()

  return (
    <Box sx={{ bgcolor: 'background.paper', display: `${mobile ? 'block' : 'flex'}` }}>
      <Tabs
        orientation={mobile ? 'horizontal' : 'vertical'}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider', mb: 4 }}>
        <Tab sx={{ alignItems: 'start' }} label="Общи въпроси" />
        <Tab sx={{ alignItems: 'start' }} label="Кампании" />
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
