import React from 'react'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box } from '@mui/material'

const renderCell = (cellValues: GridRenderCellParams): React.ReactNode => {
  const style =
    cellValues.field === 'status' && cellValues.value === 'verified'
      ? { color: 'green' }
      : cellValues.field === 'status' && cellValues.value === 'verification_failed'
      ? { color: 'red' }
      : cellValues.field === 'status' && cellValues.value === 'new'
      ? { color: 'blue' }
      : cellValues.field === 'status' && cellValues.value === 'errored'
      ? { color: 'red' }
      : cellValues.field === 'status' && cellValues.value === 'validated'
      ? { color: 'green' }
      : { color: '' }

  return <Box sx={style}>{cellValues.value}</Box>
}

export const renderCellWithdraws = (): React.ReactNode => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ cursor: 'pointer', color: 'hsl(206,100%,40%)' }}>Отваряне</Box>
    </Box>
  )
}

export const commonProps: Partial<GridColDef> = {
  align: 'left',
  width: 150,
  headerAlign: 'left',
  renderCell,
}
