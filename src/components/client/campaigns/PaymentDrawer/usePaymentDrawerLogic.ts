import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import { moneyPublic } from 'common/util/money'
import { useCampaignDonationHistory } from 'common/hooks/campaigns'
import { useDonationWishesList } from 'common/hooks/donationWish'

import { CampaignState } from '../helpers/campaign.enums'
import { PaymentDrawerProps, TabValue, UsePaymentDrawerLogicReturn } from './types'

/**
 * Custom hook that encapsulates all shared logic for the PaymentDrawer component.
 *
 * This hook manages:
 * - Drawer open/close state
 * - Tab selection (donors/wishes)
 * - Pagination and sorting
 * - Data fetching for donations and wishes
 * - Navigation handlers
 *
 * @param campaign - Campaign data from props
 * @param initialState - Initial drawer state ('collapsed' | 'expanded')
 * @param isMobile - Whether the current viewport is mobile
 * @returns All state, computed values, fetched data, and handlers needed by child components
 */
export function usePaymentDrawerLogic(
  campaign: PaymentDrawerProps['campaign'],
  initialState: PaymentDrawerProps['initialState'] = 'collapsed',
  isMobile: boolean,
): UsePaymentDrawerLogicReturn {
  const { t } = useTranslation('campaigns')
  const router = useRouter()

  // ============================================================================
  // STATE
  // ============================================================================

  const [drawerOpen, setDrawerOpen] = useState(initialState === 'expanded')
  const [activeTab, setActiveTab] = useState<TabValue>('donors')
  const [page, setPage] = useState(0)
  const [sortBy, setSortBy] = useState<'createdAt' | 'amount'>('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const pageSize = isMobile ? 7 : 7

  // ============================================================================
  // CAMPAIGN DATA EXTRACTION
  // ============================================================================

  const {
    id: campaignId,
    targetAmount: target,
    summary,
    allowDonationOnComplete,
    state: campaignState,
    slug: campaignSlug,
  } = campaign

  const reached = summary ? summary.reachedAmount + (summary.guaranteedAmount ?? 0) : 0
  const reachedAmount = moneyPublic(reached)
  const targetAmount = moneyPublic(target)

  const canDonate =
    campaignState === CampaignState.active ||
    (campaignState === CampaignState.complete && allowDonationOnComplete)

  // ============================================================================
  // DATA FETCHING
  // ============================================================================

  const {
    data: { items: donations, total: totalDonations } = { items: [], total: 0 },
    error: donationHistoryError,
    isLoading: isDonationHistoryLoading,
  } = useCampaignDonationHistory(campaignId, page, pageSize, sortBy, sortOrder)

  const { data: wishList } = useDonationWishesList(
    campaignId,
    { pageIndex: 0, pageSize },
    { sortBy: 'createdAt', sortOrder: 'desc' },
    '',
  )

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const navigateToSharePage = useCallback(() => {
    router.push(routes.campaigns.share(campaignSlug))
  }, [router, campaignSlug])

  const handleTabChange = useCallback((tab: TabValue) => {
    setActiveTab(tab)
    setPage(0)
  }, [])

  const handleSortChange = useCallback(
    (newSortBy: 'createdAt' | 'amount') => {
      if (newSortBy === sortBy) {
        setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
      } else {
        setSortBy(newSortBy)
        setSortOrder('desc')
      }
      setPage(0)
    },
    [sortBy],
  )

  const handleSeeAllDonations = useCallback(() => {
    closeDrawer()
    setTimeout(() => {
      document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }, [closeDrawer])

  const handleSeeAllWishes = useCallback(() => {
    closeDrawer()
    setTimeout(() => {
      document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }, [closeDrawer])

  // ============================================================================
  // RETURN
  // ============================================================================

  return {
    // State
    drawerOpen,
    activeTab,
    page,
    setPage,
    sortBy,
    sortOrder,
    pageSize,

    // Campaign data
    campaignId,
    campaignSlug,
    campaignState,
    reached,
    target,
    reachedAmount,
    targetAmount,
    canDonate,

    // Fetched data
    donations,
    totalDonations,
    donationHistoryError,
    isDonationHistoryLoading,
    wishList,

    // Handlers
    openDrawer,
    closeDrawer,
    navigateToSharePage,
    handleTabChange,
    handleSortChange,
    handleSeeAllDonations,
    handleSeeAllWishes,

    // Translation
    t,
  }
}
