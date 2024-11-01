import React, { useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import { debounce } from 'lodash'
import { useCampaignList } from 'common/hooks/campaigns'
import CampaignsList from './CampaignsList'
import { CampaignResponse } from 'gql/campaigns'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import { useTranslation } from 'next-i18next'
import {
  Apartment,
  Brush,
  BusAlert,
  Category,
  FilterNone,
  Forest,
  MedicalServices,
  Pets,
  School,
  SportsTennis,
  TheaterComedy,
  VolunteerActivism,
} from '@mui/icons-material'
import theme from 'common/theme'

const PREFIX = 'CampaignFilter'

const classes = {
  filterButtons: `${PREFIX}-filterButtons`,
  filterButtonContainer: `${PREFIX}-filterButtonsCtn`,
}

const Root = styled('div')(() => ({
  [`& .${classes.filterButtonContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
  },
  [`& .${classes.filterButtons}`]: {
    width: '100%',
    height: '80px',
    borderRadius: 0,
    borderBottom: '1px solid transparent',
    display: 'flex',
    flexDirection: 'column',

    '&:selected': {
      color: theme.palette.primary.light,
      borderBottom: `5px solid ${theme.palette.primary.light}`,
    },
    '&:active': {
      color: theme.palette.primary.light,
      borderBottom: `5px solid ${theme.palette.primary.light}`,
    },
    '&:focus': {
      color: theme.palette.primary.light,
      borderBottom: `5px solid ${theme.palette.primary.light}`,
      background: 'transparent',
    },
    '&:hover': {
      color: theme.palette.primary.light,
      borderBottom: `5px solid ${theme.palette.primary.light}`,
      backgroundColor: 'white',
    },
  },
}))

const categories: {
  [key in CampaignTypeCategory]: { icon?: React.ReactElement }
} = {
  medical: { icon: <MedicalServices fontSize="small" /> },
  charity: { icon: <VolunteerActivism fontSize="small" /> },
  disasters: { icon: <BusAlert fontSize="small" /> },
  education: { icon: <School fontSize="small" /> },
  events: { icon: <TheaterComedy fontSize="small" /> },
  environment: { icon: <Apartment fontSize="small" /> },
  sport: { icon: <SportsTennis fontSize="small" /> },
  art: { icon: <Brush fontSize="small" /> },
  animals: { icon: <Pets fontSize="small" /> },
  nature: { icon: <Forest fontSize="small" /> },
  others: {},
}

export type SearchFieldProps = TextFieldProps & {
  debounceMs?: number
  onSearch: (v: string) => void
}
export function SearchField({ debounceMs, onSearch, ...textProps }: SearchFieldProps) {
  const debounceSearch = useMemo(
    () => debounce(onSearch, debounceMs, { leading: false, trailing: true }),
    [],
  )

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const searchText = event.target.value
    const normalizedText = typeof searchText === 'string' ? searchText.trim() : ''
    Number(debounceMs) > 0 ? debounceSearch(normalizedText) : onSearch(normalizedText)
  }
  return (
    <TextField
      label="Search"
      type="search"
      variant="outlined"
      size="small"
      onChange={handleSearch}
      sx={{ minWidth: 250 }}
      {...textProps}
    />
  )
}

export default function CampaignFilter() {
  const { t } = useTranslation()
  const { data: campaigns, isLoading } = useCampaignList(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [searchValue, setSearchValue] = useState('')

  // TODO: add filters&sorting of campaigns so people can select based on personal preferences
  const filteredCampaigns = useMemo<CampaignResponse[]>(() => {
    if (selectedCategory === 'ALL') {
      return campaigns ?? []
    }
    return (
      campaigns?.filter((campaign) => campaign.campaignType.category === selectedCategory) ?? []
    )
  }, [campaigns, selectedCategory, searchValue])

  const campaignToShow = useMemo<CampaignResponse[]>(() => {
    if (searchValue == null || searchValue === '') {
      return filteredCampaigns
    }

    return (
      filteredCampaigns?.filter((c) =>
        typeof searchValue === 'string' && searchValue != ''
          ? c.title?.toLocaleLowerCase()?.includes(searchValue)
          : true,
      ) ?? []
    )
  }, [filteredCampaigns, searchValue])

  return (
    <>
      <Grid container justifyContent={'center'} display={'flex'}>
        <Root>
          <Grid container item sx={{ my: 5 }} maxWidth={'lg'} component={'ul'}>
            {Object.values(CampaignTypeCategory).map((category) => {
              const count = campaigns?.reduce((acc, curr) => {
                return category === curr.campaignType.category ? acc + 1 : acc
              }, 0)
              return (
                <Grid
                  item
                  xs={6}
                  md={2}
                  className={classes.filterButtonContainer}
                  key={category}
                  component={'li'}>
                  <IconButton
                    key={category}
                    className={classes.filterButtons}
                    disabled={count === 0}
                    onClick={() => setSelectedCategory(category)}>
                    {categories[category].icon ?? <Category fontSize="small" />}
                    <Typography>
                      {t(`campaigns:filters.${category}`)} ({count})
                    </Typography>
                  </IconButton>
                </Grid>
              )
            })}
            <Grid item xs={6} md={2} className={classes.filterButtonContainer} component={'li'}>
              <IconButton
                className={classes.filterButtons}
                onClick={() => setSelectedCategory('ALL')}>
                <FilterNone fontSize="small" />
                <Typography>
                  {t(`campaigns:filters.all`)} ({campaigns?.length ?? 0})
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sx={{ my: 5 }}>
              <SearchField onSearch={setSearchValue} debounceMs={300} />
            </Grid>
          </Grid>
        </Root>
      </Grid>
      {isLoading ? (
        <Box textAlign="center">
          <CircularProgress size="3rem" />
        </Box>
      ) : (
        <CampaignsList campaignToShow={campaignToShow} />
      )}
    </>
  )
}
