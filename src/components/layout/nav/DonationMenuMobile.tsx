import * as React from 'react'
import { styled } from '@mui/material/styles'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'
import { useTranslation } from 'next-i18next'

const PREFIX = 'DonationMenuMobile'

const classes = {
  accordionWrapper: `${PREFIX}-accordionWrapper`,
  accordionSummary: `${PREFIX}-accordionSummary`,
  menuItem: `${PREFIX}-menuItem`,
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  [`&.${classes.accordionWrapper}`]: {
    boxShadow: 'none',
    border: '2px solid rgba(50, 169, 254, 0.5)',
    borderRadius: '25px !important',
    color: theme.palette.primary.dark,
    textAlign: 'center',
  },

  [`& .${classes.accordionSummary}`]: {
    fontWeight: 500,
    fontSize: theme.spacing(1.75),
    minHeight: theme.spacing(5),
    '& > *': {
      flexGrow: 0,
      margin: 0,
      color: theme.palette.primary.dark,
    },
  },

  [`& .${classes.menuItem}`]: {
    whiteSpace: 'nowrap',
    display: 'block',
    color: theme.palette.primary.main,
  },
}))

export default function DonationMenuMobile() {
  const { t } = useTranslation()

  return (
    <StyledAccordion className={classes.accordionWrapper}>
      <AccordionSummary
        className={classes.accordionSummary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content">
        {t('nav.donation-menu')}
      </AccordionSummary>
      <AccordionDetails>
        <LinkButton variant="text" href={routes.campaigns.index} className={classes.menuItem}>
          {t('nav.campaigns.index')}
        </LinkButton>
        {/* temporarily disabled */}
        {/* <LinkButton variant="text" href={routes.campaigns.create} className={classes.menuItem}>
          {t('nav.campaigns.create')}
        </LinkButton> */}
        <LinkButton variant="text" href={routes.termsOfService} className={classes.menuItem}>
          {t('components.footer.terms-of-service')}
        </LinkButton>
        <LinkButton variant="text" href={routes.faq} className={classes.menuItem}>
          {t('nav.campaigns.faq')}
        </LinkButton>
      </AccordionDetails>
    </StyledAccordion>
  )
}
