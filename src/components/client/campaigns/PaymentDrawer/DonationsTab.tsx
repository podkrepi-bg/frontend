import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Typography, CircularProgress, IconButton, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { formatDistanceStrict, parseISO } from 'date-fns'
import { bg, enUS } from 'date-fns/locale'

import { moneyPublic } from 'common/util/money'
import { CampaignDonation } from 'gql/campaigns'
import { DonationType } from 'gql/donations.enums'
import { DonationsTabProps } from './types'
import { colors, typography } from './constants'

/**
 * Donations Tab Component
 *
 * Displays recent donations in the expanded payment drawer.
 * From issue #2027:
 * "Open state will contain donations and wishes tabs.
 * On click see all - they should be redirected to the anchor at the bottom of the page"
 */

const PREFIX = 'DonationsTab'

const classes = {
  container: `${PREFIX}-container`,
  row: `${PREFIX}-row`,
  cellAvatar: `${PREFIX}-cellAvatar`,
  cellName: `${PREFIX}-cellName`,
  cellDate: `${PREFIX}-cellDate`,
  cellAmount: `${PREFIX}-cellAmount`,
  sortable: `${PREFIX}-sortable`,
  donorName: `${PREFIX}-donorName`,
  avatar: `${PREFIX}-avatar`,
  pagination: `${PREFIX}-pagination`,
  emptyState: `${PREFIX}-emptyState`,
  seeAllButton: `${PREFIX}-seeAllButton`,
}

const GRID_TEMPLATE = '20px minmax(60px, 100px) 1fr auto'

