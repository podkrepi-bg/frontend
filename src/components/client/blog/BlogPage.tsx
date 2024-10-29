import React from 'react'
import { PostOrPage } from '@tryghost/content-api'
import { Container, Typography, Grid2 } from '@mui/material'

import { baseUrl, routes } from 'common/routes'
import Layout from 'components/client/layout/Layout'
import BackButton from 'components/common/navigation/BackButton'

import ReadingTime from './ReadingTime'
import DateCreated from './DateCreated'
import FeaturedImage from './FeaturedImage'
import RenderContent from './RenderContent'

type Props = {
  page: PostOrPage
}
export default function BlogPage({ page }: Props) {
  return (
    <Layout
      canonicalUrl={`${baseUrl}${routes.blog.pageBySlug(page.slug)}`}
      metaTitle={page.title}
      metaDescription={page.excerpt}
      ogImage={page.og_image ?? undefined}>
      <Container maxWidth="lg">
        <Grid2 container spacing={2}>
          <Grid2 sx={{ pl: 4 }} size={{ xs: 12 }} offset={{ xs: 0 }}>
            <BackButton href={routes.blog.index} />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography paragraph variant="h3" component="h1" align="center">
              {page.title}
            </Typography>
          </Grid2>
          <Grid2 textAlign="center" size={{ xs: 10 }} offset={{ xs: 1 }}>
            <DateCreated showLabel createdAt={page.published_at as string} />
            <ReadingTime showLabel readingTime={page.reading_time} />
          </Grid2>
          <Grid2 size={{ xs: 10 }} offset={{ xs: 1 }}>
            <FeaturedImage
              priority
              sizes="33vw"
              height="25rem"
              src={page.feature_image}
              alt={page.feature_image_alt ?? page.title ?? ''}
              title={page.feature_image_caption ?? page.title}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }} offset={{ xs: 1 }}>
            <RenderContent html={page.html} />
          </Grid2>
          <Grid2 textAlign="center" size={{ xs: 12 }}>
            <BackButton href={routes.index} />
          </Grid2>
        </Grid2>
      </Container>
    </Layout>
  )
}
