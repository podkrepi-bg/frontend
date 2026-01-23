import React from 'react'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { Share, FavoriteBorderOutlined } from '@mui/icons-material'

import { routes } from 'common/routes'
import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'

import CampaignProgressPie from './CampaignProgressPie'
import DonationsTab from './DonationsTab'
import WishesTab from './WishesTab'
import { DesktopPaymentDrawerProps } from './types'
import { classes, colors, DesktopWrapper } from './constants'

/**
 * Desktop Payment Drawer Component
 *
 * Renders the desktop-specific payment drawer as an always-visible sidebar with:
 * - Tabs for switching between donations and wishes
 * - Donation/wish list with sorting
 * - Campaign progress summary
 * - Share and donate action buttons
 *
 * Reference: https://github.com/podkrepi-bg/frontend/issues/2027
 */
export default function DesktopPaymentDrawer({
  // State
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
  navigateToSharePage,
  handleTabChange,
  handleSortChange,
  handleSeeAllDonations,
  handleSeeAllWishes,

  // Translation
  t,
}: DesktopPaymentDrawerProps) {
  return (
    <DesktopWrapper item xs={12} className={classes.desktopWrapper}>
      {/* Tabs */}
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

      <Typography sx={{ fontSize: 12, color: colors.blackText, textAlign: 'center', mb: 2 }}>
        {t('campaign.noCommissionInfo')}
      </Typography>

      {/* Action Buttons */}
      <Box className={classes.buttonRow}>
        <Button
          className={classes.shareButtonOutline}
          startIcon={<Share />}
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
    </DesktopWrapper>
  )
}
