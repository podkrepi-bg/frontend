import { Collapse, List, Box, ListItemText, Paper } from '@mui/material'
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
  const { mobile } = useMobile()

  return (
    <List
      sx={{
        my: 0,
        mx: 3,
        width: `${mobile ? '85vw' : '60vw'}`,
        cursor: 'pointer',
      }}>
      <Paper elevation={1} sx={{ borderRadius: 2 }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', px: 3, py: 1 }}
          onClick={() => setOpen(!open)}>
          <ListItemText
            primary={header}
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
        <Collapse in={open}>
          <List>
            <Box sx={{ pl: 6, pb: 2, pr: 2 }}>{content}</Box>
          </List>
        </Collapse>
      </Paper>
    </List>
  )
}

export default ExpandableListItem
