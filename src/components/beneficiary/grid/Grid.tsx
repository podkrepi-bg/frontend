import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import { BeneficiaryListResponse } from 'gql/beneficiary'
import GridActions from 'components/admin/GridActions'
import { useBeneficiariesList } from 'service/beneficiary'

import { ModalStore } from '../BeneficiaryPage'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import { BeneficiaryType } from '../BeneficiaryTypes'

interface BeneficiaryCellProps {
  params: GridRenderCellParams<BeneficiaryListResponse, BeneficiaryListResponse>
}

const DisplayCompany = ({ params }: BeneficiaryCellProps) => {
  const { t } = useTranslation()
  const { company } = params.row
  return <>{company?.companyName || t('beneficiary:grid:not-company')}</>
}

const DisplayPerson = ({ params }: BeneficiaryCellProps) => {
  const { t } = useTranslation()
  const { person } = params.row
  return (
    <>
      {person?.firstName
        ? `${person?.firstName} ${person?.lastName}`
        : t('beneficiary:grid:not-person')}
    </>
  )
}

const DisplayBeneficiaryType = ({ params }: BeneficiaryCellProps) => {
  const { t } = useTranslation()
  return (
    <>
      {params.row.type === BeneficiaryType.company
        ? t('beneficiary:grid:company')
        : t('beneficiary:grid:individual')}
    </>
  )
}

export default observer(function Grid() {
  const [pageSize, setPageSize] = useState(5)
  const { selectedRecord } = ModalStore
  const { t } = useTranslation()

  const { data }: UseQueryResult<BeneficiaryListResponse[]> = useBeneficiariesList()

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 250,
    headerAlign: 'left',
  }
  const columns: GridColumns = [
    {
      field: 'actions',
      headerName: t('beneficiary:actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      sortable: false,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.ibanNumber}
            editLink={routes.admin.beneficiary.edit(params.row.id)}
          />
        )
      },
    },
    {
      field: 'is-person',
      headerName: t('beneficiary:grid:type'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <DisplayBeneficiaryType params={params} />
      },
    },
    {
      field: 'person',
      headerName: t('beneficiary:grid:individual'),
      flex: 1,
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <DisplayPerson params={params} />
      },
    },
    {
      field: 'company',
      headerName: t('beneficiary:grid:company'),
      flex: 1,
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <DisplayCompany params={params} />
      },
    },
    {
      field: 'description',
      headerName: t('beneficiary:grid:description'),
      flex: 1,
      ...commonProps,
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
        />
      </Box>
      {selectedRecord.id && <DetailsModal />}
      {selectedRecord.id && <DeleteModal />}
    </>
  )
})
