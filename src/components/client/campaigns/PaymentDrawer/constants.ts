import { styled, Theme } from '@mui/material/styles'
import { Box, Grid } from '@mui/material'

// =============================================================================
// CLASS NAMES - Organized by category
// =============================================================================

export const PREFIX = 'PaymentDrawer'

export const classes = {
  mobileClosedWrapper: `${PREFIX}-mobileClosedWrapper`,
  mobileCommissionTextContent: `${PREFIX}-mobileCommissionTextContent`,
  mobileClosedContent: `${PREFIX}-mobileClosedContent`,
  mobileClosedLeft: `${PREFIX}-mobileClosedLeft`,
  mobileClosedRight: `${PREFIX}-mobileClosedRight`,

  mobileDrawer: `${PREFIX}-mobileDrawer`,
  drawerHeader: `${PREFIX}-drawerHeader`,
  closeButton: `${PREFIX}-closeButton`,

  desktopWrapper: `${PREFIX}-desktopWrapper`,
  desktopTabsWrapper: `${PREFIX}-desktopTabsWrapper`,
  desktopTab: `${PREFIX}-desktopTab`,
  desktopTabSelected: `${PREFIX}-desktopTabSelected`,

  swipeHandle: `${PREFIX}-swipeHandle`,
  commissionText: `${PREFIX}-commissionText`,

  tabsContainer: `${PREFIX}-tabsContainer`,
  tab: `${PREFIX}-tab`,
  tabSelected: `${PREFIX}-tabSelected`,

  contentSection: `${PREFIX}-contentSection`,
  columnHeaders: `${PREFIX}-columnHeaders`,

  amountDisplay: `${PREFIX}-amountDisplay`,
  amountRow: `${PREFIX}-amountRow`,
  moneyUnit: `${PREFIX}-moneyUnit`,
  moneyFraction: `${PREFIX}-moneyFraction`,
  moneyLabel: `${PREFIX}-moneyLabel`,
  progressSection: `${PREFIX}-progressSection`,

  summarySection: `${PREFIX}-summarySection`,
  summaryText: `${PREFIX}-summaryText`,
  summaryTextLine1: `${PREFIX}-summaryTextLine1`,
  summaryTextLine2: `${PREFIX}-summaryTextLine2`,

  donationsButton: `${PREFIX}-donationsButton`,
  donateNowButton: `${PREFIX}-donateNowButton`,
  donateButton: `${PREFIX}-donateButton`,
  donateButtonYellow: `${PREFIX}-donateButtonYellow`,
  shareButton: `${PREFIX}-shareButton`,
  shareButtonLarge: `${PREFIX}-shareButtonLarge`,
  shareButtonOutline: `${PREFIX}-shareButtonOutline`,
  buttonRow: `${PREFIX}-buttonRow`,

  noCommissionInfo: `${PREFIX}-noCommissionInfo`,
  infoIcon: `${PREFIX}-infoIcon`,
  shareSection: `${PREFIX}-shareSection`,
}

// =============================================================================
// BASE STYLES - Reusable style objects
// =============================================================================

