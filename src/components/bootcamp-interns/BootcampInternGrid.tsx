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

import { BootcampIntern } from 'lib/interfaces/BootcampIntern'
import { useBootcampInternsList } from 'common/hooks/bootcampIntern'

import DeleteModal from './DeleteModal'
import { drawerWidth } from './MyDrawer'
import BootcampModal from './BootcampModal'
import DataGridHeader from './DataGridHeader'

const useStyles = makeStyles(() => {
  return {
    internDataGrid: {
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
    datagridParent: {
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

export default function BootcampInternGrid() {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([])
  const [details, setDetails] = useState<null | string[]>(null)
  const [deleteData, setDeleteData] = useState<string | unknown>('')
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const router = useRouter()
  const classes = useStyles()

  const { data }: UseBaseQueryResult<BootcampIntern[]> = useBootcampInternsList()

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 230,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 230,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 230,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      renderCell: (cellValues) => {
        return (
          <ButtonGroup>
            <InfoIcon
              color="success"
              onClick={() => detailsClickHandler(cellValues)}
              style={iconsStyle}
            />
            <EditIcon onClick={() => editClickHandler(cellValues)} style={iconsStyle} />
            <DeleteIcon
              color="error"
              onClick={() => deleteClickHandler(cellValues)}
              style={iconsStyle}
            />
          </ButtonGroup>
        )
      },
      width: 150,
      align: 'right',
      headerAlign: 'center',
    },
  ]

  const editClickHandler = (cellValues: GridRenderCellParams) => {
    router.push(`/bootcamp-interns/${cellValues.id}/edit`)
  }

  const deleteClickHandler = (cellValues: GridRenderCellParams) => {
    const dialogTitle = `Are you sure you want to delete ${cellValues.row.firstName} ${cellValues.row.lastName} ?`
    const email = cellValues.row.email
    const id = cellValues.row.id
    const dataForProps = { email, dialogTitle, id }
    setDeleteOpen(true)
    setDeleteData(dataForProps)
  }

  const deleteProps = { deleteOpen, setDeleteOpen, deleteData }

  function detailsClickHandler(cellValues: GridRenderCellParams) {
    setDetails({ ...cellValues.row })
    setOpen(true)
  }

  const bootcampProps = { data, open, setOpen, ...details }

  return (
    <div className={classes.datagridParent}>
      <DataGrid
        className={classes.internDataGrid}
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
      <DataGridHeader selected={selectedRows} />
      <Box>
        <BootcampModal modalProps={bootcampProps} />
        <DeleteModal modalProps={deleteProps}></DeleteModal>
      </Box>
    </div>
  )
}
