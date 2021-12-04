import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import React, { useState } from 'react'
import theme from '../../common/theme'
import useMediaQuery from '@mui/material/useMediaQuery'

interface Props {
  header: string
  content: string
}

const AccentText = () => (
  <ListItemText
    primary={'Въпрос: '}
    primaryTypographyProps={{ fontSize: '18px' }}
    sx={{
      maxWidth: '10%',
      color: theme.palette.primary.main,
      padding: '1rem',
      margin: '1rem',
    }}
  />
)

const ExpandableListItem = ({ header, content }: Props) => {
  const [open, setOpen] = useState(false)
  const isSm = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        {!isSm && <AccentText />}
        <ListItemText
          primary={header}
          sx={{ padding: '1rem' }}
          primaryTypographyProps={{ variant: 'subtitle1' }}
        />
        {open ? (
          <ExpandLess sx={{ color: theme.palette.primary.dark }} />
        ) : (
          <ExpandMore sx={{ color: theme.palette.primary.main }} />
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
    </>
  )
}

export default ExpandableListItem
