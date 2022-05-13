import { Collapse, List, Box, ListItemText } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import React, { useState } from 'react'

import theme from 'common/theme'
import useMobile from 'common/hooks/useMobile'

type Props = {
  header: string
  content: JSX.Element
}

const withAccentColor = (open: boolean) => (open ? theme.palette.primary.main : 'black')

const ExpandableListItem = ({ header, content }: Props) => {
  const [open, setOpen] = useState(false)
  const { small } = useMobile()

  return (
    <List
      sx={{
        margin: `0 1rem 1rem ${small ? '1' : '2'}rem`,
        border: '0.2px',
        borderRadius: '6px',
        boxShadow: '0px 0.5px 1px #888888',
        cursor: 'pointer',
      }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', padding: '0.2rem' }}
        onClick={() => setOpen(!open)}>
        <ListItemText
          primary={header}
          sx={{ padding: '0.2rem' }}
          primaryTypographyProps={{
            fontFamily: 'Montserrat',
            variant: 'subtitle1',
            color: `${withAccentColor(open)}`,
          }}
        />
        {open ? (
          <ExpandLess sx={{ color: `${withAccentColor(open)}` }} />
        ) : (
          <ExpandMore sx={{ color: `${withAccentColor(open)}` }} />
        )}
      </Box>
      <Collapse in={open} unmountOnExit>
        <List>
          <Box sx={{ px: theme.spacing(2) }}>{content}</Box>
        </List>
      </Collapse>
    </List>
  )
}

export default ExpandableListItem
