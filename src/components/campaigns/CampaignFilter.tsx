import React, { useMemo, useState } from 'react'
import { IconButton, ImageList, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { useCampaignList } from 'common/hooks/campaigns'
import CampaignsList from './CampaignsList'
import { CampaignResponse } from 'gql/campaigns'
import { CampaignTypeCategory } from 'components/campaign-types/categories'
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

const useStyles = makeStyles(() =>
  createStyles({
    filterButtons: {
      display: 'block',
      height: '100px',
      borderRadius: 0,
      borderBottom: '5px solid transparent',
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
  }),
)

const categories: {
  [key in CampaignTypeCategory]: { icon?: React.ReactElement }
} = {
  medical: { icon: <MedicalServices fontSize="large" /> },
  charity: { icon: <VolunteerActivism fontSize="large" /> },
  disasters: { icon: <BusAlert fontSize="large" /> },
  education: { icon: <School fontSize="large" /> },
  events: { icon: <TheaterComedy fontSize="large" /> },
  environment: { icon: <Apartment fontSize="large" /> },
  sport: { icon: <SportsTennis fontSize="large" /> },
  art: { icon: <Brush fontSize="large" /> },
  animals: { icon: <Pets fontSize="large" /> },
  nature: { icon: <Forest fontSize="large" /> },
  others: {},
}

export default function CampaignFilter() {
  const classes = useStyles()
  const { t } = useTranslation()
  const { mobile } = useMobile()
  const { data: campaigns } = useCampaignList()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

  const campaignToShow = useMemo<CampaignResponse[]>(() => {
    return (
      campaigns?.filter((campaign) => {
        if (selectedCategory) {
          return campaign.campaignType.category === selectedCategory
        }
        return campaign
      }) ?? []
    )
  }, [campaigns, selectedCategory])

  return (
    <>
      <ImageList
        cols={mobile ? 2 : 6}
        rowHeight={164}
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
              {categories[category].icon ?? <Category fontSize="large" />}
              <Typography>
                {t(`campaigns:filters.${category}`)} ({count})
              </Typography>
            </IconButton>
          )
        })}
        <IconButton
          disabled={!selectedCategory}
          className={classes.filterButtons}
          onClick={() => setSelectedCategory(undefined)}>
          <FilterNone fontSize="large" />
          <Typography>
            {t(`campaigns:filters.all`)} ({campaigns?.length ?? 0})
          </Typography>
        </IconButton>
      </ImageList>
      <CampaignsList campaignToShow={campaignToShow} />
    </>
  )
}
