import { CampaignResponse, CampaignDonation } from 'gql/campaigns'
import { DonationWishPaginatedResponse } from 'gql/donationWish'
import { CampaignState } from '../helpers/campaign.enums'

/**
 * Payment Drawer Types
 *
 * This file contains all TypeScript interfaces for the redesigned Payment Drawer component.
 * Reference: https://github.com/podkrepi-bg/frontend/issues/2027
 */

// ============================================================================
// Drawer State Types
// ============================================================================

export type DrawerState = 'collapsed' | 'expanded'

export type TabValue = 'donors' | 'wishes'

// ============================================================================
// Campaign Progress Types
// ============================================================================

export interface CampaignProgressData {
  currentAmount: number
  targetAmount: number
  currency: string
  state: CampaignState
  donors?: number
}

export interface CampaignProgressProps {
  /** Current amount raised */
  currentAmount: number
  /** Target campaign amount */
  targetAmount: number
  /** Currency code (e.g., 'EUR', 'BGN') */
  currency?: string
  /** Campaign state for color coding */
  state: CampaignState
  /** Whether to show the percentage inside the pie chart */
  showPercentage?: boolean
  /** Size of the pie chart: extraSmall (37px) for mobile compact, small/medium/large for other uses */
  size?: 'extraSmall' | 'small' | 'medium' | 'large'
}

// ============================================================================
// Share Button Types
// ============================================================================

export type SharePlatform = 'facebook' | 'email' | 'link' | 'twitter' | 'linkedin' | 'whatsapp'

export interface ShareButtonsProps {
  /** Full URL to the campaign */
  campaignUrl: string
  /** Campaign title for sharing */
  campaignTitle: string
  /** Optional campaign description for email sharing */
  campaignDescription?: string
  /** Which platforms to show */
  platforms?: SharePlatform[]
  /** Callback when share is triggered */
  onShare?: (platform: SharePlatform) => void
}

export interface ShareOption {
  platform: SharePlatform
  label: string
  icon: React.ElementType
  action: () => void
}

// ============================================================================
// Donations Tab Types
// ============================================================================

export interface DonationsTabProps {
  /** Campaign ID to fetch donations for */
  campaignId: string
  /** Number of items per page */
  pageSize?: number
  /** Callback when "See All" is clicked */
  onSeeAll?: () => void
}

export interface DonationItemProps {
  donation: CampaignDonation
}

// ============================================================================
// Wishes Tab Types
// ============================================================================

export interface WishesTabProps {
  /** Campaign ID to fetch wishes for */
  campaignId: string
  /** Number of items per page */
  pageSize?: number
  /** Callback when "See All" is clicked */
  onSeeAll?: () => void
}

export interface WishItemProps {
  wish: {
    id: string
    message: string
    personId?: string
    person?: {
      firstName: string
      lastName: string
    }
    createdAt: string
  }
}

// ============================================================================
// Main Drawer Types
// ============================================================================

export interface PaymentDrawerProps {
  /** Campaign data */
  campaign: CampaignResponse
  /** Initial drawer state (mobile only) */
  initialState?: DrawerState
  /** Callback when donation button is clicked */
  onDonate?: () => void
}

export interface PaymentDrawerCollapsedProps {
  /** Campaign data */
  campaign: CampaignResponse
  /** Callback to expand drawer */
  onExpand: () => void
  /** Callback when donation button is clicked */
  onDonate?: () => void
}

export interface PaymentDrawerExpandedProps {
  /** Campaign data */
  campaign: CampaignResponse
  /** Donations data */
  donations?: CampaignDonation[]
  /** Total donations count */
  donationsTotal?: number
  /** Wishes data */
  wishList?: DonationWishPaginatedResponse
  /** Loading states */
  isLoading?: boolean
  /** Callback to collapse drawer */
  onCollapse: () => void
  /** Callback when donation button is clicked */
  onDonate?: () => void
  /** Current active tab */
  activeTab?: TabValue
  /** Callback when tab changes */
  onTabChange?: (tab: TabValue) => void
}

// ============================================================================
// Desktop Drawer Types
// ============================================================================

export interface PaymentDrawerDesktopProps {
  /** Campaign data */
  campaign: CampaignResponse
  /** Callback when donation button is clicked */
  onDonate?: () => void
}
