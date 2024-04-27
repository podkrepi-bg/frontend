import { Collapse, List, Box, ListItemText, Paper, ListItemButton } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import React, { useState } from 'react'

import theme from 'common/theme'

type Props = {
  header: string
  content: JSX.Element
}

const withAccentColor = (open: boolean) =>
  open ? theme.palette.primary.main : theme.palette.common.black

const ExpandableListItem = ({ header, content }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <List
      component="div"
      sx={{
        my: 0,
        mx: { xs: 0, md: 3 },
        cursor: 'pointer',
      }}>
      <Paper elevation={1} sx={{ borderRadius: 2 }}>
        <ListItemButton
          disableRipple
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent',
            },
            '&.MuiButtonBase-root:focus-visible': {
              bgcolor: 'none',
              background: 'none',
              boxShadow: 'none',
              border: '1px solid',
            },
          }}
          onClick={() => setOpen((prev) => !prev)}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 3,
              py: 1,
              width: '100%',
            }}>
            <ListItemText
              primary={header}
              primaryTypographyProps={{
                variant: 'subtitle1',
                color: `${withAccentColor(open)}`,
                component: 'h3',
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
              <Box sx={{ pl: { xs: 3, md: 6 }, pb: 2, pr: 2 }}>{content}</Box>
            </List>
          </Collapse>
        </ListItemButton>
      </Paper>
    </List>
  )
}

export default ExpandableListItem
