import React from 'react'
import { DataGrid, GridColumns } from '@mui/x-data-grid'

import { DialogStore } from 'stores/DialogStore'
import { useInfoRequestList } from 'common/hooks/infoRequest'
import { dateFormatter } from 'common/util/date'

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
    valueFormatter: (d) => typeof d.value === 'string' && dateFormatter(d.value),
    minWidth: 300,
  },
]

export default function InfoRequestGrid() {
  const { data } = useInfoRequestList()
  const [hidden, setHidden] = React.useState(true)

  // const handleDirectionChange = (event) => {
  //   setDirection(event.target.value)
  // }

  // const handleHiddenChange = (event) => {
  //   setHidden(event.target.checked)
  // }
  return (
    <>
      <DataGrid
        rows={data || []}
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        onRowClick={(p) => DialogStore.show(p, `${p.getValue(p.id, 'name')}`)}
      />
    </>
  )
}
