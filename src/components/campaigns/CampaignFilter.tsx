import React, { useEffect, useState } from 'react'
import { IconButton, ImageList, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { useCampaignList, useCampaignTypesList } from 'common/hooks/campaigns'
import AddIcon from '@mui/icons-material/Add'
import SpaIcon from '@mui/icons-material/Spa'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CampaignsList from './CampaignsList'
import { CampaignResponse } from 'gql/campaigns'

const useStyles = makeStyles(() =>
  createStyles({
    filterButtons: {
      display: 'block',
      height: '100px',
      borderRadius: 0,
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

export default function CampaignsPage() {
  const classes = useStyles()
  const { data: campaignTypes } = useCampaignTypesList()
  const { data: campaigns } = useCampaignList()
  const [campaignType, setCampaignType] = useState('All')
  const [campaignToShow, setCampaignToShow] = useState<CampaignResponse[]>([])
  let natureCounter = 0
  let healthCareCounter = 0
  let disastersCounter = 0
  let othersCounter = 0

  campaignTypes?.map(() => {
    natureCounter = 0
    healthCareCounter = 0
    disastersCounter = 0
    othersCounter = 0
    campaigns?.map((campaign) => {
      campaignTypes?.map((type) => {
        if (campaign.campaignTypeId == type.id) {
          if (
            type.name == 'Leukemia' ||
            type.name == 'Transplantation' ||
            type.name == 'Cancer' ||
            type.name == 'Nursing homes' ||
            type.name == 'Treatment and rehabilitation' ||
            type.name == 'Rehabilitation' ||
            type.name == 'Genetic diseases'
          ) {
            healthCareCounter++
          }
          if (type.name == 'Nature' || type.name == 'Animals') {
            natureCounter++
          }
          if (type.name == 'Disasters') {
            disastersCounter++
          }
          if (
            type.name != 'Disasters' &&
            type.name != 'Nature' &&
            type.name != 'Animals' &&
            type.name != 'Treatment and rehabilitation' &&
            type.name != 'Leukemia' &&
            type.name != 'Nursing homes' &&
            type.name != 'Transplantation' &&
            type.name != 'Cancer' &&
            type.name != 'Genetic diseases' &&
            type.name != 'Rehabilitation'
          ) {
            othersCounter++
          }
        }
      })
    })
  })

  useEffect(() => {
    if (campaignType == 'All') {
      const result: Array<CampaignResponse> = []
      campaigns?.map((campaign) => {
        campaignTypes?.map((type) => {
          if (campaign.campaignTypeId == type.id) {
            result.push(campaign)
          }
        })
        setCampaignToShow(result)
      })
    } else if (campaignType == 'Лечение') {
      const result: Array<CampaignResponse> = []
      campaigns?.map((campaign) => {
        campaignTypes?.map((type) => {
          if (campaign.campaignTypeId == type.id) {
            if (
              type.name == 'Treatment and rehabilitation' ||
              type.name == 'Leukemia' ||
              type.name == 'Nursing homes' ||
              type.name == 'Transplantation' ||
              type.name == 'Cancer' ||
              type.name == 'Genetic diseases' ||
              type.name == 'Rehabilitation'
            ) {
              result.push(campaign)
            }
          }
        })
        setCampaignToShow(result)
      })
    } else if (campaignType == 'Животни/Природа') {
      const result: Array<CampaignResponse> = []
      campaigns?.map((campaign) => {
        campaignTypes?.map((type) => {
          if (campaign.campaignTypeId == type.id) {
            if (type.name == 'Nature' || type.name == 'Animals') {
              result.push(campaign)
            }
          }
        })
        setCampaignToShow(result)
      })
    } else if (campaignType == 'Бедствия') {
      const result: Array<CampaignResponse> = []
      campaigns?.map((campaign) => {
        campaignTypes?.map((type) => {
          if (campaign.campaignTypeId == type.id) {
            if (type.name == 'Disasters') {
              result.push(campaign)
            }
          }
        })
        setCampaignToShow(result)
      })
    } else if (campaignType == 'Други') {
      const result: Array<CampaignResponse> = []
      campaigns?.map((campaign) => {
        campaignTypes?.map((type) => {
          if (campaign.campaignTypeId == type.id) {
            if (
              type.name != 'Disasters' &&
              type.name != 'Nature' &&
              type.name != 'Animals' &&
              type.name != 'Treatment and rehabilitation' &&
              type.name != 'Leukemia' &&
              type.name != 'Nursing homes' &&
              type.name != 'Transplantation' &&
              type.name != 'Cancer' &&
              type.name != 'Genetic diseases' &&
              type.name != 'Rehabilitation'
            ) {
              result.push(campaign)
            }
          }
        })
        setCampaignToShow(result)
      })
    }
  }, [campaignType])

  // async function handleClick(e: any) {
  //   setCampaignType(e.target.textContent)
  // }
  return (
    <>
      <ImageList
        sx={{ width: 500, height: '15rem', marginLeft: 35, marginTop: '5rem' }}
        cols={4}
        rowHeight={164}>
        <IconButton
          className={classes.filterButtons}
          value={'Лечение'}
          onClick={(e) => setCampaignType(e.currentTarget.value)}>
          <AddIcon fontSize="large" sx={{ marginBottom: '10%' }} />
          <Typography>Лечение ({healthCareCounter})</Typography>
        </IconButton>
        <IconButton
          className={classes.filterButtons}
          value={'Животни/Природа'}
          onClick={(e) => setCampaignType(e.currentTarget.value)}>
          <SpaIcon fontSize="large" sx={{ marginBottom: '10%', width: '9rem' }} />
          <Typography sx={{ marginBottom: '4%' }}>Животни/Природа ({natureCounter})</Typography>
        </IconButton>
        <IconButton
          className={classes.filterButtons}
          value={'Бедствия'}
          onClick={(e) => setCampaignType(e.currentTarget.value)}>
          <BeachAccessIcon fontSize="large" sx={{ marginBottom: '10%' }} />
          <Typography>Бедствия ({disastersCounter})</Typography>
        </IconButton>
        <IconButton
          className={classes.filterButtons}
          value={'Други'}
          onClick={(e) => setCampaignType(e.currentTarget.value)}>
          <FavoriteIcon fontSize="large" sx={{ marginBottom: '10%' }} />
          <Typography>Други ({othersCounter})</Typography>
        </IconButton>
        <IconButton
          className={classes.filterButtons}
          value={'Лечение'}
          onClick={(e) => setCampaignType(e.currentTarget.value)}>
          <FavoriteIcon fontSize="large" sx={{ marginBottom: '10%' }} />
          <Typography>Лечение ({healthCareCounter})</Typography>
        </IconButton>
        <IconButton
          className={classes.filterButtons}
          value={'Животни/Природа'}
          onClick={(e) => setCampaignType(e.currentTarget.value)}>
          <SpaIcon
            fontSize="large"
            sx={{
              transform: 'rotate(-180deg)',
              marginBottom: '10%',
              width: '9rem',
            }}
          />
          <Typography sx={{ marginBottom: '4%' }}>Животни/Природа ({natureCounter})</Typography>
        </IconButton>
        <IconButton
          className={classes.filterButtons}
          value={'Бедствия'}
          onClick={(e) => setCampaignType(e.currentTarget.value)}>
          <BeachAccessIcon
            fontSize="large"
            sx={{ transform: 'rotate(90deg)', marginBottom: '10%' }}
          />
          <Typography>Бедствия ({disastersCounter})</Typography>
        </IconButton>
        <IconButton
          className={classes.filterButtons}
          value={'Други'}
          onClick={(e) => setCampaignType(e.currentTarget.value)}>
          <AddIcon fontSize="large" sx={{ marginBottom: '10%' }} />
          <Typography>Други ({othersCounter})</Typography>
        </IconButton>
      </ImageList>
      <CampaignsList campaignToShow={campaignToShow} />
    </>
  )
}
