import React from 'react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { PostsOrPages } from '@tryghost/content-api'
import { Container, Stack, Typography, Unstable_Grid2 as Grid2 } from '@mui/material'

import { routes } from 'common/routes'
import Link from 'components/common/Link'
import Layout from 'components/layout/Layout'

import ReadingTime from './ReadingTime'
import DateCreated from './DateCreated'
import FeaturedImage from './FeaturedImage'

type Props = {
  posts: PostsOrPages
}
export default function BlogIndexPage({ posts }: Props) {
  const { t } = useTranslation()

  return (
    <Layout title={t('blog:title')} metaDescription={t('blog:description')}>
      <Container maxWidth="lg">
        <Grid2 container rowSpacing={2} columnSpacing={2}>
          {posts.map((post) => (
            <Grid2 key={post.id} xs={4}>
              <Grid2 container direction="column" spacing={2}>
                <Grid2 xs={12}>
                  <NextLink href={routes.blog.postBySlug(post.slug)}>
                    <FeaturedImage
                      height="18rem"
                      showPlaceholder
                      objectFit="cover"
                      objectPosition="center top"
                      src={post.feature_image}
                      alt={post.feature_image_alt ?? post.title ?? ''}
                      title={post.feature_image_caption ?? post.title}
                    />
                  </NextLink>
                </Grid2>
                <Grid2 xs={12}>
                  <Stack direction="column" spacing={2}>
                    <Link href={routes.blog.postBySlug(post.slug)}>
                      <Typography
                        fontSize={16}
                        variant="button"
                        color="primary.dark"
                        title={post.feature_image_caption ?? post.title}>
                        {post.title}
                      </Typography>
                    </Link>
                    <Stack direction="row" justifyContent="space-between">
                      <DateCreated createdAt={post.created_at} />
                      <ReadingTime readingTime={post.reading_time} />
                    </Stack>
                  </Stack>
                </Grid2>
              </Grid2>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Layout>
  )
}
