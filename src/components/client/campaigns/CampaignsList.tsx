import { useMemo, useState, useEffect } from 'react'
import { CampaignResponse } from 'gql/campaigns'
import Image from 'next/image'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import useMobile from 'common/hooks/useMobile'
import theme from 'common/theme'
import CampaignCard from './CampaignCard/CampaignCard'

type Props = { 
  campaignToShow: CampaignResponse[] 
}

export default function CampaignsList({ campaignToShow }: Props) {
  const { mobile } = useMobile()
  const campaignsPerPage = 20
  const [currentPage, setCurrentPage] = useState(1)
  const totalCampaigns = campaignToShow?.length || 0
  const totalPages = Math.ceil(totalCampaigns / campaignsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [campaignToShow])

  const campaigns = useMemo<CampaignResponse[]>(() => {
    const startIndex = (currentPage - 1) * campaignsPerPage
    const endIndex = startIndex + campaignsPerPage
    return campaignToShow?.slice(startIndex, endIndex) ?? []
  }, [campaignToShow, currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const renderPageButtons = () => {
    const renderPageButton = (pageNumber: number) => (
      <Button
        key={pageNumber}
        onClick={() => handlePageClick(pageNumber)}
        disabled={pageNumber === currentPage}
        sx={{
          fontFamily: "'Lato', sans-serif",
          fontSize: theme.typography.pxToRem(16),
          letterSpacing: '0.4px',
          textDecoration: 'none',
          minWidth: theme.spacing(5),
          height: theme.spacing(5),
          fontWeight: 500,
          margin: theme.spacing(0, 0.5),
          backgroundColor: pageNumber === currentPage ? '#b7ddf8' : 'transparent',
          color: pageNumber === currentPage ? '#41a6ee' : '#212121',
          '&.Mui-disabled': {
            color: '#41a6ee',
            backgroundColor: '#b7ddf8',
          },
          '&:hover': {
            backgroundColor: pageNumber === currentPage ? '#b7ddf8' : theme.palette.secondary.light,
            color: '#41a6ee',
          },
        }}
      >
        {pageNumber}
      </Button>
    )

    const pageButtons = []
    const startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, startPage + 2)
    const showEllipsis = endPage < totalPages

    if (startPage > 1) {
      pageButtons.push(renderPageButton(1))
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(renderPageButton(i))
    }

    if (showEllipsis) {
      pageButtons.push(
        <Typography
          sx={{
            fontFamily: "'Lato', sans-serif",
            fontSize: theme.typography.pxToRem(16),
            letterSpacing: '0.4px',
            minWidth: theme.spacing(5),
            height: theme.spacing(5),
            fontWeight: 500,
            margin: theme.spacing(0, 0.5),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#212121',
          }}
        >
          ...
        </Typography>
      )
    }

    if (showEllipsis || endPage < totalPages) {
      pageButtons.push(renderPageButton(totalPages))
    }

    return pageButtons
  }

  return (
    <Grid container justifyContent="center" spacing={4}>
      {campaigns?.map((campaign, index) => (
        <Grid key={campaign.id} item xs={12} sm={6} lg={3}>
          <Box sx={{ textAlign: 'center' }}>
            <CampaignCard index={index} campaign={campaign} />
          </Box>
        </Grid>
      ))}

      {totalCampaigns > campaignsPerPage && (
        <Grid container justifyContent="center" sx={{ mt: 4 }} alignItems="center">
          <IconButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            sx={{
              color: theme.palette.common.black,
              marginRight: theme.spacing(2),
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>

          {renderPageButtons()}

          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            sx={{
              color: theme.palette.common.black,
              marginLeft: theme.spacing(2),
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Grid>
      )}

      <Grid item xs={12} textAlign="center">
        <Box sx={{ my: 10 }}>
          {mobile ? (
            <Image alt="Information artboard mobile" src="/img/ArtboardMobile.svg" width={300} height={300} />
          ) : (
            <Image alt="Information artboard" src="/img/Artboard.png" width={813} height={358} />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
