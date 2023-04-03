import React from 'react'
import { styled } from '@mui/material/styles'
import { observer } from 'mobx-react'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { useCampaignApprovedExpensesList } from 'common/hooks/expenses'
import { moneyPublic } from 'common/util/money'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'
import { ExpenseFile } from 'gql/expenses'
import { Button, Tooltip } from '@mui/material'
import { downloadCampaignExpenseFile } from 'service/expense'
import { useSession } from 'next-auth/react'
import FilePresentIcon from '@mui/icons-material/FilePresent'

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

export default observer(function CampaignPublicExpensesGrid({ slug }: Props) {
  const { t } = useTranslation('')
  const { data: expensesList } = useCampaignApprovedExpensesList(slug)

  const [pageSize, setPageSize] = React.useState<number>(10)
  const { data: session } = useSession()

  const downloadExpenseFileHandler = async (file: ExpenseFile) => {
    downloadCampaignExpenseFile(file.id, session)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.target = '_blank'
        link.download = file.filename
        link.click()
      })
      .catch((error) => console.error(error))
  }

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
      width: 120,
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
      field: 'files',
      headerName: t('expenses:fields.attached-files'),
      headerClassName: classes.gridColumn,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const rows = params.row.expenseFiles.map((file: ExpenseFile) => {
          return (
            <Tooltip key={file.id} title={file.filename}>
              <Button onClick={() => downloadExpenseFileHandler(file)}>
                <FilePresentIcon />
              </Button>
            </Tooltip>
          )
        })
        return <div>{rows}</div>
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
        rowsPerPageOptions={[10, 20, 30]}
        // pagination
        autoHeight
        disableSelectionOnClick
      />
    </Root>
  )
})
