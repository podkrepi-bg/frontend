import { makeStyles } from '@mui/styles'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useBootcampInternsList } from 'common/hooks/bootcampIntern'
import { ButtonGroup, ListItemIcon, Typography } from '@mui/material'
import { drawerWidth } from './MyDrawer'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import CircleIcon from '@mui/icons-material/Circle'
import PageviewIcon from '@mui/icons-material/Pageview'

import InfoIcon from '@mui/icons-material/Info'
import { useCallback, useState } from 'react'
import BootcampModal from './BootcampModal'
import { Box } from '@mui/material'
import DeleteModal from './DeleteModal'
import React from 'react'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => {
  return {
    internDataGrid: {
      marginLeft: drawerWidth,
    },
    dataGridHeader: {
      marginLeft: drawerWidth,
      marginTop: '40px',
    },
    icons: {
      cursor: 'pointer',
    },
  }
})

const iconsStyle = { cursor: 'pointer' }

export default function BootcampInternGrid(props: any) {
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
      width: 300,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 300,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      renderCell: (cellValues) => {
        return (
          <ButtonGroup>
            <InfoIcon onClick={() => detailsClickHandler(cellValues)} style={iconsStyle} />
            <EditIcon onClick={() => editClickHandler(cellValues)} style={iconsStyle} />
            <DeleteIcon onClick={() => deleteClickHandler(cellValues)} style={iconsStyle} />
          </ButtonGroup>
        )
      },
      width: 300,
      align: 'center',
    },
  ]

  const editClickHandler = (cellValues: any) => {
    router.push(`/bootcamp-interns/${cellValues.id}/edit`)
  }

  const deleteClickHandler = (cellValues: any) => {
    const dialogTitle = `Are you sure you want to delete ${cellValues.row.firstName} ${cellValues.row.lastName} ?`
    const id = cellValues.row.id
    const dataForProps: any = { dialogTitle, id }
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

  return (
    <>
      <Typography variant="h1" align="center" className={classes.dataGridHeader}>
        Softuni Bootcamp Interns
      </Typography>
      <DataGrid
        className={classes.internDataGrid}
        style={{ marginTop: '50px' }}
        rows={data || []}
        columns={columns}
        pageSize={6}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
      />
      <Box>
        <BootcampModal modalProps={bootcampProps} />
        <DeleteModal modalProps={deleteProps}></DeleteModal>
      </Box>
    </>
  )
}
