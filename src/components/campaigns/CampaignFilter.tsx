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

  let healthCareCounter = 0
  let disastersCounter = 0
  let othersCounter = 0
  let charityCounter = 0
  let eventsCounter = 0
  let environmentCounter = 0
  let sportCounter = 0
  let artCounter = 0
  let educationCounter = 0
  let natureAndAnimalsCounter = 0

  campaigns?.map((campaign) => {
    campaignTypes?.map((type) => {
      if (campaign.campaignTypeId == type.id) {
        if (type.category == 'medical') {
          healthCareCounter++
        } else if (type.category == 'charity') {
          charityCounter++
        } else if (type.category == 'disasters') {
          disastersCounter++
        } else if (type.category == 'education') {
          educationCounter++
        } else if (type.category == 'events') {
          eventsCounter++
        } else if (type.category == 'environment') {
          environmentCounter++
        } else if (type.category == 'sport') {
          sportCounter++
        } else if (type.category == 'art') {
          artCounter++
        } else if (type.category == 'others') {
          othersCounter++
        } else if (type.category == 'animals' || type.category == 'nature') {
          natureAndAnimalsCounter++
        }
      }
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
            if (type.category == 'medical') {
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
            if (type.category == 'nature' || type.category == 'animals') {
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
            if (type.category == 'disasters') {
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
            if (type.category == 'others') {
              result.push(campaign)
            }
          }
        })
        setCampaignToShow(result)
      })
    }
  }, [campaignType])

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
          <Typography sx={{ marginBottom: '4%' }}>
            Животни/Природа ({natureAndAnimalsCounter}){' '}
          </Typography>
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
          <Typography sx={{ marginBottom: '4%' }}>
            Животни/Природа ({natureAndAnimalsCounter})
          </Typography>
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
