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

import { BeneficiaryType } from '../../../gql/beneficiary'
import { useBeneficiariesList } from 'service/beneficiary'
import { useViewPerson } from 'service/person'
import { useViewCompany } from 'service/company'
import { ModalStore } from 'stores/beneficiaries/ModalStore'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import GridActions from './GridActions'

interface PersonCellProps {
  params: GridRenderCellParams
}

export default observer(function Grid() {
  const [selectedId, setSelectedId] = useState<string>('')
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()
  const { selectedPositive, selectedNegative } = ModalStore

  const { data }: UseQueryResult<BeneficiaryType[]> = useBeneficiariesList()

  const RenderCompanyCell = ({ params }: PersonCellProps) => {
    const company = useViewCompany(params.row.companyId)
    return <>{company.data?.companyName || t('beneficiary:grid:not-company')}</>
  }

  const RenderPersonCell = ({ params }: PersonCellProps) => {
    const person = useViewPerson(params.row.personId)
    return (
      <>
        {person.data?.firstName + ' ' + person.data?.lastName || t('beneficiary:grid:not-person')}
      </>
    )
  }

  const renderBeneficiaryTypeCell = (params: GridRenderCellParams) => {
    if (params.row.type == 'company') return t('beneficiary:grid:company')
    return t('beneficiary:grid:individual')
  }

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 250,
    headerAlign: 'left',
  }
  const columns: GridColumns = [
    {
      field: 'is-person',
      headerName: t('beneficiary:grid:type'),
      ...commonProps,
      renderCell: renderBeneficiaryTypeCell,
    },
    {
      field: 'person',
      headerName: t('beneficiary:grid:individual'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderPersonCell params={params}></RenderPersonCell>
      },
    },
    {
      field: 'company',
      headerName: t('beneficiary:grid:company'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderCompanyCell params={params}></RenderCompanyCell>
      },
    },
    {
      field: t('beneficiary:actions'),
      width: 200,
      sortable: false,
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
