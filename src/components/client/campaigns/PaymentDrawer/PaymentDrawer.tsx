import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
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

import { baseUrl, routes } from 'common/routes'
import { moneyPublic } from 'common/util/money'
import { useCampaignDonationHistory } from 'common/hooks/campaigns'
import { useDonationWishesList } from 'common/hooks/donationWish'
import useMobile from 'common/hooks/useMobile'
import theme from 'common/theme'

import LinkButton from 'components/common/LinkButton'
import CampaignProgressPie from './CampaignProgressPie'
import ShareButtons from './ShareButtons'
import DonationsTab from './DonationsTab'
import WishesTab from './WishesTab'

import { CampaignState } from '../helpers/campaign.enums'
import { PaymentDrawerProps, TabValue } from './types'
import {
  classes,
  colors,
  DesktopWrapper,
  MobileClosedWrapper,
  MobileDrawerContent,
} from './constants'

/**
 * Payment Drawer Component
 *
 * Redesigned payment drawer with two states:
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
  const { t } = useTranslation('campaigns')
  const { asPath } = useRouter()
  const { mobile } = useMobile()

  const [drawerOpen, setDrawerOpen] = useState(initialState === 'expanded')
  const [activeTab, setActiveTab] = useState<TabValue>('donors')
  const [page, setPage] = useState(0)
  const [showShareButtons, setShowShareButtons] = useState(false)
  const [sortBy, setSortBy] = useState<'createdAt' | 'amount'>('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const pageSize = mobile ? 7 : 7

  const {
    id: campaignId,
    targetAmount: target,
    summary,
    allowDonationOnComplete,
    state: campaignState,
    slug: campaignSlug,
    title: campaignTitle,
  } = campaign

  const reached = summary ? summary.reachedAmount + (summary.guaranteedAmount ?? 0) : 0

  const reachedAmount = moneyPublic(reached)
  const targetAmount = moneyPublic(target)

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

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  const touchStartY = useRef<number | null>(null)
  const mobileWrapperRef = useRef<HTMLDivElement>(null)
  const SWIPE_THRESHOLD = 50

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

  const toggleShareButtons = useCallback(() => {
    setShowShareButtons((prev) => !prev)
  }, [])

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
      const element = document.getElementById('wishes')
      element?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }, [closeDrawer])

  const handleSeeAllWishes = useCallback(() => {
    closeDrawer()
    setTimeout(() => {
      const element = document.getElementById('wishes')
      element?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }, [closeDrawer])

  const campaignUrl = baseUrl + asPath
  const canDonate =
    campaignState === CampaignState.active ||
    (campaignState === CampaignState.complete && allowDonationOnComplete)

  const TabsContent = () => (
    <>
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
    </>
  )

  // ============================================================================
  // MOBILE RENDER
  // ============================================================================
  if (mobile) {
    return (
      <>
        <MobileClosedWrapper
          ref={mobileWrapperRef}
          className={classes.mobileClosedWrapper}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}>
          <Box className={classes.swipeHandle} />

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
            <Box className={classes.swipeHandle} />

            <IconButton
              className={classes.closeButton}
              onClick={closeDrawer}
              aria-label={t('close', { ns: 'common' })}>
              <Close />
            </IconButton>

            <TabsContent />

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

            <Box className={classes.buttonRow}>
              <Button
                className={classes.shareButtonOutline}
                endIcon={<Share />}
                onClick={toggleShareButtons}>
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

            {showShareButtons && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <ShareButtons
                  campaignUrl={campaignUrl}
                  campaignTitle={campaignTitle}
                  platforms={['facebook', 'link', 'email', 'whatsapp']}
                />
              </Box>
            )}
          </MobileDrawerContent>
        </SwipeableDrawer>
      </>
    )
  }

  // ============================================================================
  // DESKTOP RENDER
  // ============================================================================

  return (
    <DesktopWrapper item xs={12} className={classes.desktopWrapper}>
      <Box className={classes.desktopTabsWrapper}>
        <Typography
          className={`${classes.desktopTab} ${
            activeTab === 'donors' ? classes.desktopTabSelected : ''
          }`}
          onClick={() => handleTabChange('donors')}>
          {t('cta.donations')}
        </Typography>
        <Typography
          className={`${classes.desktopTab} ${
            activeTab === 'wishes' ? classes.desktopTabSelected : ''
          }`}
          onClick={() => handleTabChange('wishes')}>
          {t('campaign.wishes')}
        </Typography>
      </Box>

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

      <Typography sx={{ fontSize: 12, color: colors.blackText, textAlign: 'center', mb: 2 }}>
        {t('campaign.noCommissionInfo')}
      </Typography>

      <Box className={classes.buttonRow}>
        <Button
          className={classes.shareButtonOutline}
          startIcon={<Share />}
          onClick={toggleShareButtons}>
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

      {showShareButtons && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <ShareButtons
            campaignUrl={campaignUrl}
            campaignTitle={campaignTitle}
            platforms={['facebook', 'link', 'email', 'whatsapp']}
          />
        </Box>
      )}
    </DesktopWrapper>
  )
}
