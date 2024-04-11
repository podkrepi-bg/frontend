import * as React from 'react'

import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LinkButton from 'components/common/LinkButton'
import { useTranslation } from 'next-i18next'
import { navItems } from './ProjectMenu'
import { StyledMenuAccordion, classes } from 'components/common/StyledAccordion'
export default function ProjectMenuMobile() {
  const { t } = useTranslation()

  return (
    <StyledMenuAccordion className={classes.accordionWrapper}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="aboutus-panel-content"
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
    </StyledMenuAccordion>
  )
}
