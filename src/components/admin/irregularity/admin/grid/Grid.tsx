import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'

import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useIrregularityList } from 'common/hooks/irregularity'

import { routes } from 'common/routes'
import GridActions from 'components/admin/GridActions'

import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import { ModalStore } from '../IrregularityPage'
import { IrregularityResponse } from 'components/client/irregularity/helpers/irregularity.types'

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  background: theme.palette.common.white,
  position: 'absolute',
  height: 'calc(100vh - 300px) !important',
  border: 'none',
  width: 'calc(100% - 48px)',
  left: '24px',
  overflowY: 'auto',
  overflowX: 'hidden',
  borderRadius: '0 0 13px 13px',
}))

export default observer(function Grid() {
  const { t } = useTranslation('irregularity')

  const { data }: UseQueryResult<IrregularityResponse[]> = useIrregularityList()

  const { isDetailsOpen } = ModalStore

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: t('admin.fields.actions'),
      width: 120,
      align: 'center',
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.id}
            editLink={routes.admin.irregularity.view(params.row.id)}
          />
        )
      },
    },
    {
      field: 'status',
      headerName: t('admin.fields.status'),
      editable: false,
      width: 150,
      valueGetter: (f) => {
        return t('admin.fields.status-type.' + f.row.status)
      },
    },
    {
      field: 'createdAt',
      headerName: t('admin.fields.createdAt'),
      editable: false,
      width: 150,
      valueGetter: (f) => f.row.createdAt?.toString().slice(0, 10),
    },
    {
      field: 'campaign',
      headerName: t('admin.fields.campaign'),
      editable: false,
      width: 300,
      valueGetter: (f) => f.row.campaign.title,
    },
    {
      field: 'reason',
      headerName: t('admin.fields.reason'),
      editable: false,
      width: 200,
      valueGetter: (f) => {
        return t('reason.' + f.row.reason)
      },
    },
    {
      field: 'description',
      headerName: t('admin.fields.description'),
      editable: false,
      width: 300,
    },
    {
      field: 'person',
      headerName: t('admin.fields.person'),
      editable: false,
      width: 300,
      valueGetter: (f) => `${f.row.person.firstName} ${f.row.person.lastName}`,
    },
    {
      field: 'notifierType',
      headerName: t('admin.fields.type'),
      editable: false,
      width: 150,
      valueGetter: (f) => {
        return t('admin.fields.notifier-type.' + f.row.notifierType)
      },
    },
    {
      field: 'email',
      headerName: t('admin.fields.email'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.person.email,
    },
    {
      field: 'phone',
      headerName: t('admin.fields.phone'),
      editable: false,
      width: 150,
      valueGetter: (f) => f.row.person.phone,
    },
  ]

  return (
    <>
      <Box>
        <StyledDataGrid
          rows={data || []}
          columns={columns}
          columnVisibilityModel={{
            id: false,
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          autoHeight
          disableRowSelectionOnClick
        />
      </Box>

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
