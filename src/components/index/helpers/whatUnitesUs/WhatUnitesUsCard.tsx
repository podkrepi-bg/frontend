import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { WhatUnitesUsItem } from './whatUnitesUsData'

type WhatUnitesUsCardProps = {
  info: WhatUnitesUsItem
}

const useStyles = makeStyles(() =>
  createStyles({
    circle: {
      height: 75,
      width: 75,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
    },
  }),
)

export default function WhatUnitesUsCard({ info }: WhatUnitesUsCardProps) {
  const classes = useStyles()
  return (
    <Card elevation={0}>
      <Box
        className={classes.circle}
        sx={{
          border: `2px solid ${info.iconColor}`,
        }}>
        {info.icon ? <info.icon sx={{ height: 45, width: 45, fill: info.iconColor }} /> : null}
      </Box>
      <CardHeader title={info.title} />
      <CardContent>{info.content}</CardContent>
    </Card>
  )
}
