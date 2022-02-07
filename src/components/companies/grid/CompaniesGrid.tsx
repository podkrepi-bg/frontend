import { useCallback, useEffect, useMemo, useState } from 'react'
import { Container } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { useCompaniesList } from 'common/hooks/companies'
import { CompanyResponse } from 'gql/companies'

import GridEditButton from './GridEditButton'
import GridDetailsButton from './GridDetailsButton'
import GridDeleteButton from './GridDeleteButton'

export default function CompaniesGrid() {
  const { t } = useTranslation()
  const { data } = useCompaniesList()
  const [companies, setCompanies] = useState<CompanyResponse[]>([])

  useEffect(() => {
    setCompanies(data || [])
  }, [])

  const renderActions = useCallback((params: GridRenderCellParams) => {
    const deleteSuccessHandler = () => {
      setCompanies((old) => old?.filter((x) => x.id !== params.row.id))
    }

    return (
      <>
        <GridDetailsButton params={params} />
        <GridEditButton params={params} />
        <GridDeleteButton params={params} deleteSuccessHandler={deleteSuccessHandler} />
      </>
    )
  }, [])

  const columns: GridColumns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', hide: true },
      {
        field: 'companyName',
        headerName: t('companies:title'),
        width: 180,
        flex: 2,
      },
      {
        field: 'companyNumber',
        headerName: t('companies:number'),
        width: 180,
        flex: 2,
      },
      {
        field: 'legalPersonName',
        headerName: t('companies:representative'),
        width: 180,
        flex: 2,
      },
      {
        field: 'countryCode',
        headerName: t('companies:countryCode'),
        width: 180,
        flex: 2,
      },
      {
        field: 'countryCode',
        headerName: t('companies:countryCode'),
        width: 180,
        flex: 2,
      },
      {
        field: 'Actions',
        headerName: t('companies:actions'),
        renderCell: renderActions,
        width: 250,
        flex: 1,
      },
    ]
  }, [])

  return (
    <Container>
      <DataGrid
        rows={companies || []}
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
      />
    </Container>
  )
}
