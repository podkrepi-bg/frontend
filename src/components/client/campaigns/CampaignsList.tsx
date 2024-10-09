import { useMemo, useState, useEffect } from 'react'

import { CampaignResponse } from 'gql/campaigns'

import Image from 'next/image'

import { Box, Grid, Pagination } from '@mui/material'

import useMobile from 'common/hooks/useMobile'
import CampaignCard from './CampaignCard/CampaignCard'

type Props = {
  campaignToShow: CampaignResponse[]
}

export default function CampaignsList({ campaignToShow }: Props) {
  const { mobile } = useMobile()

  const [currentPage, setCurrentPage] = useState(1)

  const campaignsPerPage = 20

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
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
        <Grid container justifyContent="center" sx={{ mt: 5 }} alignItems="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            siblingCount={1}
            boundaryCount={1}
            size="large"
          />
        </Grid>
      )}

      <Grid item xs={12} textAlign="center">
        <Box sx={{ mt: 6 }}>
          {mobile ? (
            <Image
              alt="Donation graphic mobile"
              src="/img/donation-graphic-mobile.svg"
              width={300}
              height={300}
            />
          ) : (
            <Image
              alt="Donation graphic"
              src="/img/donation-graphic.png"
              width={813}
              height={358}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
