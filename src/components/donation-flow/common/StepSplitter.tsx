import React from 'react'
import { Avatar, Box, Typography, Unstable_Grid2 as Grid2 } from '@mui/material'
import { styled } from '@mui/styles'
import theme from 'common/theme'
import { grey } from '@mui/material/colors'

type StepSplitterProps = {
  content: string
  active?: boolean
}

const StyledLine = styled('div')(() => ({
  width: '100%',
  height: '1px',
  backgroundColor: grey[400],
  margin: '0 0 0 0',
}))

function StepSplitter({ content, active }: StepSplitterProps) {
  return (
    <Box justifyContent="center" alignItems="center" display="flex" marginY={theme.spacing(2)}>
      <StyledLine />
      <Avatar
        sx={{
          bgcolor: active ? theme.palette.primary.main : grey[400],
          width: 22,
          height: 22,
          marginX: theme.spacing(2),
        }}>
        <Typography fontSize={theme.typography.fontSize}>{content}</Typography>
      </Avatar>
      <StyledLine />
    </Box>
  )
}

export default StepSplitter
