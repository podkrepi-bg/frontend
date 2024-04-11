import * as React from 'react'

import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LinkButton from 'components/common/LinkButton'
import { useTranslation } from 'next-i18next'
import { navItems } from './DonationMenu'
import { StyledMenuAccordion, classes } from 'components/common/StyledAccordion'

export default function DonationMenuMobile() {
  const { t } = useTranslation()

  return (
    <StyledMenuAccordion className={classes.accordionWrapper}>
      <AccordionSummary
        className={classes.accordionSummary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="campaign-panel-content">
        {t('nav.campaigns.index')}
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
