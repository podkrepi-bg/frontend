import React from 'react'
import { useTranslation } from 'next-i18next'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { useCitiesList } from 'common/hooks/cities'
import { routes } from 'common/routes'
import GridActions from 'components/admin/GridActions'

import { ModalStore } from '../CityPage'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'

export default observer(function CitiesGrid() {
  const { data } = useCitiesList()
  const { t } = useTranslation()
  const { isDetailsOpen } = ModalStore

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
      valueGetter: (c) => c.row.countryCode.countryCode,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: t('cities:actions'),
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
  ]

  return (
    <>
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
        disableSelectionOnClick
      />

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
