import { useTranslation } from 'next-i18next'
import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { WhatUnitesUsItem } from './memberData'
import { staticUrls } from 'common/routes'
import theme from 'common/theme'

type MemberCardProps = {
  info: WhatUnitesUsItem
}

export default function MemberCard({ info }: MemberCardProps) {
  const { t } = useTranslation()

  return (
    <Card sx={{ backgroundColor: theme.palette.secondary.light }}>
      <Box
        m="auto"
        maxWidth={200}
        height={200}
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Avatar src={info.img} sx={{ width: 150, height: 150 }} />
      </Box>
      <CardContent sx={{ paddingX: theme.spacing(1) }}>
        <Typography gutterBottom variant="h6" component="div" align="center">
          {t(info.title)}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {t(info.content)}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          size="small"
          variant="text"
          style={{ color: 'black' }}
          href={staticUrls.blog + info.blogLink}>
          {t('common:cta.read-more')}
        </Button>
        <DoubleArrowIcon fontSize="inherit" />
      </CardActions>
    </Card>
  )
}
