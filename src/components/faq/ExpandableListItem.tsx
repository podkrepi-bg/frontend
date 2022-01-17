import {
  Collapse,
  List,
  ListItemButton,
  Box,
  ListItemText,
  useMediaQuery,
  Link,
} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import React, { useState } from 'react'
import theme from '../../common/theme'

type Props = {
  header: string
  content: JSX.Element
}

const withAccentColor = (open: boolean) => (open ? theme.palette.primary.main : 'black')

const ExpandableListItem = ({ header, content }: Props) => {
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:900px)')
  const isVerySmall = useMediaQuery('(max-width:600px)')

  return (
    <List
      sx={{
        margin: `0 1rem 1rem ${isVerySmall ? '1' : '2'}rem`,
        width: `${isMobile ? '85vw' : '60vw'}`,
        border: '0.2px',
        borderRadius: '6px',
        boxShadow: '0px 0.5px 1px #888888',
      }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', padding: '1rem' }}
        onClick={() => setOpen(!open)}>
        <ListItemText
          primary={header}
          sx={{ padding: '1rem' }}
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
          <Box sx={{ pl: 6, pb: 2, pr: 2 }}>{content}</Box>
        </List>
      </Collapse>
    </List>
  )
}

export default ExpandableListItem