const createBaseStyles = (theme: Theme) => ({
  swipeHandle: {
    width: 50,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 12,
    margin: '0 auto',
    marginBottom: theme.spacing(1),
  },

  commissionText: {
    fontFamily: theme.typography.h1.fontFamily, // Montserrat
    fontWeight: 500,
    fontSize: 10,
    lineHeight: '150%',
    letterSpacing: '0.15px',
    color: theme.palette.text.primary,
    textAlign: 'left' as const,
    marginBottom: 0,
    paddingLeft: 0,
  },

  tabBase: {
    textTransform: 'capitalize' as const,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: 'transparent',
    padding: theme.spacing(1),
    borderRadius: 0,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    fontSize: theme.typography.pxToRem(16),
    fontFamily: theme.typography.fontFamily, // Commissioner
    fontWeight: 500,
    letterSpacing: '0.46px',
    lineHeight: '150%',
  },

  tabSelected: {
    fontWeight: 600,
    borderBottom: `2px solid ${theme.palette.common.black}`,
  },

  tabsContainer: {
    display: 'flex',
    flexDirection: 'row' as const,
    width: '100%',
    border: 0,
    borderRadius: 0,
    overflow: 'hidden',
  },

  contentSection: {
    overflowY: 'auto' as const,
    marginBottom: theme.spacing(2),
  },

  amountDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1),
  },

  amountRow: {
    display: 'flex',
    flexDirection: 'column' as const,
  },

  moneyUnit: (fontSize = 20) => ({
    fontSize: theme.typography.pxToRem(fontSize),
    color: theme.palette.common.black,
    fontWeight: 600,
  }),

  moneyFraction: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.common.black,
    verticalAlign: 'top',
  },

  moneyLabel: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.grey[600],
  },

  progressSection: {
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },

  summarySection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(1.5),
    background: theme.podkrepiGradients.summary,
    borderRadius: 11,
    margin: theme.spacing(1.5, 0),
  },

  summaryText: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing(0.25),
  },

  summaryTextLine: (color = 'rgba(0, 0, 0, 0.8)') => ({
    fontFamily: theme.typography.h1.fontFamily, // Montserrat
    fontWeight: 600,
    fontSize: 10,
    lineHeight: '14px',
    letterSpacing: '0px',
    color,
  }),

  buttonRow: {
    display: 'flex',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2),
  },

  actionButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0.5, 1.5),
    height: 36,
    borderRadius: theme.spacing(3),
    textTransform: 'none' as const,
    fontWeight: 500,
  },

  shareButtonOutline: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0.5, 1.5),
    height: 36,
    border: `1px solid ${theme.palette.yellowVariants.light}`,
    borderRadius: theme.spacing(3),
    color: theme.palette.common.black,
    textTransform: 'none' as const,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },

  donateButtonYellow: {
    flex: 1,
    padding: theme.spacing(0.5, 1.5),
    height: 36,
    backgroundColor: theme.palette.yellowVariants.light,
    color: theme.palette.common.black,
    borderRadius: theme.spacing(3),
    textTransform: 'none' as const,
    fontWeight: 600,
    '& svg': {
      color: theme.palette.accent.heart,
    },
    '&:hover': {
      backgroundColor: theme.palette.yellowVariants.hover,
    },
  },

  donateButton: {
    height: theme.spacing(6),
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
    letterSpacing: theme.typography.pxToRem(0.4),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(3),
    textTransform: 'none' as const,
    '& svg': {
      color: theme.palette.accent.heart,
    },
    '&:hover': {
      backgroundColor: '#0098e3',
    },
  },

  noCommissionInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(2),
    '& p': {
      fontSize: theme.typography.pxToRem(12),
      color: theme.palette.grey[600],
    },
  },

  infoIcon: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.grey[500],
  },

  shareSection: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
})

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

/**
 * Mobile Closed Wrapper - Fixed bottom bar when drawer is closed
 */
