import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import React, { useState } from 'react'
import theme from '../../common/theme'

interface Props {
  header: string
  content: string
}

const withAccentColor = (open: boolean) => (open ? theme.palette.primary.main : 'black')

const ExpandableListItem = ({ header, content }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <List
      sx={{
        mb: 4,
        width: '100%',
        borderRadius: '6px',
        boxShadow: '0px 0.5px 1px #888888',
      }}>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText
          primary={header}
          sx={{ padding: '1rem' }}
          primaryTypographyProps={{ variant: 'subtitle1', color: `${withAccentColor(open)}` }}
        />
        {open ? (
          <Remove sx={{ color: `${withAccentColor(open)}` }} />
        ) : (
          <Add sx={{ color: `${withAccentColor(open)}` }} />
        )}
      </ListItemButton>
      <Collapse in={open} unmountOnExit>
        <List>
          <ListItemText
            sx={{ pl: 6, pb: 2, pr: 2 }}
            primary={content}
            primaryTypographyProps={{ variant: 'subtitle1', color: theme.palette.text.secondary }}
          />
        </List>
      </Collapse>
    </List>
  )
}

export default ExpandableListItem
