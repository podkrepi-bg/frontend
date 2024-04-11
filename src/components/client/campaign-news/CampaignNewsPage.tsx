import React from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Grid, PaginationItem, Divider } from '@mui/material'
import Pagination from '@mui/material/Pagination'

import theme from 'common/theme'

import { baseUrl, routes } from 'common/routes'
import Layout from 'components/client/layout/Layout'
import { styled } from '@mui/material/styles'

import { useCampaignNewsList } from 'common/hooks/campaign-news'

import Link from 'next/link'

import dynamic from 'next/dynamic'

import BreadcrumbWrapper from 'components/common/BreadcrumbWrapper'

const CampaignNewsList = dynamic(() => import('./CampaignNewsList'), { ssr: false })

const PREFIX = 'CampaignsNewsPage'

const classes = {
  title: `${PREFIX}-title`,
  subheading: `${PREFIX}-subheading`,
  support: `${PREFIX}-support`,
  applyButton: `${PREFIX}-applyButton`,
  arrowIcon: `${PREFIX}-arrowIcon`,
}

const Root = styled(Layout)(({ theme }) => ({
  [`& .${classes.title}`]: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(45),
    lineHeight: theme.typography.pxToRem(60),
    letterSpacing: theme.typography.pxToRem(-1.5),
    marginBottom: theme.spacing(1),
  },

  '.ql-video, img': {
    margin: '0 auto',
    display: 'block',
  },
}))

type Props = {
  page: number
  slug: string | null
}

export default function CampaignNewsPage({ page, slug = null }: Props) {
  const { data } = useCampaignNewsList(page, slug)
  const { t } = useTranslation('news')

  //TODO: Fill breadcumbs dynamically
  const breadcumbData = [
    { label: 'campaigns', url: routes.campaigns.index },
    { label: 'news', url: '' },
  ]
  if (slug && data) {
    breadcumbData.splice(1, 0, {
      label: data.campaign.title,
      url: routes.campaigns.viewCampaignBySlug(data.campaign.slug),
    })
  }

  return (
    <Root
      maxWidth={false}
      style={{ padding: theme.spacing(0) }}
      prevPage={
        data?.pagination.prevPage
          ? `${baseUrl}${routes.campaigns.news.listNewsPaginated(data?.pagination.prevPage, slug)}`
          : undefined
      }
      nextPage={
        data?.pagination.nextPage
          ? `${baseUrl}${routes.campaigns.news.listNewsPaginated(data?.pagination.nextPage, slug)}`
          : undefined
      }>
      <Grid>
        <Grid
          sx={{
            padding: theme.spacing(0, 3),
            margin: '0 auto',

            [theme.breakpoints.up('sm')]: {
              padding: theme.spacing(0, 5),
            },

            [theme.breakpoints.up('lg')]: {
              maxWidth: '1280px',
            },
          }}>
          <Typography variant="h1" component="p" className={classes.title}>
            {t('news')}
          </Typography>
          <BreadcrumbWrapper crumb={breadcumbData} />
          <Divider orientation="horizontal" sx={{ marginBottom: theme.spacing(4) }} />
        </Grid>
        {data && data?.campaign.campaignNews.length > 0 && (
          <CampaignNewsList articles={data.campaign.campaignNews} />
        )}
        <Grid>
          {data && data?.pagination.totalPages > 1 && (
            <Pagination
              count={data?.pagination.totalPages}
              page={data?.pagination.currentPage}
              sx={{ ul: { justifyContent: 'center' }, marginTop: theme.spacing(6) }}
              renderItem={(item) => {
                if (item.disabled || !item.page) {
                  return <PaginationItem {...item} />
                }
                return (
                  <Link href={routes.campaigns.news.listNewsPaginated(item.page, slug)} passHref>
                    <PaginationItem {...item} />
                  </Link>
                )
              }}
            />
          )}
        </Grid>
      </Grid>
    </Root>
  )
}
