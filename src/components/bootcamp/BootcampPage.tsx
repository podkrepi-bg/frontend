import React from 'react'
import Link from 'next/link'
import { IconButton, Typography } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'

import { routes } from '../../common/routes'

import BootcampGrid from './BootcampGrid'
import Layout from './Layout'

export default function BootcampPage() {
  return (
    <Layout>
      <Typography variant="h4" sx={{ p: 1 }}>
        Bootcampers
      </Typography>
      <Link href={routes.bootcamp.create}>
        <IconButton>
          <AddCircleOutlinedIcon />
        </IconButton>
      </Link>

      <BootcampGrid />
    </Layout>
  )
}
