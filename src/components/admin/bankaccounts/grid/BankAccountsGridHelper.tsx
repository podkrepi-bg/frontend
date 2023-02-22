import React from 'react'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

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

export const renderCellWithdraws = (): React.ReactNode => {
  return (
    <div style={{ width: '100%' }}>
      <p style={{ cursor: 'pointer', color: 'hsl(206,100%,40%)' }}>Отваряне</p>
    </div>
  )
}

export const commonProps: Partial<GridColDef> = {
  align: 'left',
  width: 150,
  headerAlign: 'left',
  renderCell,
}
