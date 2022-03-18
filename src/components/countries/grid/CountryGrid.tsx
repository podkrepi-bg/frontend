import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DataGrid, GridColumns, GridSelectionModel } from '@mui/x-data-grid'

import { routes } from 'common/routes'
import { useCountriesList } from 'common/hooks/countries'
import { ModalStore } from 'stores/dashboard/ModalStore'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import GridActions from 'components/admin/GridActions'

const useStyles = makeStyles({
  gridWrapper: {
    margin: '0 auto',
  },
  grid: {
    marginBottom: 15,
    border: 'none',
    '& .MuiDataGrid-virtualScroller': {
      overflow: 'hidden',
    },
    '& .MuiDataGrid-footerContainer': {
      marginTop: '30px',
      marginRight: '40px',
    },
    fontFamily: 'Lato',
    fontSize: '12px',
  },
  gridColumn: {
    '& .MuiDataGrid-columnHeaderTitle': {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: '700',
    },
  },
  gridBtn: {
    background: '#FFFFFF',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
    borderRadius: '50%',
    marginRight: '8px',
    padding: '4px',
  },
  gridAddBtn: {
    background: '#4AC3FF',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
    borderRadius: '50%',
    padding: '8px',
  },
  gridTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 10px 5px 23px',
    height: '80px',
  },
  gridDescription: {
    fontFamily: 'Lato',
    fontSize: '12px',
    color: '#666',
    alignSelf: 'flex-start',
  },
  gridMainActionsBtns: {
    alignSelf: 'flex-end',
  },
})

export default observer(function Grid() {
  const classes = useStyles()
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation('countries')
  const { setSelectedIdsToDelete } = ModalStore

  setSelectedIdsToDelete([])

  const { data } = useCountriesList()

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'name',
      headerName: t('fields.name'),
      valueGetter: (p) => p.row.name,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'countryCode',
      headerName: t('fields.country-code'),
      valueGetter: (p) => p.row.countryCode,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: t('fields.action'),
      headerAlign: 'left',
      renderCell: (p) => (
        <GridActions
          id={p.row.id}
          name={p.row.name}
          editLink={routes.admin.countries.view(p.row.id)}
        />
      ),
      width: 120,
      type: 'actions',
      headerClassName: classes.gridColumn,
    },
  ]

  return (
    <>
      <Box sx={{ marginTop: '2%', mx: 'auto', width: 700 }}>
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
          rowsPerPageOptions={[5, 10]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          disableSelectionOnClick
          checkboxSelection
          onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
            setSelectedIdsToDelete(newSelectionModel.map((item) => item.toString()))
          }}
        />
      </Box>
      <DetailsModal />
      <DeleteModal />
      <DeleteAllModal />
    </>
  )
})
