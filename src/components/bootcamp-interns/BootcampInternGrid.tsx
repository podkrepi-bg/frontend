import { makeStyles } from '@mui/styles'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useBootcampInternsList } from 'common/hooks/bootcampIntern'
import { ButtonGroup } from '@mui/material'
import { drawerWidth } from './MyDrawer'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import InfoIcon from '@mui/icons-material/Info'
import { useState } from 'react'
import BootcampModal from './BootcampModal'
import { Box } from '@mui/material'
import DeleteModal from './DeleteModal'
import React from 'react'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const { data } = useBootcampInternsList()

  const [details, setDetails] = useState(null || {})
  const [deleteData, setDeleteData] = useState(null || {})
  const [deleteOpen, setDeleteOpen] = useState(false)

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

  const editClickHandler = (cellValues: any) => {
    router.push(`/bootcamp-interns/${cellValues.id}/edit`)
  }

  const deleteClickHandler = (cellValues: any) => {
    const dialogTitle = `Are you sure you want to delete ${cellValues.row.firstName} ${cellValues.row.lastName} ?`
    const email = cellValues.row.email
    const id = cellValues.row.id
    const dataForProps: any = { email, dialogTitle, id }
    setDeleteOpen(true)
    setDeleteData(dataForProps)
  }

  const deleteProps = {
    deleteOpen,
    setDeleteOpen,
    deleteData,
  }

  function detailsClickHandler(cellValues: any) {
    setDetails({ ...cellValues.row })
    setOpen(true)
  }

  const bootcampProps = {
    data,
    open,
    setOpen,
    ...details,
  }

  const [selectedRows, setSelectedRows] = useState([])

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
        onSelectionModelChange={(newSelectionModel) => {
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
