import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'

export const statusRenderCell = (cellValues: GridRenderCellParams): React.ReactNode => {
  const style =
    cellValues.value === 'pending'
      ? { color: 'blue' }
      : cellValues.value === 'approved'
      ? { color: 'green' }
      : cellValues.value === 'canceled'
      ? { color: 'red' }
      : { color: '' }

  return <div style={style}>{cellValues.value}</div>
}
