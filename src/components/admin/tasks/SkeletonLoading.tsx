import * as React from 'react'
import Skeleton from '@mui/material/Skeleton'

export default function SkeletonLoading() {
  return (
    <div style={{width:'100%'}}>
      <Skeleton sx={{ width: '100%', height: '15px' }} />
      <Skeleton sx={{ width: '100%', height: '15px' }} />
    </div>
  )
}
