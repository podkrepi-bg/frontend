/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import router from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { DataGrid, GridColumns, GridRowId } from '@mui/x-data-grid'
import { useCitiesList } from 'common/hooks/cities'
import { pink } from '@mui/material/colors'
import { green } from '@mui/material/colors'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, ButtonGroup, Container, Stack, styled, Typography } from '@mui/material'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'

import { AlertStore } from 'stores/AlertStore'
import { deleteCity } from 'common/rest'
import { useMutation } from 'react-query'
import DeleteModal from './layout/DeleteModal'
import CityModal from './layout/CityModal'
import Layout from './layout/Layout'
import DeleteSelectedModal from './layout/DeleteSelectedModal'
import { CityResponse } from 'gql/cities'
import { routes } from 'common/routes'

export default function CitiesGrid() {
  const { data = [] } = useCitiesList()
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState({})
  const [deleteData, setDeleteData] = useState({})
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = React.useState(false)
  const [selectedRows, setSelectedRows] = React.useState<CityResponse[]>([])
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([])

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'name',
      headerName: 'City Name',
      editable: false,
      width: 200,
      flex: 1,
    },
    {
      field: 'postalCode',
      headerName: 'Postal Code',
      editable: false,
      width: 200,
      flex: 1,
    },
    {
      field: 'countryCode',
      headerName: 'Country Code',
      editable: false,
      width: 200,
      flex: 1.5,
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

  const StyledLink = styled(Link)`
    color: white;
    background: blue;
  `

  const handleEdit = (cellValues: any) => {
    router.push(`/cities/edit/${cellValues.id}`)
  }

  const { t } = useTranslation()
  const mutation = useMutation({
    mutationFn: deleteCity,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const handleDelete = async (cellValues: any) => {
    const title = `Are you sure you want to delete ${cellValues.row.name} ${cellValues.row.postalCode} ?`
    const id = cellValues.row.id
    const dataForProps: any = { title, id }
    setDeleteOpen(true)
    setDeleteData(dataForProps)
  }

  const handleDeleteAll = () => {
    selectedRows.forEach((row: any) => {
      mutation.mutateAsync({ id: row.id }).then(() => {
        router.push(routes.cities.home)
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

  const CityProps = {
    data,
    open,
    setOpen,
    ...details,
  }

  return (
    <>
      <Layout />
      <Container maxWidth="lg">
        <Typography variant="h2" align="center">
          Градове
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'space-between', marginBottom: '15px' }}>
          <Button variant="contained" color="info">
            <StyledLink href="/cities/create">Добави нов град</StyledLink>
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={selectionModel.length == 0}
            onClick={() => setIsDeleteSelectedModalOpen(true)}>
            Изтрии избраните
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
          <CityModal modalProps={CityProps} />
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
