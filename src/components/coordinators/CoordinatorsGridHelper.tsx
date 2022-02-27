import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import React from 'react'

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

  return <div style={style}>{cellValues.value}</div>
}

export const commonProps: Partial<GridColDef> = {
  align: 'left',
  width: 150,
  headerAlign: 'left',
  renderCell,
}
