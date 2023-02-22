import React from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'

import { ExpenseStatus } from 'gql/expenses'

export const statusRenderCell = (cellValues: GridRenderCellParams): React.ReactNode => {
  const style =
    cellValues.value === ExpenseStatus.pending
      ? { color: 'blue' }
      : cellValues.value === ExpenseStatus.approved
      ? { color: 'green' }
      : cellValues.value === ExpenseStatus.canceled
      ? { color: 'red' }
      : { color: '' }

  return <div style={style}>{cellValues.value}</div>
}
