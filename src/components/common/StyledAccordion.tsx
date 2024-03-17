import { Accordion, styled } from '@mui/material'

const PREFIX = 'MenuMobile'

export const classes = {
  accordionWrapper: `${PREFIX}-accordionWrapper`,
  accordionSummary: `${PREFIX}-accordionSummary`,
  menuItem: `${PREFIX}-menuItem`,
}

export const StyledMenuAccordion = styled(Accordion)(({ theme }) => ({
  [`&.${classes.accordionWrapper}`]: {
    boxShadow: 'none',
    borderTop: '2px solid lightgrey',
    borderRadius: 0,
  },

  [`& .${classes.accordionSummary}`]: {
    fontWeight: 500,
    minHeight: theme.spacing(8),
    padding: theme.spacing(0, 1),
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.common.black,
  },

  [`& .${classes.menuItem}`]: {
    justifyContent: 'start',
    fontWeight: 400,
    color: theme.palette.common.black,
  },

  '.Mui-expanded': {
    backgroundColor: '#F0F0F0',
  },
}))
