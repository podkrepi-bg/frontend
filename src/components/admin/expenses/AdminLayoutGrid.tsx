import { ExpenseInterface, useExpensesList } from 'common/hooks/expenses'
import { useState } from 'react'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { ButtonGroup } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import { UseBaseQueryResult } from 'react-query'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, GridColumns, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'

// import { BootcampIntern } from 'lib/interfaces/BootcampIntern'
// import { useBootcampInternsList } from 'common/hooks/bootcampIntern'

// import DeleteModal from './DeleteModal'
import { drawerWidth } from './LayoutDrawer'
// import BootcampModal from './BootcampModal'
// import DataGridHeader from './DataGridHeader'
import { ExpenseType } from 'gql/expense'

const useStyles = makeStyles(() => {
  return {
    adminLayoutGrid: {
      marginLeft: drawerWidth,
      backgroundColor: '#f9f9f9',
      width: '100%',
      border: 'none',
      borderTop: '1px solid lightgray',
    },
    dataGridHeader: {
      marginLeft: drawerWidth,
      marginTop: '40px',
    },
    icons: {
      cursor: 'pointer',
    },
    adminLayoutGridParent: {
      display: 'flex',
      width: '895px',
      height: 'auto',
      alignItems: 'center',
      flexFlow: 'column wrap',
      justifyContent: 'center',
      marginLeft: drawerWidth,
    },
  }
})

const iconsStyle = { cursor: 'pointer' }

export default function AdminLayoutGrid() {
  const { data }: UseBaseQueryResult<ExpenseInterface[]> = useExpensesList()
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([])

  const router = useRouter()
  const classes = useStyles()

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'type',
      headerName: 'Type',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 345,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      renderCell: (cellValues) => {
        return (
          <ButtonGroup>
            <InfoIcon color="primary" style={iconsStyle} />
            <EditIcon color="primary" style={iconsStyle} />
            <DeleteIcon color="primary" style={iconsStyle} />
          </ButtonGroup>
        )
      },
      width: 150,
      align: 'right',
      headerAlign: 'center',
    },
  ]

  return (
    <div className={classes.adminLayoutGridParent}>
      <DataGrid
        className={classes.adminLayoutGrid}
        style={{ marginTop: '200px' }}
        rows={data || []}
        columns={columns}
        pageSize={4}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel): void => {
          setSelectedRows(newSelectionModel)
        }}
      />
    </div>
  )
}
