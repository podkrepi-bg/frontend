import React, { useState } from 'react'
import { observer } from 'mobx-react'
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

import { DrawerStore } from 'stores/DrawerStore'

type Props = {
  title: string
  icon: React.ReactElement<SvgIconProps>
  data: string[]
}

export default observer(function SubList({ title, icon, data }: Props) {
  const { isSublistOpen, toggleSublist } = DrawerStore

  return (
    <>
      <ListItem button key={title}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        <IconButton size="small" edge="start" color="inherit" onClick={toggleSublist}>
          {isSublistOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </ListItem>
      <Collapse in={isSublistOpen} timeout={0} unmountOnExit>
        {data.map((x: string) => (
          <ListItem button key={x}>
            <ListItemText primary={x} />
          </ListItem>
        ))}
      </Collapse>
    </>
  )
})
