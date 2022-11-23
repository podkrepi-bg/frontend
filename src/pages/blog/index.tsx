import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BlogIndexPage from 'components/blog/BlogIndexPage'
import { createGhostClient } from 'common/util/ghost-client'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const client = createGhostClient()
  const posts = await client.posts.browse()

  if (!posts) {
    return { notFound: true }
  }

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'blog'])),
    },
  }
}

export default BlogIndexPage
