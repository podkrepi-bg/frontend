import React, { useState } from 'react'
import { DataGrid, GridColumns } from '@mui/x-data-grid'

import { DialogStore } from 'stores/DialogStore'
import { formatDateString } from 'common/util/date'
import { useInfoRequestList } from 'common/hooks/infoRequest'

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'name',
    headerName: 'Name',
    valueGetter: (p) => `${p.row.person.firstName} ${p.row.person.lastName}`,
    flex: 2,
  },
  {
    field: 'email',
    headerName: 'Email',
    valueGetter: (p) => p.row.person.email,
    flex: 3,
  },
  {
    field: 'message',
    headerName: 'Message',
    flex: 3,
  },
  {
    field: 'createdAt',
    headerName: 'Date',
    valueFormatter: (d) => typeof d.value === 'string' && formatDateString(d.value),
    minWidth: 300,
  },
]

export default function InfoRequestGrid() {
  const { data } = useInfoRequestList()

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  return (
    <DataGrid
      rows={data || []}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      autoHeight
      autoPageSize
      disableRowSelectionOnClick
      onRowClick={(p, event) => {
        const elm = event.target as HTMLInputElement
        if (elm.type != 'checkbox') {
          DialogStore.show(p, `${p.getValue(p.id, 'name')}`)
        }
      }}
    />
  )
}
