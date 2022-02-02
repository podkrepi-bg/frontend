/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { DataGrid, GridColumns, GridRowId } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import { useBootcampsList } from 'common/hooks/bootcamps'
import router from 'next/router'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import { AlertStore } from 'stores/AlertStore'
import { deleteBootcamp } from 'common/rest'
import { useMutation } from 'react-query'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import { Box, Button, ButtonGroup, Container, Stack, Typography } from '@mui/material'
import DeleteModal from './layout/DeleteModal'
import BootcampModal from './layout/BootcampModal'
import Layout from './layout/Layout'
import { pink } from '@mui/material/colors'
import { green } from '@mui/material/colors'
import Link from 'next/link'
import DeleteSelectedModal from './layout/DeleteSelectedModal'
import { BootcampResponse } from 'gql/bootcamps'
import { routes } from 'common/routes'

export default function BootcampsGrid() {
  const { data = [] } = useBootcampsList()
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(null || {})
  const [deleteData, setDeleteData] = useState(null || {})
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = React.useState(false)
  const [selectedRows, setSelectedRows] = React.useState<BootcampResponse[]>([])
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([])

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'firstName',
      headerName: 'First Name',
      editable: false,
      width: 200,
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      editable: false,
      width: 200,
      flex: 2,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      align: 'center',
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

  const { t } = useTranslation()
  const mutation = useMutation({
    mutationFn: deleteBootcamp,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const handleDelete = async (cellValues: any) => {
    const title = `Are you sure you want to delete ${cellValues.row.firstName} ${cellValues.row.lastName} ?`
    const id = cellValues.row.id
    const dataForProps: any = { title, id }
    setDeleteOpen(true)
    setDeleteData(dataForProps)
  }

  const handleDeleteAll = () => {
    selectedRows.forEach((row: any) => {
      mutation.mutateAsync({ id: row.id }).then(() => {
        router.push(routes.bootcamps.home)
        setIsDeleteSelectedModalOpen(false)
      })
    })
  }

  const closeDeleteSelectedHandler = () => {
    setIsDeleteSelectedModalOpen(false)
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
          <Button variant="contained" color="info">
            <Link href="/bootcamps/create">Create new bootcamp</Link>
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={selectionModel.length == 0}
            onClick={() => setIsDeleteSelectedModalOpen(true)}>
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
          onSelectionModelChange={(ids) => {
            setSelectionModel(ids)
            const selectedIDs = new Set(ids)
            const selectedRows = data.filter((row) => selectedIDs.has(row.id))
            setSelectedRows(selectedRows)
          }}
        />
        <Box>
          <BootcampModal modalProps={bootcampProps} />
          <DeleteModal modalProps={deleteProps}></DeleteModal>
          <DeleteSelectedModal
            isOpen={isDeleteSelectedModalOpen}
            handleDelete={handleDeleteAll}
            handleDeleteModalClose={closeDeleteSelectedHandler}></DeleteSelectedModal>
        </Box>
      </Container>
    </>
  )
}
