import { Card, CardContent, CardHeader } from '@mui/material'
import { WhatUnitesUsItem } from './memberData'

type MemberCardProps = {
  info: WhatUnitesUsItem
}

export default function MemberCard({ info }: MemberCardProps) {
  return (
    <Card elevation={0}>
      <CardHeader title={info.title} />
      <CardContent>{info.content}</CardContent>
    </Card>
  )
}
