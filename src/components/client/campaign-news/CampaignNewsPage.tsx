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
import { CampaignNewsWithPaginationResponse } from 'gql/campaign-news'

import CampaignNewsList from './CampaignNewsList'

import BreadcrumbWrapper from 'components/common/BreadcrumbWrapper'

const PREFIX = 'CampaignsNewsPage'

const classes = {
  title: `${PREFIX}-title`,
  subheading: `${PREFIX}-subheading`,
  support: `${PREFIX}-support`,
  applyButton: `${PREFIX}-applyButton`,
  arrowIcon: `${PREFIX}-arrowIcon`,
  defaultPadding: `${PREFIX}-defaultPadding`,
}

const Root = styled(Layout)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    padding: 0,
    margin: 0,
    paddingTop: theme.spacing(1),
    maxWidth: theme.spacing(300),
  },

  [theme.breakpoints.up(2000)]: {
    paddingTop: theme.spacing(1),
  },

  [`& .${classes.defaultPadding}`]: {
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },

  [theme.breakpoints.down('sm')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },

  [`& .${classes.title}`]: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(45),
    lineHeight: theme.typography.pxToRem(60),
    letterSpacing: theme.typography.pxToRem(-1.5),
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
      label: data.articles[0].campaign.title,
      url: routes.campaigns.viewCampaignBySlug(data.articles[0].campaign.slug),
    })
  }

  return (
    <Root
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
        <Grid className={classes.defaultPadding}>
          <Typography variant="h1" component="p" className={classes.title}>
            {t('news')}
          </Typography>
          <BreadcrumbWrapper crumb={breadcumbData} />
          <Divider orientation="horizontal" />
        </Grid>
        {data && data?.articles.length > 0 && <CampaignNewsList articles={data.articles} />}
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
                  <Link href={routes.campaigns.news.listNewsPaginated(item.page, slug)}>
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
