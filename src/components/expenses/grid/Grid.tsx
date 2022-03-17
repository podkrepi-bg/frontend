import React from 'react'
import { observer } from 'mobx-react'
import { DataGrid, GridColumns, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import { makeStyles } from '@mui/styles'

import { useExpensesList } from 'common/hooks/expenses'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { routes } from 'common/routes'
import GridActions from 'components/admin/GridActions'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import { statusRenderCell } from './GridHelper'

const useStyles = makeStyles({
  grid: {
    marginBottom: 15,
    border: 'none',
    '& .MuiDataGrid-virtualScroller': {
      overflow: 'hidden',
    },
    '& .MuiDataGrid-footerContainer': {
      marginTop: '30px',
      marginRight: '40px',
    },
    fontFamily: 'Lato',
    fontSize: '12px',
  },
  gridColumn: {
    '& .MuiDataGrid-columnHeaderTitle': {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: '700',
    },
  },
})

export default observer(function Grid() {
  const { t } = useTranslation('expenses')
  const { data } = useExpensesList()
  const classes = useStyles()
  const [pageSize, setPageSize] = React.useState<number>(10)

  const { setSelectedIdsToDelete } = ModalStore

  setSelectedIdsToDelete([])

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'type',
      headerName: t('fields.type'),
      valueGetter: (p) => p.row.type,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'status',
      headerName: t('fields.status'),
      renderCell: statusRenderCell,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'currency',
      headerName: t('fields.currency'),
      valueGetter: (p) => p.row.currency,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'amount',
      headerName: t('fields.amount'),
      valueGetter: (p) => p.row.amount,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'vaultId',
      headerName: t('fields.vaultId'),
      valueGetter: (p) => p.row.vaultId,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'description',
      headerName: t('fields.description'),
      valueGetter: (p) => p.row.description,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'documentId',
      headerName: t('fields.documentId'),
      valueGetter: (p) => p.row.documentId,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'approvedById',
      headerName: t('fields.approvedById'),
      valueGetter: (p) => p.row.approvedById,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'deleted',
      headerName: t('fields.deleted'),
      valueGetter: (p) => p.row.deleted,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: t('fields.action'),
      headerAlign: 'left',
      width: 120,
      type: 'actions',
      headerClassName: classes.gridColumn,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            id={params.row.id}
            name={params.row.id}
            editLink={routes.admin.expenses.view(params.row.id)}
          />
        )
      },
    },
  ]

  return (
    <>
      <DataGrid
        className={classes.grid}
        rows={data || []}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10]}
        pagination
        autoHeight
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
          setSelectedIdsToDelete(newSelectionModel.map((item) => item.toString()))
        }}
      />

      <DetailsModal />
      <DeleteModal />
      <DeleteAllModal />
    </>
  )
})
