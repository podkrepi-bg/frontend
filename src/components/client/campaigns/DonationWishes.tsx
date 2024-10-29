import React, { useMemo, useRef, useState } from 'react'

import { useTranslation } from 'next-i18next'

import { Grid2, Stack, Typography, Grid, Button, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Pagination from '@mui/material/Pagination'

import { bg, enUS } from 'date-fns/locale'
import { moneyPublic } from 'common/util/money'
import { useDonationWishesList } from 'common/hooks/donationWish'
import { getExactDate } from 'common/util/date'
import theme from 'common/theme'
import { SortData } from 'gql/types'
import { debounce } from 'lodash'
import { DonationType } from 'gql/donations.enums'

type SortButton = {
  label: string
  value: string
}

type Props = {
  campaignId: string
  pageSize?: number
}

export default function DonationWishes({ campaignId, pageSize = 5 }: Props) {
  const { t, i18n } = useTranslation('campaigns')
  const locale = i18n?.language == 'bg' ? bg : enUS
  const titleRef = useRef<HTMLElement>(null)
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [searchValue, setSearchValue] = useState('')

  const [sort, setSort] = useState<SortData>({
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })

  const { data, isSuccess } = useDonationWishesList(
    campaignId,
    { pageIndex, pageSize },
    sort,
    searchValue,
  )
  const numOfPages = isSuccess && data ? Math.ceil(data.totalCount / pageSize) : 0

  const handleSort = (value: string) => {
    setSort((sort) => ({
      sortBy: value,
      sortOrder: sort.sortBy === value ? (sort.sortOrder === 'desc' ? 'asc' : 'desc') : 'desc',
    }))
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const debounceSearch = useMemo(() => debounce(handleSearch, 300), [])

  const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
    // <Pagination /> 's impl is 1 index based
    // Our pagination apis are 0 index based
    setPageIndex(page - 1)
    if (titleRef.current) {
      titleRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    }
  }

  const sortButtons: SortButton[] = [
    {
      label: t('campaign.sort.date'),
      value: 'createdAt',
    },
    {
      label: t('campaign.sort.amount'),
      value: 'amount',
    },
  ]

  return (
    <Grid2 container direction="column" rowGap={4}>
      <Grid2>
        <Typography
          component="h4"
          sx={{
            color: theme.palette.common.black,
            fontSize: theme.typography.pxToRem(32),
            paddingBottom: '1rem',
          }}>
          {t('campaign.messages')}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'start' }}
          gap={2}
          useFlexGap
          flexWrap="wrap">
          <Typography
            sx={{
              color: theme.palette.grey[900],
              fontSize: theme.typography.pxToRem(12),
              fontWeight: 600,
            }}>
            {t('campaign.sort.title')}
          </Typography>
          {sortButtons.map(({ label, value }) => (
            <Button
              key={value}
              variant="text"
              onClick={() => handleSort(value)}
              sx={{
                fontSize: theme.typography.pxToRem(14),
                color: 'rgba(0, 0, 0, 0.54)',
              }}>
              {label}
              {sort.sortBy === value &&
                (sort.sortOrder === 'asc' ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />)}
            </Button>
          ))}
          <TextField
            placeholder={t('campaign.sort.search')}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={debounceSearch}
          />
        </Stack>
      </Grid2>
      <Grid2 container direction="column" rowGap={3}>
        {isSuccess &&
          data?.items?.map(({ id, person, donation, message, createdAt }) => (
            <Grid2
              container
              key={id}
              direction="row"
              sx={{ p: 2, bgcolor: 'grey.100', borderRadius: theme.spacing(2) }}>
              <Grid2 size={{ xs: 12 }}>
                <Stack direction="row" spacing={2}>
                  <Grid pt={0.7}>
                    <AccountCircleIcon
                      color="disabled"
                      sx={{ fontSize: theme.typography.pxToRem(37) }}
                    />
                  </Grid>
                  <Stack direction="column">
                    {donation?.type === DonationType.donation && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          fontSize: theme.typography.pxToRem(16),
                          color: theme.palette.grey[800],
                        }}>
                        {person
                          ? `${person.firstName} ${person.lastName}`
                          : t('campaigns:donations.anonymous')}
                      </Typography>
                    )}
                    {donation?.type === DonationType.corporate && (
                      <>
                        {!donation?.metadata || !donation?.metadata.name ? (
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              fontSize: theme.typography.pxToRem(16),
                              color: theme.palette.grey[800],
                            }}>
                            {person && person.company
                              ? `${person.company.companyName}`
                              : t('campaigns:donations.corporate-donor')}
                          </Typography>
                        ) : (
                          <>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 700,
                                fontSize: theme.typography.pxToRem(16),
                                color: theme.palette.grey[800],
                              }}>
                              {donation?.metadata.name}
                            </Typography>
                            <Typography sx={{ fontSize: 12 }}>
                              {t('campaigns:campaign.from')}{' '}
                              {person
                                ? person.company.companyName
                                : t('campaigns:donations.corporate-donor')}
                            </Typography>
                          </>
                        )}
                      </>
                    )}
                    <Stack direction="row">
                      {donation && (
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: theme.typography.pxToRem(14),
                            color: 'rgba(0, 0, 0, 0.54)',
                            '&:after': { content: '"|"', paddingX: '5px' },
                          }}>
                          {moneyPublic(donation.amount, donation.currency)}
                        </Typography>
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: theme.typography.pxToRem(14),
                          color: 'rgba(0, 0, 0, 0.54)',
                        }}>
                        {getExactDate(createdAt, locale)}
                      </Typography>
                    </Stack>
                    <Typography
                      component="blockquote"
                      sx={{
                        mt: 1,
                        fontSize: theme.typography.pxToRem(16),
                        lineHeight: '160%',
                        '&:before': { content: 'open-quote', verticalAlign: theme.spacing(1.25) },
                        '&:after': { content: 'close-quote' },
                      }}>
                      {message}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
            </Grid2>
          ))}
        <Grid2 size={{ xs: 12 }}>
          {data?.items?.length === 0 && searchValue !== '' && (
            <Typography align="center"> {t('campaign.sort.noResults')}</Typography>
          )}
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          {numOfPages > 1 && (
            <Pagination
              count={numOfPages}
              onChange={handlePageChange}
              sx={{ ul: { justifyContent: 'center' } }}
            />
          )}
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
