import * as React from 'react'
import { styled } from '@mui/material/styles'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LinkButton from 'components/common/LinkButton'
import { useTranslation } from 'next-i18next'
import { navItems } from './ProjectMenu'

const PREFIX = 'ProfileMenuMobile'

const classes = {
  accordionWrapper: `${PREFIX}-accordionWrapper`,
  accordionSummary: `${PREFIX}-accordionSummary`,
  menuItem: `${PREFIX}-menuItem`,
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  [`&.${classes.accordionWrapper}`]: {
    boxShadow: 'none',
    borderTop: '2px solid lightgrey',
    borderRadius: 0,
  },

  [`& .${classes.accordionSummary}`]: {
    fontWeight: 500,
    minHeight: theme.spacing(8),
    padding: theme.spacing(0, 1),
  },

  [`& .${classes.menuItem}`]: {
    justifyContent: 'start',
    fontWeight: 300,
    color: theme.palette.common.black,
  },

  '.Mui-expanded': {
    backgroundColor: '#F0F0F0',
  },
}))

export default function ProjectMenuMobile() {
  const { t } = useTranslation()

  return (
    <StyledAccordion className={classes.accordionWrapper}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        className={classes.accordionSummary}>
        {t('nav.about.about-us')}
      </AccordionSummary>
      <AccordionDetails>
        {navItems.map(({ href, label }, key) => (
          <LinkButton key={key} fullWidth variant="text" href={href} className={classes.menuItem}>
            {t(label)}
          </LinkButton>
        ))}
      </AccordionDetails>
    </StyledAccordion>
  )
}
