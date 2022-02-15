import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

import Layout from 'components/layout/Layout'
import { useBootcampSingle } from 'common/hooks/bootcamp'

type Props = { id: string }
export default function BootcampPage({ id }: Props) {
  const { data } = useBootcampSingle(id)

  return (
    <Layout>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {data?.firstName} {data?.lastName}
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  )
}
