import useMobile from 'common/hooks/useMobile'

import { usePaymentDrawerLogic } from './usePaymentDrawerLogic'
import MobilePaymentDrawer from './MobilePaymentDrawer'
import DesktopPaymentDrawer from './DesktopPaymentDrawer'
import { PaymentDrawerProps } from './types'

/**
 * Payment Drawer Component
 *
 * Orchestrator component that renders the appropriate viewport-specific drawer.
 *
 * MOBILE:
 * - Closed: Shows pie chart + "Дарения" button (opens drawer) + "Дарете сега" (redirects to donation)
 * - Open: "Споделяне" replaces chart, X button to close, swipe down to close
 *
 * DESKTOP:
 * - Always visible sidebar with max-height 500px and drop-shadow
 * - No collapsed state
 *
 * Reference: https://github.com/podkrepi-bg/frontend/issues/2027
 * Figma: https://www.figma.com/design/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=26824-104188
 */
export default function PaymentDrawer({
  campaign,
  initialState = 'collapsed',
}: PaymentDrawerProps) {
  const { mobile } = useMobile()
  const logic = usePaymentDrawerLogic(campaign, initialState, mobile)

  return mobile ? <MobilePaymentDrawer {...logic} /> : <DesktopPaymentDrawer {...logic} />
}
