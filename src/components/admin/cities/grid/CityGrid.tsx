import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { useCitiesList } from 'common/hooks/cities'
import { routes } from 'common/routes'
import theme from 'common/theme'
import GridActions from 'components/admin/GridActions'

import { ModalStore } from '../CityPage'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'

export default observer(function CitiesGrid() {
  const { data } = useCitiesList()
  const { t } = useTranslation('cities')
  const { isDetailsOpen } = ModalStore
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'actions',
      type: 'actions',
      headerName: t('actions'),
      width: 120,
      headerAlign: 'left',
      renderCell: (p) => (
        <GridActions
          modalStore={ModalStore}
          id={p.row.id}
          name={p.row.name}
          editLink={routes.admin.cities.editCityById(p.row.id)}
        />
      ),
    },
    {
      field: 'name',
      headerName: t('name'),
      editable: false,
      width: 200,
      flex: 1,
    },
    {
      field: 'postalCode',
      headerName: t('postalCode'),
      editable: false,
      width: 200,
      flex: 1,
    },
    {
      field: 'countryCode',
      headerName: t('countryId'),
      editable: false,
      width: 200,
      flex: 1.5,
      valueGetter: (c) => c.row.countryCode.countryCode,
    },
  ]

  return (
    <>
      <DataGrid
        sx={{
          background: theme.palette.common.white,
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
        columnVisibilityModel={{
          id: false,
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        editMode="row"
        disableRowSelectionOnClick
      />

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
