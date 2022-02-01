/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { useBootcampsList } from 'common/hooks/bootcamps'
import router from 'next/router'
import { routes } from 'common/routes'
import InfoIcon from '@mui/icons-material/Info'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import { AlertStore } from 'stores/AlertStore'
import { deleteBootcamp, editBootcamp } from 'common/rest'
import { useMutation } from 'react-query'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import Drawer from './layout/Layout'
import { endpoints } from 'common/api-endpoints'
import { BootcampFormData, BootcampResponse } from 'gql/bootcamps'
import { FormikHelpers } from 'formik/dist/types'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { Box, Button, ButtonGroup, Container, Grid, Stack, Typography } from '@mui/material'
import DeleteModal from './layout/DeleteModal'
import BootcampModal from './layout/BootcampModal'
import Layout from './layout/Layout'
import Footer from './layout/Footer'
import { pink } from '@mui/material/colors'
import { green } from '@mui/material/colors'


export default function BootcampsGrid() {
  const { data } = useBootcampsList()
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(null || {})
  const [deleteData, setDeleteData] = useState(null || {})
  const [deleteOpen, setDeleteOpen] = useState(false)

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'firstName',
      headerName: 'First Name',
      editable: false,
      width: 200,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      editable: false,
      width: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      marginLeft: 200,
      renderCell: (cellValues) => {
        return (
          <ButtonGroup>
            <InfoIcon onClick={() => handleDetails(cellValues)} />
            <EditIcon sx={{ color: green[500] }} onClick={() => handleEdit(cellValues)} />
            <HighlightOffSharpIcon
              sx={{ color: pink[500] }}
              onClick={() => handleDelete(cellValues)}
            />
          </ButtonGroup>
        )
      },
    },
  ]

  const handleEdit = (cellValues: any) => {
    router.push(`/bootcamps/edit/${cellValues.id}`)
  }

  const handleDelete = async (cellValues: any) => {
    const title = `Are you sure you want to delete ${cellValues.row.firstName} ${cellValues.row.lastName} ?`
    const id = cellValues.row.id
    const dataForProps: any = { title, id }
    setDeleteOpen(true)
    setDeleteData(dataForProps)
  }

  const deleteProps = {
    deleteOpen,
    setDeleteOpen,
    deleteData,
  }

  function handleDetails(cellValues: any) {
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
      <Layout></Layout>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center">
          Softuni Bootcamps
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'space-between', marginBottom: '15px' }}>
          <Button variant="contained" color="success">
            Create new bootcamp
          </Button>
          <Button variant="outlined" color="error">
            Delete Selected
          </Button>
        </Stack>
        <DataGrid
          rows={data || []}
          columns={columns}
          pageSize={5}
          editMode="row"
          autoHeight
          autoPageSize
          checkboxSelection
          disableSelectionOnClick
        />
        <Box>
          <BootcampModal modalProps={bootcampProps} />
          <DeleteModal modalProps={deleteProps}></DeleteModal>
        </Box>
      </Container>
    </>
  )
}
