import React, { useRef, useEffect, useCallback } from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  FormControl,
  CircularProgress,
  SwipeableDrawer,
} from '@mui/material'
import { Close, Share, FavoriteBorderOutlined, KeyboardArrowUp } from '@mui/icons-material'

import { routes } from 'common/routes'
import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'

import CampaignProgressPie from './CampaignProgressPie'
import DonationsTab from './DonationsTab'
import WishesTab from './WishesTab'
import { MobilePaymentDrawerProps } from './types'
import { classes, MobileClosedWrapper, MobileDrawerContent } from './constants'

const SWIPE_THRESHOLD = 50

/**
 * Mobile Payment Drawer Component
 *
 * Renders the mobile-specific payment drawer with:
 * - Collapsed state: Fixed bottom bar with pie chart and buttons
 * - Expanded state: Full drawer with tabs, donations/wishes, and action buttons
 * - Touch gestures: Swipe up to open drawer
 *
 * Reference: https://github.com/podkrepi-bg/frontend/issues/2027
 */
export default function MobilePaymentDrawer({
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
}: MobilePaymentDrawerProps) {
  // ============================================================================
  // TOUCH HANDLING
  // ============================================================================

  const touchStartY = useRef<number | null>(null)
  const mobileWrapperRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartY.current === null) return

      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY.current - touchEndY

      if (deltaY > SWIPE_THRESHOLD) {
        openDrawer()
      }

      touchStartY.current = null
    },
    [openDrawer],
  )

  useEffect(() => {
    const element = mobileWrapperRef.current
    if (!element) return

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current !== null) {
        e.preventDefault()
      }
    }

    element.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      element.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      {/* Collapsed Bottom Bar */}
      <MobileClosedWrapper
        ref={mobileWrapperRef}
        className={classes.mobileClosedWrapper}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
        <Box className={classes.swipeHandle} aria-hidden="true" />

        <Box className={classes.mobileCommissionTextContent}>
          <Typography className={classes.commissionText}>
            {t('campaign.commission-info')}
          </Typography>
        </Box>
        <Box className={classes.mobileClosedContent}>
          <Box className={classes.mobileClosedLeft}>
            <CampaignProgressPie
              state={campaignState}
              currentAmount={reached}
              targetAmount={target}
              size="extraSmall"
              showPercentage
            />
          </Box>
          <Box className={classes.mobileClosedRight}>
            <Button
              className={classes.donationsButton}
              onClick={openDrawer}
              endIcon={<KeyboardArrowUp />}>
              {t('cta.donations')}
            </Button>

            <LinkButton
              href={routes.campaigns.oneTimeDonation(campaignSlug)}
              disabled={!canDonate}
              className={classes.donateNowButton}
              endIcon={<FavoriteBorderOutlined />}>
              {t('cta.support-now')}
            </LinkButton>
          </Box>
        </Box>
      </MobileClosedWrapper>

      {/* Expanded Drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
        disableSwipeToOpen
        swipeAreaWidth={100}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'visible',
          },
        }}>
        <MobileDrawerContent className={classes.mobileDrawer}>
          <Box className={classes.swipeHandle} aria-hidden="true" />

          <IconButton
            className={classes.closeButton}
            onClick={closeDrawer}
            aria-label={t('close', { ns: 'common' })}>
            <Close />
          </IconButton>

          {/* Tabs */}
          <FormControl className={classes.tabsContainer}>
            <Typography
              className={`${classes.tab} ${activeTab === 'donors' ? classes.tabSelected : ''}`}
              onClick={() => handleTabChange('donors')}
              data-testid="summary-donors">
              {t('cta.donations')}
            </Typography>
            <Typography
              className={`${classes.tab} ${activeTab === 'wishes' ? classes.tabSelected : ''}`}
              onClick={() => handleTabChange('wishes')}
              data-testid="summary-wishes">
              {t('campaign.wishes')}
            </Typography>
          </FormControl>

          {/* Content */}
          <Box className={classes.contentSection}>
            {donationHistoryError ? (
              <Typography color="error">{t('errors.fetch-donations')}</Typography>
            ) : isDonationHistoryLoading ? (
              <CircularProgress sx={{ display: 'block', margin: `${theme.spacing(3)} auto` }} />
            ) : activeTab === 'donors' ? (
              <DonationsTab
                campaignId={campaignId}
                donations={donations}
                total={totalDonations}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                onSeeAll={handleSeeAllDonations}
                showPagination={false}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            ) : (
              <WishesTab
                campaignId={campaignId}
                wishList={wishList}
                pageSize={pageSize}
                onSeeAll={handleSeeAllWishes}
                showPagination={false}
              />
            )}
          </Box>

          {/* Summary Section */}
          <Box className={classes.summarySection}>
            <CampaignProgressPie
              currentAmount={reached}
              targetAmount={target}
              state={campaignState}
              size="extraSmall"
              showPercentage
            />
            <Box className={classes.summaryText}>
              <Typography className={classes.summaryTextLine1}>
                {t('campaign.summary-line1', {
                  defaultValue: 'До момента са дарени {{reached}}',
                  reached: reachedAmount,
                })}
              </Typography>
              <Typography className={classes.summaryTextLine2}>
                {t('campaign.summary-line2', {
                  defaultValue: 'от нужните {{target}}.',
                  target: targetAmount,
                })}
              </Typography>
            </Box>
          </Box>

          <Box className={classes.noCommissionInfo}>
            <Typography>{t('campaign.noCommissionInfo')}</Typography>
          </Box>

          {/* Action Buttons */}
          <Box className={classes.buttonRow}>
            <Button
              className={classes.shareButtonOutline}
              endIcon={<Share />}
              onClick={navigateToSharePage}>
              {t('cta.share', { ns: 'common' })}
            </Button>
            <LinkButton
              href={routes.campaigns.oneTimeDonation(campaignSlug)}
              disabled={!canDonate}
              className={classes.donateButtonYellow}
              endIcon={<FavoriteBorderOutlined />}>
              {t('cta.support-now')}
            </LinkButton>
          </Box>
        </MobileDrawerContent>
      </SwipeableDrawer>
    </>
  )
}
