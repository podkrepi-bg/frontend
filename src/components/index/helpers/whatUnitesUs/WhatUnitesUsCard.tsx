import { useTranslation } from 'next-i18next'
import { Box, Card, CardContent, CardHeader } from '@mui/material'

import { WhatUnitesUsItem } from './whatUnitesUsData'

type WhatUnitesUsCardProps = {
  info: WhatUnitesUsItem
}

export default function WhatUnitesUsCard({ info }: WhatUnitesUsCardProps) {
  const { t } = useTranslation()

  return (
    <Card elevation={0} sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          height: 75,
          width: 75,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          border: `2px solid ${info.iconColor}`,
          m: 'auto',
        }}>
        {info.icon ? <info.icon sx={{ height: 45, width: 45, fill: info.iconColor }} /> : null}
      </Box>
      <CardHeader title={t(info.title)} />
      <CardContent sx={{ px: 1 }}>{t(info.content)}</CardContent>
    </Card>
  )
}
