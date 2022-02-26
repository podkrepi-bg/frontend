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
import { Check, Clear } from '@mui/icons-material'

import { BeneficiaryType } from '../../../gql/beneficiary'
import { useBeneficiariesList } from 'service/beneficiary'
import { ModalStore } from 'stores/beneficiaries/ModalStore'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import GridActions from './GridActions'

export default observer(function Grid() {
  const [selectedId, setSelectedId] = useState<string>('')
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()
  const { selectedPositive, selectedNegative } = ModalStore

  const { data }: UseQueryResult<BeneficiaryType[]> = useBeneficiariesList()

  const renderIsPersonCell = (params: GridRenderCellParams) => {
    if (params.row.type == 'individual') return <Check color="primary" />
    return <Clear color="action" />
  }

  const renderIsCompanyCell = (params: GridRenderCellParams) => {
    if (params.row.type == 'company') return <Check color="primary" />
    return <Clear color="action" />
  }

  const renderCompanyIdCell = (params: GridRenderCellParams) => {
    return params.row.companyId || t('beneficiary:grid:not-company')
  }

  const renderPersonIdCell = (params: GridRenderCellParams) => {
    return params.row.personId || t('beneficiary:grid:not-person')
  }

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 250,
    headerAlign: 'left',
  }
  const columns: GridColumns = [
    {
      field: 'is-person',
      headerName: t('beneficiary:grid:person'),
      ...commonProps,
      renderCell: renderIsPersonCell,
    },
    {
      field: 'is-company',
      headerName: t('beneficiary:grid:company'),
      ...commonProps,
      renderCell: renderIsCompanyCell,
    },
    {
      field: 'person',
      headerName: t('beneficiary:grid:personId'),
      ...commonProps,
      renderCell: renderPersonIdCell,
    },
    {
      field: 'company',
      headerName: t('beneficiary:grid:companyId'),
      ...commonProps,
      renderCell: renderCompanyIdCell,
    },
    {
      field: t('documents:actions'),
      width: 200,
      align: 'right',
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
