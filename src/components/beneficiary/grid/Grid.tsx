import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { routes } from 'common/routes'
import { useViewPerson } from 'service/person'
import { useViewCompany } from 'service/company'
import { BeneficiaryType } from 'gql/beneficiary'
import GridActions from 'components/admin/GridActions'
import { useBeneficiariesList } from 'service/beneficiary'

import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
interface PersonCellProps {
  params: GridRenderCellParams
}

export default function Grid() {
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()

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
      flex: 1,
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderPersonCell params={params} />
      },
    },
    {
      field: 'company',
      headerName: t('beneficiary:grid:company'),
      flex: 1,
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderCompanyCell params={params} />
      },
    },
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
            id={params.row.id}
            name={params.row.ibanNumber}
            editLink={routes.admin.beneficiary.edit(params.row.id)}
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
        />
      </Box>
      <DetailsModal />
      <DeleteModal />
    </>
  )
}