const StyledContainer = styled(Box)(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  },

  [`& .${classes.row}`]: {
    display: 'grid',
    gridTemplateColumns: GRID_TEMPLATE,
    alignItems: 'center',
    gap: theme.spacing(1),
    width: '100%',
    padding: theme.spacing(0.5, 0),
  },

  [`& .${classes.cellAvatar}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [`& .${classes.cellName}`]: {
    minWidth: 0,
    overflow: 'hidden',
  },

  [`& .${classes.cellDate}`]: {
    textAlign: 'left',
    fontSize: '0.875rem',
    color: theme.palette.grey[600],
    whiteSpace: 'nowrap',
  },

  [`& .${classes.cellAmount}`]: {
    textAlign: 'right',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.grey[600],
    whiteSpace: 'nowrap',
  },

  [`& .${classes.sortable}`]: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: typography.fontPrimary,
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '150%',
    color: colors.darkBlue,
    '& svg': {
      width: 14,
      height: 14,
      marginLeft: 2,
      color: colors.darkBlue,
    },
    '&:hover': {
      opacity: 0.8,
    },
  },

  [`& .${classes.donorName}`]: {
    fontWeight: 500,
    fontSize: '0.875rem',
    color: theme.palette.common.black,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  [`& .${classes.avatar}`]: {
    width: 20,
    height: 20,
    color: colors.heartPink,
  },

  [`& .${classes.pagination}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },

  [`& .${classes.emptyState}`]: {
    textAlign: 'center',
    padding: theme.spacing(3),
    color: theme.palette.grey[500],
  },

  [`& .${classes.seeAllButton}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 30,
    padding: '4px 10px',
    border: `2px solid ${colors.lightBlue}`,
    borderRadius: 100,
    backgroundColor: 'transparent',
    fontFamily: typography.fontPrimary,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '22px',
    letterSpacing: '0.46px',
    color: colors.darkBlue,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: colors.lightBlueHover,
      border: `2px solid ${colors.lightBlue}`,
    },
  },
}))

interface DonationsTabInternalProps extends DonationsTabProps {
  /** Donations data (passed from parent to allow shared fetching) */
  donations?: CampaignDonation[]
  /** Total number of donations */
  total?: number
  /** Current page */
  page?: number
  /** Page setter */
  setPage?: (page: number) => void
  /** Loading state */
  isLoading?: boolean
  /** Error state */
  error?: Error | null
  /** Whether to show pagination controls (false = show See All button instead) */
  showPagination?: boolean
  /** Callback when See All button is clicked */
  onSeeAll?: () => void
  /** Current sort field (controlled from parent for API sorting) */
  sortBy?: 'createdAt' | 'amount'
  /** Current sort order (controlled from parent for API sorting) */
  sortOrder?: 'asc' | 'desc'
  /** Callback when sort changes */
  onSortChange?: (sortBy: 'createdAt' | 'amount') => void
}

export default function DonationsTab({
  donations = [],
  total = 0,
  page = 0,
  setPage,
  pageSize = 5,
  isLoading = false,
  error,
  showPagination = true,
  onSeeAll,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  onSortChange,
}: DonationsTabInternalProps) {
  const { t, i18n } = useTranslation('campaigns')
  const locale = i18n.language === 'bg' ? bg : enUS

  const handleSortClick = (field: 'createdAt' | 'amount') => {
    onSortChange?.(field)
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress size={24} />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" p={2}>
        {t('errors.fetch-donations', { defaultValue: 'Error loading donations' })}
      </Typography>
    )
  }

  if (donations.length === 0) {
    return (
      <StyledContainer className={classes.container}>
        <Typography className={classes.emptyState}>
          {t('campaign.no-donations', {
            defaultValue: 'No donations yet. Be the first to donate!',
          })}
        </Typography>
      </StyledContainer>
    )
  }

  const getDonorName = (donation: CampaignDonation): string => {
    if (donation.type === DonationType.donation) {
      if (donation.metadata?.name) {
        return donation.metadata.name
      }
      if (donation.person) {
        if (donation.person.company?.companyName) {
          return donation.person.company.companyName
        }
        if (donation.person.firstName || donation.person.lastName) {
          return `${donation.person.firstName || ''} ${donation.person.lastName || ''}`.trim()
        }
      }
    }
    return t('campaign.anonymous', { defaultValue: 'Anonymous' })
  }

  const rowCount = page * pageSize + donations.length
  const hasPrev = page > 0
  const hasNext = rowCount < total

  return (
    <StyledContainer className={classes.container}>
      <Box className={classes.row}>
        <Box className={classes.cellAvatar} />
        <Box className={classes.cellName} />
        <Box
          className={`${classes.cellDate} ${classes.sortable}`}
          onClick={() => handleSortClick('createdAt')}>
          <Typography component="span">{t('campaign.date-header')}</Typography>
          {sortBy === 'createdAt' ? (
            sortOrder === 'desc' ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )
          ) : (
            <ArrowDropDownIcon sx={{ opacity: 0.5 }} />
          )}
        </Box>
        <Box
          className={`${classes.cellAmount} ${classes.sortable}`}
          onClick={() => handleSortClick('amount')}
          sx={{ justifyContent: 'flex-end' }}>
          <Typography component="span">{t('campaign.amount-header')}</Typography>
          {sortBy === 'amount' ? (
            sortOrder === 'desc' ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )
          ) : (
            <ArrowDropDownIcon sx={{ opacity: 0.5 }} />
          )}
        </Box>
      </Box>

      {donations.map((donation) => (
        <Box key={donation.id} className={classes.row}>
          <Box className={classes.cellAvatar}>
            <FavoriteBorderIcon className={classes.avatar} />
          </Box>
          <Box className={classes.cellName}>
            <Typography className={classes.donorName}>{getDonorName(donation)}</Typography>
          </Box>
          <Typography className={classes.cellDate}>
            {formatDistanceStrict(parseISO(donation.createdAt), new Date(), {
              addSuffix: true,
              locale,
            })}
          </Typography>
          <Typography className={classes.cellAmount}>
            {moneyPublic(donation.amount, donation.currency)}
          </Typography>
        </Box>
      ))}

      {showPagination && total > pageSize && setPage && (
        <Box className={classes.pagination}>
          <Typography variant="body2" color="textSecondary">
            {`${page * pageSize + 1}-${rowCount} ${t('of')} ${total}`}
          </Typography>
          <IconButton
            size="small"
            disabled={!hasPrev}
            onClick={() => setPage(page - 1)}
            aria-label={t('pagination.previous', { defaultValue: 'Previous page' })}>
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            disabled={!hasNext}
            onClick={() => setPage(page + 1)}
            aria-label={t('pagination.next', { defaultValue: 'Next page' })}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {!showPagination && onSeeAll && (
        <Button className={classes.seeAllButton} onClick={onSeeAll}>
          {t('campaign.see-all-donations')}
        </Button>
      )}
    </StyledContainer>
  )
}