export const MobileClosedWrapper = styled(Box)(({ theme }) => {
  const baseStyles = createBaseStyles(theme)

  return {
    [`&.${classes.mobileClosedWrapper}`]: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.podkrepiShadows.drawer,
      padding: theme.spacing(1.5, 2, 2, 2),
      zIndex: 1000,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },

    [`& .${classes.swipeHandle}`]: baseStyles.swipeHandle,

    [`& .${classes.mobileCommissionTextContent}`]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },

    [`& .${classes.mobileClosedContent}`]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(2),
    },

    [`& .${classes.mobileClosedLeft}`]: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    },

    [`& .${classes.mobileClosedRight}`]: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      flex: 1,
      justifyContent: 'space-between',
    },

    [`& .${classes.donationsButton}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.text.primary,
      textTransform: 'none',
      fontFamily: theme.typography.fontFamily, // Commissioner
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.46px',
      lineHeight: '14px',
      borderRadius: 100,
      border: `2px solid ${theme.palette.secondary.main}`,
      padding: '4px 10px',
      height: 36,
      width: 134,
      minWidth: 'auto',
      '&:hover': {
        backgroundColor: theme.palette.yellowVariants.background,
      },
      '& .MuiButton-endIcon': {
        marginLeft: theme.spacing(0.5),
      },
    },

    [`& .${classes.donateNowButton}`]: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.black,
      textTransform: 'none',
      fontFamily: theme.typography.fontFamily, // Commissioner
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.46px',
      lineHeight: '14px',
      borderRadius: 100,
      padding: '4px 10px',
      height: 36,
      width: 134,
      minWidth: 'auto',
      '&:hover': {
        backgroundColor: theme.palette.yellowVariants.hover,
      },
      '& .MuiButton-endIcon': {
        marginLeft: theme.spacing(0.5),
      },
      '& svg': {
        color: theme.palette.accent.heart,
        width: 18,
        height: 18,
      },
    },

    [`& .${classes.commissionText}`]: baseStyles.commissionText,

    [`& .${classes.shareButton}`]: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      backgroundColor: 'transparent',
      color: theme.palette.common.black,
      textTransform: 'none',
      fontWeight: 500,
      borderRadius: theme.spacing(3),
      border: `1px solid ${theme.palette.grey[400]}`,
      padding: theme.spacing(1, 2),
      '&:hover': {
        backgroundColor: theme.palette.grey[100],
      },
    },
  }
})

/**
 * Mobile Drawer Content - Expanded drawer content
 */
export const MobileDrawerContent = styled(Box)(({ theme }) => {
  const baseStyles = createBaseStyles(theme)

  return {
    [`&.${classes.mobileDrawer}`]: {
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      borderTopLeftRadius: theme.spacing(2),
      borderTopRightRadius: theme.spacing(2),
      padding: theme.spacing(2, 2, 4, 2),
      maxHeight: '95vh',
      overflowY: 'auto',
    },

    [`& .${classes.swipeHandle}`]: {
      ...baseStyles.swipeHandle,
      width: 40,
      backgroundColor: theme.palette.grey[400],
      borderRadius: 2,
      marginBottom: theme.spacing(2),
    },

    [`& .${classes.drawerHeader}`]: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },

    [`& .${classes.closeButton}`]: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
      backgroundColor: 'transparent',
      padding: 0,
    },

    [`& .${classes.shareButtonLarge}`]: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      backgroundColor: '#E3F2FD',
      color: theme.palette.primary.main,
      textTransform: 'none',
      fontWeight: 500,
      borderRadius: theme.spacing(3),
      padding: theme.spacing(1, 2),
      '&:hover': {
        backgroundColor: '#BBDEFB',
      },
    },

    [`& .${classes.amountDisplay}`]: baseStyles.amountDisplay,
    [`& .${classes.amountRow}`]: baseStyles.amountRow,
    [`& .${classes.moneyUnit}`]: baseStyles.moneyUnit(20),
    [`& .${classes.moneyFraction}`]: baseStyles.moneyFraction,
    [`& .${classes.moneyLabel}`]: baseStyles.moneyLabel,
    [`& .${classes.progressSection}`]: baseStyles.progressSection,

    [`& .${classes.donateButton}`]: baseStyles.donateButton,

    [`& .${classes.noCommissionInfo}`]: baseStyles.noCommissionInfo,
    [`& .${classes.infoIcon}`]: baseStyles.infoIcon,

    [`& .${classes.tabsContainer}`]: {
      ...baseStyles.tabsContainer,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    [`& .${classes.tab}`]: baseStyles.tabBase,
    [`& .${classes.tabSelected}`]: baseStyles.tabSelected,

    [`& .${classes.summarySection}`]: baseStyles.summarySection,
    [`& .${classes.summaryText}`]: baseStyles.summaryText,
    [`& .${classes.summaryTextLine1}`]: baseStyles.summaryTextLine('rgba(0, 0, 0, 0.8)'),
    [`& .${classes.summaryTextLine2}`]: baseStyles.summaryTextLine(theme.palette.common.black),

    [`& .${classes.buttonRow}`]: baseStyles.buttonRow,
    [`& .${classes.shareButtonOutline}`]: baseStyles.shareButtonOutline,
    [`& .${classes.donateButtonYellow}`]: baseStyles.donateButtonYellow,
    [`& .${classes.shareSection}`]: baseStyles.shareSection,

    [`& .${classes.contentSection}`]: baseStyles.contentSection,
  }
})

/**
 * Desktop Wrapper - Always visible sidebar
 */
export const DesktopWrapper = styled(Grid)(({ theme }) => {
  const baseStyles = createBaseStyles(theme)

  return {
    [`&.${classes.desktopWrapper}`]: {
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(1.5),
      boxShadow: theme.podkrepiShadows.card,
      width: 360,
      maxHeight: '600px',
      overflowY: 'auto',
    },

    [`& .${classes.amountDisplay}`]: baseStyles.amountDisplay,
    [`& .${classes.amountRow}`]: baseStyles.amountRow,
    [`& .${classes.moneyUnit}`]: baseStyles.moneyUnit(22),
    [`& .${classes.moneyFraction}`]: baseStyles.moneyFraction,
    [`& .${classes.moneyLabel}`]: baseStyles.moneyLabel,
    [`& .${classes.progressSection}`]: baseStyles.progressSection,

    [`& .${classes.donateButton}`]: baseStyles.donateButton,

    [`& .${classes.noCommissionInfo}`]: baseStyles.noCommissionInfo,
    [`& .${classes.infoIcon}`]: baseStyles.infoIcon,

    [`& .${classes.desktopTabsWrapper}`]: {
      ...baseStyles.tabsContainer,
      margin: 0,
    },
    [`& .${classes.desktopTab}`]: baseStyles.tabBase,
    [`& .${classes.desktopTabSelected}`]: baseStyles.tabSelected,

    [`& .${classes.summarySection}`]: baseStyles.summarySection,
    [`& .${classes.summaryText}`]: baseStyles.summaryText,
    [`& .${classes.summaryTextLine1}`]: baseStyles.summaryTextLine('rgba(0, 0, 0, 0.8)'),
    [`& .${classes.summaryTextLine2}`]: baseStyles.summaryTextLine(theme.palette.common.black),

    [`& .${classes.buttonRow}`]: baseStyles.buttonRow,
    [`& .${classes.shareButtonOutline}`]: baseStyles.shareButtonOutline,
    [`& .${classes.donateButtonYellow}`]: baseStyles.donateButtonYellow,
    [`& .${classes.shareSection}`]: baseStyles.shareSection,

    [`& .${classes.contentSection}`]: {
      ...baseStyles.contentSection,
      marginBottom: theme.spacing(1),
    },
  }
})
