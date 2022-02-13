import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DataGrid, GridColumns, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { useCompaniesList } from 'common/hooks/companies'
import { CompanyResponse } from 'gql/companies'

import GridEditButton from './GridEditButton'
import GridDetailsButton from './GridDetailsButton'
import GridDeleteButton from './GridDeleteButton'
import CompaniesGridToolbar from './CompaniesGridToolbar'

const useStyles = makeStyles(() => {
  return {
    grid: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      border: 'none',
    },
    container: {
      padding: '17px',
      backgroundColor: '#E9F6FF',
      borderRadius: '10px',
      height: '100%',
    },
  }
})

export default function CompaniesGrid() {
  const { t } = useTranslation()
  const { data } = useCompaniesList()
  const [companies, setCompanies] = useState<CompanyResponse[]>([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState(5)
  const classes = useStyles()

  useEffect(() => {
    setCompanies(data || [])
  }, [])

  const onPageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }

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
        flex: 1,
      },
      {
        field: 'companyNumber',
        headerName: t('companies:number'),
        flex: 1,
      },
      {
        field: 'legalPersonName',
        headerName: t('companies:representative'),
        flex: 1,
      },
      {
        field: 'countryCode',
        headerName: t('companies:countryCode'),
        flex: 1,
      },
      {
        field: 'Actions',
        headerName: t('companies:actions'),
        renderCell: renderActions,
        width: 130,
      },
    ]
  }, [])

  return (
    <Box className={classes.container}>
      <DataGrid
        className={classes.grid}
        rowsPerPageOptions={[5, 10]}
        rows={companies || []}
        columns={columns}
        onPageSizeChange={onPageSizeChange}
        pageSize={pageSize}
        autoHeight
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: CompaniesGridToolbar,
        }}
        componentsProps={{
          toolbar: {
            selectionModel,
            setCompanies,
          },
          footer: {
            style: {
              minHeight: '88px',
              alignItems: 'flex-end',
            },
          },
        }}
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids)
        }}
      />
    </Box>
  )
}
