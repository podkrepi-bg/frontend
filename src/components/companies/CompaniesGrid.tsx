import { useMemo } from 'react'
import { Container } from '@mui/material'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { useCompaniesList } from 'common/hooks/companies'

export default function CompaniesGrid() {
  const { t } = useTranslation()
  const { data } = useCompaniesList()

  const columns: GridColumns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', hide: true },
      {
        field: 'companyName',
        headerName: t('companies:title'),
        width: 180,
        flex: 1,
      },
      {
        field: 'companyNumber',
        headerName: t('companies:number'),
        width: 180,
        flex: 1,
      },
      {
        field: 'legalPersonName',
        headerName: t('companies:representative'),
        width: 180,
        flex: 1,
      },
      {
        field: 'countryCode',
        headerName: t('companies:countryCode'),
        width: 180,
        flex: 1,
      },
      {
        field: 'countryCode',
        headerName: t('companies:countryCode'),
        width: 180,
        flex: 1,
      },
    ]
  }, [])

  return (
    <Container>
      <DataGrid
        rows={data || []}
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
