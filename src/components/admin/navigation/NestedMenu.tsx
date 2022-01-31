import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ModalContext } from 'context/ModalContext'
import { Button, ListItem } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import { useContext } from 'react'
import * as React from 'react'
export default function NestedMenu() {
  const { accordionExpanded, setAccordionExpanded }: any = useContext(ModalContext)
  const commongStyles = {
    display: { xs: 'none', sm: 'block' },
    letterSpacing: '1px',
    color: '#4ac3ff',
    width: '100%',
    padding: 0,
  }
  const buttonStyles = {
    display: { xs: 'block', sm: 'none' },
    width: '100%',
    padding: 0,
  }
  return (
    <Accordion expanded={accordionExpanded} elevation={0} style={{ margin: '0px' }}>
      <AccordionSummary
        sx={{ p: 0, height: '60px' }}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <ListItem
          onClick={() => setAccordionExpanded(!accordionExpanded)}
          button
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'left' },
            padding: '10px',
          }}>
          <ListItemIcon sx={{ display: { xs: 'none', sm: 'block' } }}>
            <AccountBoxIcon />
          </ListItemIcon>
          <Button sx={{ display: { xs: 'none', sm: 'block' } }}>Профил</Button>
          <Button sx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }} variant="outlined">
            Профил
          </Button>
          <ExpandMoreIcon fontSize="small" sx={{ display: { xs: 'none', sm: 'block' } }} />
        </ListItem>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0' }}>
        <div>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Button sx={commongStyles}>Акаунт</Button>
            <Button sx={buttonStyles} variant="text">
              Акаунт
            </Button>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Button sx={commongStyles}>Настройки</Button>
            <Button sx={buttonStyles} variant="text">
              Настройки
            </Button>
          </ListItem>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Button sx={commongStyles}>Изход</Button>
            <Button sx={buttonStyles} variant="text">
              Изход
            </Button>
          </ListItem>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
