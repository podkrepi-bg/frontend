/**
 * Payment Drawer Component
 *
 * A redesigned payment drawer for campaign pages with two states:
 * - Collapsed (default): Shows minimal info with progress and donate button
 * - Expanded: Shows full info with donations/wishes tabs and sharing options
 *
 * Reference: https://github.com/podkrepi-bg/frontend/issues/2027
 * Figma: https://www.figma.com/design/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=8281-24205
 */

export { default as PaymentDrawer } from './PaymentDrawer'
export { default as CampaignProgressPie } from './CampaignProgressPie'
export { default as ShareButtons } from './ShareButtons'
export { default as DonationsTab } from './DonationsTab'
export { default as WishesTab } from './WishesTab'

// Export types
export type {
  PaymentDrawerProps,
  PaymentDrawerCollapsedProps,
  PaymentDrawerExpandedProps,
  CampaignProgressProps,
  ShareButtonsProps,
  DonationsTabProps,
  WishesTabProps,
  DrawerState,
  TabValue,
  SharePlatform,
} from './types'
