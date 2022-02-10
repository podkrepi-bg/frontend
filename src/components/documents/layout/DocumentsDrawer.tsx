import React from 'react'
import { observer } from 'mobx-react'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ListIcon from '@mui/icons-material/List'
import HighlightIcon from '@mui/icons-material/Highlight'
import MoodIcon from '@mui/icons-material/Mood'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import PeopleIcon from '@mui/icons-material/People'
import TextFieldsIcon from '@mui/icons-material/TextFields'

import { DrawerStore } from 'stores/DrawerStore'
import SubList from 'components/documents/layout/SubList'

export default observer(function DocumentsDrawer() {
  const { isOpen, toggle } = DrawerStore

  const tasksList = {
    title: 'Задачи',
    data: ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4'],
    icon: <ListIcon />,
  }

  const listItems = [
    {
      title: 'Кампании',
      icon: <HighlightIcon />,
    },
    {
      title: 'Доброволци',
      icon: <MoodIcon />,
    },
    {
      title: 'Плащания',
      icon: <CreditCardIcon />,
    },
    {
      title: 'Потребители',
      icon: <PeopleIcon />,
    },
    {
      title: 'Документи',
      icon: <TextFieldsIcon />,
    },
  ]

  return (
    <>
      <Drawer
        sx={{
          width: 200,
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
          },
        }}
        transitionDuration={0}
        variant="persistent"
        anchor="left"
        open={isOpen}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
          <IconButton onClick={toggle}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </Box>
        <Divider />
        <SubList {...tasksList} />
        {listItems.map((x) => (
          <ListItem button key={x.title}>
            <ListItemIcon>{x.icon}</ListItemIcon>
            <ListItemText>{x.title}</ListItemText>
          </ListItem>
        ))}
      </Drawer>
    </>
  )
})
