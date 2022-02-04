import { IconButton } from '@mui/material'
import { DataGrid, GridColumns, GridRowId, GridValueGetterParams } from '@mui/x-data-grid'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { DialogStore } from '../layout/DetailsModal/BootcampModalStore'
import { DeleteModalStore } from '../layout/DeleteModal/DeleteModalStore'
import theme from '../layout/theme'
import { useState } from 'react'
import { DeleteManyModalStore } from '../layout/DeleteManyModal/DeleteManyModalStore'
import SubmitButton from 'components/common/form/SubmitButton'
import { CityResponse } from 'gql/city'
import { useRouter } from 'next/router'

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'City name',
    headerName: 'Name',
    valueGetter: (p) => {
      return `${p.row.name}`
    },
    flex: 1,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: (params: GridValueGetterParams) => {
      return (
        <div>
          <IconButton
            onClick={() => DialogStore.show(params.row)}
            style={{ color: theme.palette.primary.main }}>
            <InfoIcon></InfoIcon>
          </IconButton>
          <IconButton
            onClick={() => {
              window.location.pathname = `/city/edit/${params.row.id}`
            }}
            style={{ color: theme.palette.secondary.main }}>
            <EditIcon></EditIcon>
          </IconButton>
          <IconButton
            onClick={() => DeleteModalStore.show(params.row, 'Delete city')}
            style={{ color: theme.palette.primary.dark }}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>
      )
    },
    flex: 0.15,
  },
]

interface GenericGridProps {
  data: CityResponse[]
}

export default function GenericGrid(props: GenericGridProps) {
  const cities = props.data
  const [rows, setRows] = useState<GridRowId[]>([])
  const router = useRouter()
  return (
    <>
      <>
        <SubmitButton
          sx={{
            fontSize: '13px',
            marginTop: '1%',
            width: '25%',
            marginLeft: '25%',
            bgcolor: theme.palette.primary.light,
          }}
          onClick={() => {
            router.push('/city/add')
          }}
          href="#"
          label="Add city">
          <AddIcon></AddIcon> Add city
        </SubmitButton>
        <SubmitButton
          key="button"
          sx={{
            bgcolor: theme.palette.primary.light,
            marginLeft: '55%',
            width: '25%',
            display: 'absolute',
            marginTop: '-5%',
          }}
          label={`Delete selected cities (${rows.length})`}
          onClick={() => DeleteManyModalStore.show(rows.map(String))}
          disabled={rows.length === 0}></SubmitButton>
      </>
      <DataGrid
        key="grid"
        style={{ marginBottom: '10%', width: '90%', marginLeft: '10%' }}
        checkboxSelection={true}
        rows={cities || []}
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          setRows(ids)
          console.log(rows)
        }}
      />
    </>
  )
}
