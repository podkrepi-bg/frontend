import React, { useState } from 'react'
import router from 'next/router'
import { useTranslation } from 'next-i18next'

import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useCitiesList } from 'common/hooks/cities'
import EditIcon from '@mui/icons-material/Edit'
import { Box, ButtonGroup, Toolbar, Tooltip, Typography } from '@mui/material'

import { AlertStore } from 'stores/AlertStore'
import { deleteCity } from 'service/city'
import { useMutation } from 'react-query'
import DeleteModal from './modals/DeleteModal'
import CityModal from './modals/CityModal'
import DeleteSelectedModal from './modals/DeleteSelectedModal'
import { CityResponse } from 'gql/cities'
import { routes } from 'common/routes'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import PrintIcon from '@mui/icons-material/Print'
import SaveIcon from '@mui/icons-material/Save'
import ShareIcon from '@mui/icons-material/Share'
import EventNoteIcon from '@mui/icons-material/EventNote'
import Link from 'next/link'

export default function CitiesGrid() {
  const { data = [] } = useCitiesList()
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState({})
  const [deleteData, setDeleteData] = useState({})
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = React.useState(false)
  const [selectedRows, setSelectedRows] = React.useState<CityResponse[]>([])

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
      valueGetter: (c) => {
        return c.row.countryCode.countryCode
      },
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
            <ShareIcon onClick={() => handleDetails(cellValues)} />
            <EditIcon onClick={() => handleEdit(cellValues)} />
            <DeleteIcon onClick={() => handleDelete(cellValues)} />
          </ButtonGroup>
        )
      },
    },
  ]

  const handleEdit = (cellValues: any) => {
    router.push(`cities/edit/${cellValues.id}`)
  }

  const { t } = useTranslation()
  const mutation = useMutation({
    mutationFn: deleteCity,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('Избраните градове бяха преместени в кошчето.'), 'warning'),
  })

  const handleDelete = async (cellValues: any) => {
    const title = `Наистина ли искате да изтриете ${cellValues.row.name} ${cellValues.row.postalCode}?`
    const id = cellValues.row.id
    const dataForProps: any = { title, id }
    setDeleteOpen(true)
    setDeleteData(dataForProps)
  }

  const handleDeleteAll = () => {
    try {
      selectedRows.forEach((row: any) => {
        mutation.mutateAsync({ id: row.id }).then(() => {
          router.push(routes.admin.cities.home)
          setIsDeleteSelectedModalOpen(false)
        })
      })
    } catch (error) {
      AlertStore.show(t('common:alert.error'), 'error')
    }
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
    console.log(cellValues.row)
  }

  const CityProps = {
    data,
    open,
    setOpen,
    ...details,
  }

  const addIconStyles = {
    background: '#4ac3ff',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: 1.2,
    boxShadow: 3,
  }
  const iconStyles = {
    background: 'white',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: 0.5,
    boxShadow: 3,
    mr: 1,
  }

  return (
    <>
      <Toolbar
        sx={{
          background: 'white',
          borderTop: '1px solid lightgrey',
          display: 'flex',
          justifyContent: 'space-between',
          height: '72px',
        }}>
        <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
          <Typography>Всички градове</Typography>
        </Box>
        <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Събитие">
              <EventNoteIcon sx={iconStyles} fontSize="medium" color="action" />
            </Tooltip>
            <Tooltip title="Изтрий избраните">
              <DeleteIcon
                onClick={() => setIsDeleteSelectedModalOpen(true)}
                sx={iconStyles}
                fontSize="medium"
                color="action"></DeleteIcon>
            </Tooltip>
            <Tooltip title="Запази">
              <SaveIcon sx={iconStyles} fontSize="medium" color="action" />
            </Tooltip>
            <Tooltip title="Притирай">
              <PrintIcon sx={iconStyles} fontSize="medium" color="action" />
            </Tooltip>
            <Tooltip title="Сподели">
              <ShareIcon sx={iconStyles} fontSize="medium" color="action" />
            </Tooltip>
            <Link href="/admin/cities/create" passHref>
              <AddIcon sx={addIconStyles} fontSize="large" />
            </Link>
          </Box>
        </Box>
      </Toolbar>
      <DataGrid
        style={{
          background: 'white',
          position: 'absolute',
          height: 'calc(100vh - 300px)',
          border: 'none',
          width: 'calc(100% - 48px)',
          left: '24px',
          overflowY: 'auto',
          overflowX: 'hidden',
          borderRadius: '0 0 13px 13px',
        }}
        rows={data || []}
        columns={columns}
        pageSize={5}
        editMode="row"
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
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
    </>
  )
}
