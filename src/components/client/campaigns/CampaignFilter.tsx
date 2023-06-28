import React, { useMemo, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useCampaignList } from 'common/hooks/campaigns'
import CampaignsList from './CampaignsList'
import { CampaignResponse } from 'gql/campaigns'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import { CategoryType } from 'gql/types'
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
import ListIconButtons from './ListIconButtons'

const categoryIcons: {
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
  others: { icon: <Category fontSize="small" /> },
  all: { icon: <FilterNone fontSize="small" /> },
}

type Props = {
  showCampaigns?: boolean
  selected: CampaignTypeCategory
  onClick: (item: CategoryType) => void
  styles: React.CSSProperties
  styleItem?: React.CSSProperties
}

export default function CampaignFilter({
  selected,
  styles,
  styleItem,
  showCampaigns = true,
  onClick,
}: Props) {
  const { t } = useTranslation()
  const { mobile } = useMobile()
  const { data: campaigns, isLoading } = useCampaignList()

  // TODO: add filters&sorting of campaigns so people can select based on personal preferences
  const campaignToShow = useMemo<CampaignResponse[]>(() => {
    const filteredCampaigns =
      campaigns?.filter((campaign) => {
        if (selected != 'all') {
          return campaign.campaignType.category === selected
        }
        return campaign
      }) ?? []
    return filteredCampaigns
  }, [campaigns, selected])

  const categories = useMemo<CategoryType[]>(() => {
    const computedCategories = Object.values(CampaignTypeCategory).map((category) => {
      const count =
        campaigns?.filter((campaign) => campaign.campaignType.category === category).length ?? 0

      if (category === 'all') {
        return {
          type: 'all',
          text: t(`campaigns:filters.${category}`),
          count: campaigns?.length,
          icon: categoryIcons[category].icon,
          isDisabled: false,
        }
      }

      return {
        type: category,
        text: t(`campaigns:filters.${category}`),
        count: count,
        icon: categoryIcons[category].icon,
        isDisabled: !count,
      }
    })

    return computedCategories
  }, [campaigns])

  return (
    <>
      <Box my={6}>
        <ListIconButtons
          data={categories}
          onClick={onClick}
          style={styles}
          styleItem={styleItem}
          cols={mobile ? 2 : 6}
        />
      </Box>

      {isLoading ? (
        <Box textAlign="center">
          <CircularProgress size="3rem" />
        </Box>
      ) : (
        showCampaigns && <CampaignsList campaignToShow={campaignToShow} />
      )}
    </>
  )
}
