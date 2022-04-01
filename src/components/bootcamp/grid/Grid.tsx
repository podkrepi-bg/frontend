import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { Box } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
  GridSelectionModel,
} from '@mui/x-data-grid'

import { ModalStore } from 'stores/dashboard/ModalStore'
import { routes } from 'common/routes'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import GridActions from 'components/admin/GridActions'
import { BootcampTypeFormData } from 'gql/bootcamp'
interface PersonCellProps {
  params: GridRenderCellParams
}

export default observer(function Grid() {
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()
  const { setSelectedIdsToDelete } = ModalStore

  setSelectedIdsToDelete([])

  const data: BootcampTypeFormData[] = [
    {
      id: '1',
      firstName: 'Петър',
      lastName: 'Петров',
      city: 'София',
    },
    {
      id: '2',
      firstName: 'Стоян',
      lastName: 'Димитров',
      city: 'Варна',
    },
  ]

  const RenderCity = ({ params }: PersonCellProps) => {
    return <>{params?.row.city}</>
  }

  const RenderLastName = ({ params }: PersonCellProps) => {
    return <>{params.row.lastName}</>
  }

  const RenderFirstName = (params: GridRenderCellParams) => {
    return <>{params.row.firstName}</>
  }

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 250,
    headerAlign: 'left',
  }
  const columns: GridColumns = [
    {
      field: 'firstName',
      headerName: t('bootcamp:grid:first-name'),
      ...commonProps,
      renderCell: RenderFirstName,
    },
    {
      field: 'lastName',
      headerName: t('bootcamp:grid:last-name'),
      flex: 1,
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderLastName params={params}></RenderLastName>
      },
    },
    {
      field: 'city',
      headerName: t('bootcamp:grid:city'),
      flex: 1,
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderCity params={params}></RenderCity>
      },
    },
    {
      field: 'actions',
      headerName: t('bootcamp:actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      sortable: false,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            id={params.row.id}
            name={params.row.ibanNumber}
            editLink={routes.bootcamp.edit}
          />
        )
      },
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
