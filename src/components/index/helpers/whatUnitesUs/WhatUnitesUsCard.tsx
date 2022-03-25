import { Card, CardContent, CardHeader } from '@mui/material'
import { WhatUnitesUsItem } from './whatUnitesUsData'

type WhatUnitesUsCardProps = {
  info: WhatUnitesUsItem
}

export default function WhatUnitesUsCard({ info }: WhatUnitesUsCardProps) {
  return (
    <Card elevation={0}>
      <CardHeader title={info.title} />
      <CardContent>{info.content}</CardContent>
    </Card>
  )
}
