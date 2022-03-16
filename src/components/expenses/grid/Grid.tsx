import React from 'react'
import Link from 'next/link'
import { DataGrid, GridColumns, GridSelectionModel } from '@mui/x-data-grid'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import { useExpense, useExpensesList } from 'common/hooks/expenses'
import { routes } from 'common/routes'
import { ExpenseResponse } from 'gql/expenses'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { useDeleteExpense, useDeleteManyExpenses } from 'service/expense'

import InfoDialog from './InfoDialog'
import DeleteRowDialog from './DeleteModal'
import DeleteRowsDialog from './DeleteRowsDialog'
import GridActions from './GridActions'

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

export default function Grid() {
  const [openRowDel, setOpenRowDel] = React.useState<boolean>(false)
  const [openRowsDel, setOpenRowsDel] = React.useState<boolean>(false)
  const [openInfo, setOpenInfo] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState({
    id: '',
    name: '',
  })
  const [selectedManyIds, setSelectedManyIds] = React.useState([''])
  const { data: expense } = useExpense(selected.id)
  const [pageSize, setPageSize] = React.useState<number>(10)

  const { data } = useExpensesList()
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('expenses')

  const delMutation = useMutation<AxiosResponse<ExpenseResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteExpense(),
    onError: () => AlertStore.show(t('alerts.delete-row.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('alerts.delete-row.success'), 'success')
    },
  })

  const delManyMutation = useMutation<
    AxiosResponse<ExpenseResponse>,
    AxiosError<ApiErrors>,
    string[]
  >({
    mutationFn: useDeleteManyExpenses(selectedManyIds),
    onError: () => AlertStore.show(t('alerts.delete-rows.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('alerts.delete-rows.success'), 'success')
    },
  })

  const openDeleteRowDialog = (id: string, name: string) => {
    setSelected({ id, name })
    setOpenRowDel(true)
  }

  const closeDeleteRowDialog = () => {
    setOpenRowDel(false)
  }

  const openDeleteRowsDialog = () => {
    if (selectedManyIds.length == 0 || selectedManyIds[0] == '') {
      return
    }
    setOpenRowsDel(true)
  }

  const closeDeleteRowsDialog = () => {
    setOpenRowsDel(false)
  }

  const closeInfoDialog = () => {
    setOpenInfo(false)
  }

  const deleteRow = async () => {
    try {
      closeDeleteRowDialog()
      await delMutation.mutateAsync(selected.id)
      router.push(routes.admin.expenses.index)
    } catch (err) {
      console.log(err)
    }
  }

  const selectMultipleRows = (ids: GridSelectionModel) => {
    const idsToStr = ids.map((id) => id.toString())
    setSelectedManyIds(idsToStr)
  }

  const deleteRows = async () => {
    try {
      closeDeleteRowsDialog()
      delManyMutation.mutate(selectedManyIds)
      router.push(routes.admin.expenses.index)
    } catch (err) {
      console.log(err)
    }
  }

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
      renderCell: (p) => (
        <GridActions
          id={p.row.id}
          name={p.row.id}
          loadInfo={() => {
            setOpenInfo(true)
            setSelected({ id: p.row.id, name: p.row.id })
          }}
          openDialog={openDeleteRowDialog}
        />
      ),
      width: 120,
      type: 'actions',
      headerClassName: classes.gridColumn,
    },
  ]

  return (
    <>
      <InfoDialog open={openInfo} closeFn={closeInfoDialog} expense={expense} />
      <DeleteRowDialog
        open={openRowDel}
        closeFn={closeDeleteRowDialog}
        expenseName={selected.name}
        deleteRow={deleteRow}
      />
      <DeleteRowsDialog
        open={openRowsDel}
        closeFn={closeDeleteRowsDialog}
        deleteRows={deleteRows}
        itemsCount={setSelectedManyIds.length}
      />
      <div className={classes.gridWrapper}>
        <div className={classes.gridTitleWrapper}>
          <Typography variant="body2" className={classes.gridDescription}>
            {t('description')}
          </Typography>
          <section className={classes.gridMainActionsBtns}>
            <Tooltip title={t('tooltips.delete') || ''}>
              <IconButton onClick={openDeleteRowsDialog} className={classes.gridBtn}>
                <DeleteIcon
                  sx={{
                    fontSize: '1.4rem',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Link href={routes.admin.expenses.create} passHref>
              <Tooltip title={t('tooltips.add') || ''}>
                <IconButton className={classes.gridAddBtn}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </section>
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
          onSelectionModelChange={selectMultipleRows}
        />
      </div>
    </>
  )
}
