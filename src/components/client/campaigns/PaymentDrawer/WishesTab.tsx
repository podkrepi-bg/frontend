import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Typography, CircularProgress, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { bg, enUS } from 'date-fns/locale'

import { getExactDate } from 'common/util/date'
import { DonationWishPaginatedResponse } from 'gql/donationWish'
import { WishesTabProps } from './types'

/**
 * Wishes Tab Component
 *
 * Displays supporter wishes/messages in the expanded payment drawer.
 * From issue #2027:
 * "Open state will contain donations and wishes tabs."
 */

const PREFIX = 'WishesTab'

const classes = {
  container: `${PREFIX}-container`,
  wishItem: `${PREFIX}-wishItem`,
  wishContent: `${PREFIX}-wishContent`,
  wishAuthor: `${PREFIX}-wishAuthor`,
  wishMessage: `${PREFIX}-wishMessage`,
  wishDate: `${PREFIX}-wishDate`,
  avatar: `${PREFIX}-avatar`,
  emptyState: `${PREFIX}-emptyState`,
  seeAllButton: `${PREFIX}-seeAllButton`,
}

const StyledContainer = styled(Box)(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },

  [`& .${classes.wishItem}`]: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
    padding: theme.spacing(1, 0),
  },

  [`& .${classes.wishContent}`]: {
    flex: 1,
    minWidth: 0,
  },

  [`& .${classes.wishAuthor}`]: {
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    lineHeight: '150%',
    marginTop: theme.spacing(0.5),
  },

  [`& .${classes.wishMessage}`]: {
    color: theme.palette.common.black,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    fontStyle: 'normal',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },

  [`& .${classes.wishDate}`]: {
    display: 'none',
  },

  [`& .${classes.avatar}`]: {
    width: 20,
    height: 20,
    color: theme.palette.accent.heartLight,
    flexShrink: 0,
    marginTop: theme.spacing(0.25),
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
    border: `2px solid ${theme.palette.primary.light}`,
    borderRadius: 100,
    backgroundColor: 'transparent',
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '22px',
    letterSpacing: '0.46px',
    color: theme.palette.primary.dark,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(74, 195, 255, 0.08)',
      border: `2px solid ${theme.palette.primary.light}`,
    },
  },
}))

interface WishesTabInternalProps extends WishesTabProps {
  /** Wishes data (passed from parent) */
  wishList?: DonationWishPaginatedResponse
  /** Loading state */
  isLoading?: boolean
  /** Error state */
  error?: Error | null
  /** Whether to show pagination (false = show See All button instead) */
  showPagination?: boolean
  /** Callback when See All button is clicked */
  onSeeAll?: () => void
}

export default function WishesTab({
  wishList,
  pageSize = 3,
  isLoading = false,
  error,
  showPagination = true,
  onSeeAll,
}: WishesTabInternalProps) {
  const { t, i18n } = useTranslation('campaigns')
  const locale = i18n.language === 'bg' ? bg : enUS

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
        {t('errors.fetch-wishes', { defaultValue: 'Error loading wishes' })}
      </Typography>
    )
  }

  const wishes = wishList?.items?.slice(0, pageSize) ?? []

  if (wishes.length === 0) {
    return (
      <StyledContainer className={classes.container}>
        <Typography className={classes.emptyState}>
          {t('campaign.no-wishes', { defaultValue: 'No wishes yet. Leave a message of support!' })}
        </Typography>
      </StyledContainer>
    )
  }

  const getWisherName = (wish: typeof wishes[0]): string => {
    if (wish.person) {
      const { firstName, lastName } = wish.person
      if (firstName || lastName) {
        return `${firstName || ''} ${lastName || ''}`.trim()
      }
    }
    return t('campaign.anonymous', { defaultValue: 'Anonymous' })
  }

  return (
    <StyledContainer className={classes.container}>
      {wishes.map((wish) => (
        <Box key={wish.id} className={classes.wishItem}>
          <FavoriteBorderIcon className={classes.avatar} />
          <Box className={classes.wishContent}>
            <Typography className={classes.wishMessage}>&ldquo;{wish.message}&rdquo;</Typography>
            <Typography className={classes.wishAuthor}>
              {t('campaign.from')} {getWisherName(wish)}, {getExactDate(wish.createdAt, locale)}
            </Typography>
          </Box>
        </Box>
      ))}

      {!showPagination && onSeeAll && (
        <Button className={classes.seeAllButton} onClick={onSeeAll}>
          {t('campaign.see-all-wishes')}
        </Button>
      )}
    </StyledContainer>
  )
}
