import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import PrintIcon from '@mui/icons-material/Print'
import SaveIcon from '@mui/icons-material/Save'
import ShareIcon from '@mui/icons-material/Share'
import EventNoteIcon from '@mui/icons-material/EventNote'
import { DataGrid, GridColumns, GridSelectionModel } from '@mui/x-data-grid'
import { Box, Toolbar, Tooltip, Typography } from '@mui/material'

import { useCitiesList } from 'common/hooks/cities'
import { routes } from 'common/routes'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import GridActions from 'components/admin/GridActions'

import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import DeleteAllModal from './DeleteAllModal'

export default observer(function CitiesGrid() {
  const { showDeleteAll, setSelectedIdsToDelete, selectedIdsToDelete } = ModalStore
  const { data = [] } = useCitiesList()
  const { t } = useTranslation()

  setSelectedIdsToDelete([])

  const deleteAllClickHandler = () => {
    selectedIdsToDelete.length > 0
      ? showDeleteAll()
      : AlertStore.show(t('common:alerts.noselected'), 'warning')
  }

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
      headerName: t('cities:actions'),
      width: 120,
      headerAlign: 'left',
      renderCell: (p) => (
        <GridActions
          id={p.row.id}
          name={p.row.name}
          editLink={routes.admin.cities.editCityById(p.row.id)}
        />
      ),
    },
  ]

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
                onClick={deleteAllClickHandler}
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
        onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
          setSelectedIdsToDelete(newSelectionModel.map((item) => item.toString()))
        }}
      />
      <Box>
        <DetailsModal />
        <DeleteModal />
        <DeleteAllModal />
      </Box>
    </>
  )
})
