import React, { useState } from 'react'
import {
  Collapse,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { observer } from 'mobx-react'
import { SubListStore } from 'stores/SubListStore'

type Props = {
  title: string
  icon: React.ReactElement<SvgIconProps>
  data: string[]
}

export default observer(function SubList({ title, icon, data }: Props) {
  //Using the useState hook to avoid making new instance of the store on every render
  //This way every sublist instantiates its own individual store
  //Therefore code can be easily extended
  const [store] = useState(() => new SubListStore())
  const { isOpen, toggle } = store

  return (
    <>
      <ListItem button key={title}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        <IconButton size="small" edge="start" color="inherit" onClick={toggle}>
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </ListItem>
      <Collapse in={isOpen} timeout={0} unmountOnExit>
        {data.map((x: string) => (
          <ListItem button key={x}>
            <ListItemText primary={x} />
          </ListItem>
        ))}
      </Collapse>
    </>
  )
})
