import React from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import Layout from 'components/cars/Layout'
import Grid from 'components/documents/grid/Grid'

export default function DocumentsPage() {
  return (
    <Layout>
      <Grid />
      <ReactQueryDevtools initialIsOpen={false} />
    </Layout>
  )
}
