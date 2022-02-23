import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { Box } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridSelectionModel,
} from '@mui/x-data-grid'

import { DocumentResponse } from 'gql/document'
import { useDocumentsList } from 'common/hooks/documents'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { routes } from 'common/routes'

import GridActions from '../../admin/GridActions'
import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'

export default observer(function Grid() {
  const [selected, setSelected] = useState({
    id: '',
    name: '',
  })
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()
  const { selectedPositive, selectedNegative } = ModalStore

  const { data }: UseQueryResult<DocumentResponse[]> = useDocumentsList()

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
      renderCell: (cellValues: GridRenderCellParams) => {
        return (
          <GridActions
            id={cellValues.row.id}
            name={cellValues.row.name}
            setSelected={setSelected}
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
          checkboxSelection
          onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
            newSelectionModel.length !== 0 ? selectedPositive() : selectedNegative()
            setSelectionModel(newSelectionModel)
          }}
        />
      </Box>
      <DetailsModal id={selected.id} />
      <DeleteModal id={selected.id} name={selected.name} />
      <DeleteAllModal selectionModel={selectionModel} />
    </>
  )
})
