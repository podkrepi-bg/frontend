import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

import theme from 'common/theme'

type StepSplitterProps = {
  content?: string
  active?: boolean
}

const Line = () => {
  return <Box width="100%" height="1px" sx={{ backgroundColor: grey[400] }} />
}

function StepSplitter({ content, active }: StepSplitterProps) {
  return (
    <Box justifyContent="center" alignItems="center" display="flex" marginY={theme.spacing(3)}>
      <Line />
      {content ? (
        <Avatar
          sx={{
            bgcolor: active ? theme.palette.primary.main : grey[400],
            width: 22,
            height: 22,
            marginX: theme.spacing(2),
          }}>
          <Typography fontSize={theme.typography.fontSize}>{content}</Typography>
        </Avatar>
      ) : null}
      <Line />
    </Box>
  )
}

export default StepSplitter
