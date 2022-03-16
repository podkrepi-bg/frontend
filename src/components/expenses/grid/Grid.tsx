import React from 'react'
import { observer } from 'mobx-react'
import { DataGrid, GridColumns, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { useExpensesList } from 'common/hooks/expenses'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { routes } from 'common/routes'
import GridActions from 'components/admin/GridActions'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'

const useStyles = makeStyles({
  gridWrapper: {
    margin: '0 auto',
  },
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
  gridBtn: {
    background: '#FFFFFF',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
    borderRadius: '50%',
    marginRight: '8px',
    padding: '4px',
  },
  gridAddBtn: {
    background: '#4AC3FF',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
    borderRadius: '50%',
    padding: '8px',
  },
  gridTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 10px 5px 23px',
    height: '80px',
  },
  gridDescription: {
    fontFamily: 'Lato',
    fontSize: '12px',
    color: '#666',
    alignSelf: 'flex-start',
  },
  gridMainActionsBtns: {
    alignSelf: 'flex-end',
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
      valueGetter: (p) => p.row.status,
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
      <div className={classes.gridWrapper}>
        <div className={classes.gridTitleWrapper}>
          <Typography variant="body2" className={classes.gridDescription}>
            {t('description')}
          </Typography>
        </div>

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
      </div>

      <DetailsModal />
      <DeleteModal />
      <DeleteAllModal />
    </>
  )
})
