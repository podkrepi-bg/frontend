import React, { useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, CircularProgress, IconButton, ImageList, Typography } from '@mui/material'
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
import useMobile from 'common/hooks/useMobile'

const PREFIX = 'CampaignFilter'

const classes = {
  filterButtons: `${PREFIX}-filterButtons`,
}

const Root = styled('div')(() => ({
  [`& .${classes.filterButtons}`]: {
    display: 'block',
    height: '80px',
    borderRadius: 0,
    borderBottom: '1px solid transparent',
    padding: 1,
    '&:active': {
      color: '#4AC3FF',
      borderBottom: '5px solid #4AC3FF',
    },
    '&:hover': {
      backgroundColor: 'white',
      borderBottom: '5px solid #4AC3FF',
      color: '#4AC3FF',
    },
    '&:focus': {
      color: '#4AC3FF',
      borderBottom: '5px solid #4AC3FF',
    },
    '&:selected': {
      color: '#4AC3FF',
      borderBottom: '5px solid #4AC3FF',
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

export default function CampaignFilter() {
  const { t } = useTranslation()
  const { mobile } = useMobile()
  const { data: campaigns, isLoading } = useCampaignList()
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  // TODO: add filters&sorting of campaigns so people can select based on personal preferences
  const campaignToShow = useMemo<CampaignResponse[]>(() => {
    const filteredCampaigns =
      campaigns?.filter((campaign) => {
        if (selectedCategory != 'ALL') {
          return campaign.campaignType.category === selectedCategory
        }
        return campaign
      }) ?? []
    return filteredCampaigns
  }, [campaigns, selectedCategory])

  return (
    <Root>
      <ImageList
        cols={mobile ? 2 : 6}
        rowHeight={120}
        gap={2}
        sx={{ maxWidth: 'lg', margin: '0 auto', my: 6 }}>
        {Object.values(CampaignTypeCategory).map((category) => {
          const count =
            campaigns?.filter((campaign) => campaign.campaignType.category === category).length ?? 0
          return (
            <IconButton
              key={category}
              disabled={count === 0}
              className={classes.filterButtons}
              onClick={() => setSelectedCategory(category)}>
              {categories[category].icon ?? <Category fontSize="small" />}
              <Typography>
                {t(`campaigns:filters.${category}`)} ({count})
              </Typography>
            </IconButton>
          )
        })}
        <IconButton className={classes.filterButtons} onClick={() => setSelectedCategory('ALL')}>
          <FilterNone fontSize="small" />
          <Typography>
            {t(`campaigns:filters.all`)} ({campaigns?.length ?? 0})
          </Typography>
        </IconButton>
      </ImageList>
      {isLoading ? (
        <Box textAlign="center">
          <CircularProgress size="3rem" />
        </Box>
      ) : (
        <CampaignsList campaignToShow={campaignToShow} />
      )}
    </Root>
  )
}
