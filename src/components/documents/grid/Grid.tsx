import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import { DocumentResponse } from 'gql/document'
import GridActions from 'components/admin/GridActions'
import { useDocumentsList } from 'common/hooks/documents'

import { ModalStore } from '../DocumentsPage'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'

export default observer(function Grid() {
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()
  const { data }: UseQueryResult<DocumentResponse[]> = useDocumentsList()
  const { isDetailsOpen } = ModalStore

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 150,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'type',
      headerName: t('documents:type'),
      ...commonProps,
    },
    {
      field: 'name',
      headerName: t('documents:name'),
      ...commonProps,
    },
    {
      field: 'filename',
      headerName: t('documents:filename'),
      ...commonProps,
    },
    {
      field: 'filetype',
      headerName: t('documents:filetype'),
      ...commonProps,
    },
    {
      field: 'description',
      headerName: t('documents:description'),
      ...commonProps,
    },
    {
      field: 'sourceUrl',
      headerName: t('documents:sourceUrl'),
      ...commonProps,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: t('documents:actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={cellValues.row.id}
            name={cellValues.row.name}
            editLink={routes.admin.documents.edit(cellValues.row.id)}
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
          autoHeight
          autoPageSize
          disableSelectionOnClick
        />
      </Box>

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
