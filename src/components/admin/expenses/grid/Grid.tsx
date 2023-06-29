import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { observer } from 'mobx-react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { useExpensesList } from 'common/hooks/expenses'
import { usePersonList } from 'common/hooks/person'
import { routes } from 'common/routes'
import GridActions from 'components/admin/GridActions'

import { ModalStore } from '../ExpensesPage'
import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import { moneyPublic } from 'common/util/money'

const PREFIX = 'Grid'

const classes = {
  grid: `${PREFIX}-grid`,
  gridColumn: `${PREFIX}-gridColumn`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.grid}`]: {
    marginBottom: 15,
    border: 'none',
    '& .MuiDataGrid-virtualScroller': {
      overflow: 'hidden',
    },
    '& .MuiDataGrid-footerContainer': {
      marginTop: '30px',
      marginRight: '40px',
    },
    fontSize: '12px',
  },
  [`& .${classes.gridColumn}`]: {
    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: '14px',
      fontWeight: '700',
    },
  },
})

export default observer(function Grid() {
  const { t } = useTranslation('')
  const { data } = useExpensesList()

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const { data: personList } = usePersonList()

  const { isDetailsOpen } = ModalStore

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'type',
      headerName: t('expenses:fields.type'),
      headerClassName: classes.gridColumn,
      width: 120,
    },
    {
      field: 'amount',
      headerName: t('expenses:fields.amount'),
      headerClassName: classes.gridColumn,
      align: 'right',
      width: 90,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        if (!params.row.amount) {
          return '0'
        }

        return moneyPublic(params.row.amount, params.row.currency)
      },
    },
    {
      field: 'currency',
      headerName: t('common:fields.currency'),
      headerClassName: classes.gridColumn,
      width: 90,
    },
    {
      field: 'description',
      headerName: t('expenses:fields.description'),
      headerClassName: classes.gridColumn,
      flex: 3,
    },
    {
      field: 'approvedById',
      headerName: t('expenses:fields.approvedBy'),
      headerClassName: classes.gridColumn,
      valueGetter: (p) => {
        if (personList && p.value) {
          const found = personList.find((person) => person.id == p.value)
          return `${found?.firstName} ${found?.lastName}`
        }
        return ''
      },
      flex: 1,
    },
    {
      field: 'deleted',
      headerName: t('expenses:fields.deleted'),
      headerClassName: classes.gridColumn,
      width: 90,
    },
    {
      field: 'actions',
      headerName: t('expenses:fields.action'),
      headerAlign: 'left',
      width: 120,
      type: 'actions',
      headerClassName: classes.gridColumn,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.id}
            editLink={routes.admin.expenses.view(params.row.id)}
          />
        )
      },
    },
  ]

  return (
    <Root>
      <DataGrid
        className={classes.grid}
        rows={data || []}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10]}
        pagination
        autoHeight
        checkboxSelection
        disableRowSelectionOnClick
      />
      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </Root>
  )
})
