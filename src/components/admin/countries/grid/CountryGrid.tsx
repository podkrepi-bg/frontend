import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import { useCountriesList } from 'common/hooks/countries'
import theme from 'common/theme'
import GridActions from 'components/admin/GridActions'

import { ModalStore } from '../CountriesPage'
import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'

const PREFIX = 'CountryGrid'

const classes = {
  gridColumn: `${PREFIX}-gridColumn`,
}

const Root = styled('div')({
  [`& .${classes.gridColumn}`]: {
    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: theme.typography.pxToRem(14),
      fontWeight: '700',
    },
  },
})

export default observer(function Grid() {
  const { t } = useTranslation('countries')
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  const { data } = useCountriesList()
  const { isDetailsOpen } = ModalStore

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'actions',
      headerName: t('fields.action'),
      headerAlign: 'left',
      renderCell: (p) => (
        <GridActions
          modalStore={ModalStore}
          id={p.row.id}
          name={p.row.name}
          editLink={routes.admin.countries.view(p.row.id)}
        />
      ),
      width: 120,
      type: 'actions',
      headerClassName: classes.gridColumn,
    },
    {
      field: 'name',
      headerName: t('fields.name'),
      valueGetter: (p) => p.row.name,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'countryCode',
      headerName: t('fields.country-code'),
      valueGetter: (p) => p.row.countryCode,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
  ]

  return (
    <Root>
      <Box sx={{ marginTop: '2%', mx: 'auto', width: 700 }}>
        <DataGrid
          sx={{
            background: theme.palette.common.white,
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
          columnVisibilityModel={{
            id: false,
          }}
          pageSizeOptions={[5, 10]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
        />
      </Box>
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </Root>
  )
})
