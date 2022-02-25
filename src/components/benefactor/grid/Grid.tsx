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

import { BenefactorResponse } from 'gql/benefactor'
import { useBenefactorList } from 'common/hooks/benefactor'
import { ModalStore } from 'stores/ModalStore'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import GridActions from './GridActions'

export default observer(function Grid() {
  const [selectedId, setSelectedId] = useState<string>('')
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation('benefactor')
  const { selectedPositive, selectedNegative } = ModalStore

  const { data }: UseQueryResult<BenefactorResponse[]> = useBenefactorList()

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 100,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'extCustomerId',
      headerName: t('extCustomerId'),
      valueGetter: (p) => p.row.extCustomerId,
      ...commonProps,
      //   width: 400,
      flex: 1,
    },
    {
      field: 'personId',
      headerName: t('personId'),
      valueGetter: (p) => p.row.personId,
      ...commonProps,
      //   width: 400,
      flex: 1,
    },
    {
      field: t('actions'),
      align: 'right',
      width: 120,
      renderCell: (cellValues: GridRenderCellParams) => {
        return <GridActions id={cellValues.row.id} setSelectedId={setSelectedId} />
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
      <DetailsModal id={selectedId} />
      <DeleteModal id={selectedId} />
      <DeleteAllModal selectionModel={selectionModel} />
    </>
  )
})
