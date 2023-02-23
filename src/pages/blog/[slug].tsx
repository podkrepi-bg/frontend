import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps } from 'next'
import BlogPostPage from 'components/client/blog/BlogPostPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { createGhostClient } from 'common/util/ghost-client'

export const getServerSideProps: GetServerSideProps = async ({ req, params, locale }) => {
  if (typeof params?.slug !== 'string') return { notFound: true }

  const referer = req.headers.referer ?? null
  try {
    const client = createGhostClient()
    const post = await client.posts.read({ slug: params.slug })

    if (!post) {
      return { notFound: true }
    }
    return {
      props: {
        post,
        referer,
        ...(await serverSideTranslations(locale ?? 'bg', ['common', 'blog'])),
      },
    }
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    return { notFound: true }
  }
}

export default BlogPostPage
