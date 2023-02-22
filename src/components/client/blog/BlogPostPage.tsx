import React from 'react'
import { PostOrPage } from '@tryghost/content-api'
import { Container, Typography, Unstable_Grid2 as Grid2 } from '@mui/material'

import { baseUrl, routes } from 'common/routes'
import Layout from 'components/client/layout/Layout'
import BackButton from 'components/common/navigation/BackButton'

import ReadingTime from './ReadingTime'
import DateCreated from './DateCreated'
import FeaturedImage from './FeaturedImage'
import RenderContent from './RenderContent'

type Props = {
  post: PostOrPage
  referer: string | null
}
export default function BlogPostPage({ post, referer }: Props) {
  return (
    <Layout
      canonicalUrl={`${baseUrl}${routes.blog.postBySlug(post.slug)}`}
      metaTitle={post.title}
      metaDescription={post.excerpt}
      ogImage={post.og_image ?? undefined}>
      <Container maxWidth="lg">
        <Grid2 container spacing={2}>
          <Grid2 xs={12} xsOffset={0}>
            <BackButton href={referer ?? routes.blog.index} />
          </Grid2>
          <Grid2 xs={12}>
            <Typography paragraph variant="h3" component="h1" align="center">
              {post.title}
            </Typography>
          </Grid2>
          <Grid2 xs={10} xsOffset={1} textAlign="center">
            <DateCreated showLabel createdAt={post.created_at} />
            <ReadingTime showLabel readingTime={post.reading_time} />
          </Grid2>
          <Grid2 xs={10} xsOffset={1}>
            <FeaturedImage
              priority
              sizes="33vw"
              height="25rem"
              src={post.feature_image}
              alt={post.feature_image_alt ?? post.title ?? ''}
              title={post.feature_image_caption ?? post.title}
            />
          </Grid2>
          <Grid2 xs={12} sm={10} smOffset={1}>
            <RenderContent html={post.html} />
          </Grid2>
          <Grid2 xs={12} textAlign="center">
            <BackButton href={referer ?? routes.blog.index} />
          </Grid2>
        </Grid2>
      </Container>
    </Layout>
  )
}
