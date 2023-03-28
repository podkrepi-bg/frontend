import React from 'react'
import { styled } from '@mui/material/styles'
import { observer } from 'mobx-react'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { usePersonList } from 'common/hooks/person'

import { routes } from 'common/routes'
import GridActions from 'components/admin/GridActions'

import DeleteModal from './DeleteModal'
//import { statusRenderCell } from './GridHelper'
import { useCampaignExpensesList } from 'common/hooks/expenses'
import { moneyPublic } from 'common/util/money'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

const PREFIX = 'Grid'

type Props = { slug: string }

const classes = {
  grid: `${PREFIX}-grid`,
  gridColumn: `${PREFIX}-gridColumn`,
}

export const ModalStore = new ModalStoreImpl()

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

export default observer(function CampaignExpensesGrid({ slug }: Props) {
  const { t } = useTranslation('')
  const { data: expensesList } = useCampaignExpensesList(slug)

  const [pageSize, setPageSize] = React.useState<number>(10)
  const { data: personList } = usePersonList()

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'type',
      headerName: t('expenses:fields.type'),
      headerClassName: classes.gridColumn,
      width: 120,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return t('expenses:field-types.' + params.row.type)
      },
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
      field: 'description',
      headerName: t('expenses:fields.description'),
      headerClassName: classes.gridColumn,
      flex: 1,
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
        if (!personList && p.value) {
          return 'Administrator'
        }
        return ''
      },
      flex: 1,
    },
    {
      field: 'spentAt',
      headerName: t('expenses:fields.date'),
      headerClassName: classes.gridColumn,
      flex: 1,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        if (!params.row.spentAt) {
          return ''
        }

        return params.row.spentAt.split('T')[0]
      },
    },
    {
      field: 'no_of_files',
      headerName: t('expenses:fields.files'),
      headerClassName: classes.gridColumn,
      width: 100,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        if (!params.row.expenseFiles || !params.row.expenseFiles.length) {
          return ''
        }

        return params.row.expenseFiles.length
      },
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
            name={params.row.description}
            editLink={routes.campaigns.expenses.edit(slug, params.row.id)}
            disableView={true}
          />
        )
      },
    },
  ]

  return (
    <Root>
      <DataGrid
        className={classes.grid}
        rows={expensesList || []}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[100]}
        pagination
        autoHeight
        disableSelectionOnClick
      />
      <DeleteModal />
    </Root>
  )
})
