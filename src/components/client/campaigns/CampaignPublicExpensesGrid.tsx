import React, { memo, useState } from 'react'
import { styled } from '@mui/material/styles'

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'

import { useCampaignApprovedExpensesList } from 'common/hooks/expenses'
import { moneyPublic, toMoney } from 'common/util/money'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'
import { ExpenseFile, ExpenseResponse } from 'gql/expenses'
import { Button, Grid, Tooltip, Typography } from '@mui/material'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import Link from 'next/link'
import { expenseFileUrl } from 'common/util/expenseFileUrls'
import LinkButton from 'components/common/LinkButton'
import EditIcon from '@mui/icons-material/Edit'
import { routes } from 'common/routes'
import { Assessment } from '@mui/icons-material'
import { CampaignResponse } from 'gql/campaigns'

const PREFIX = 'Grid'

type GridProps = { expensesList: ExpenseResponse[] }
type ExpenseSection = { canEditCampaign: boolean; campaign: CampaignResponse }

const classes = {
  grid: `${PREFIX}-grid`,
  gridColumn: `${PREFIX}-gridColumn`,
}

export const ModalStore = new ModalStoreImpl()

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled(Grid)({
  [`& .${classes.grid}`]: {
    fontSize: 14,
    border: 'none',
    '& .MuiDataGrid-footerContainer': {
      marginTop: '30px',
      marginRight: '40px',
    },
  },
  [`& .${classes.gridColumn}`]: {
    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: 14,
      fontWeight: '700',
    },
  },
})

function CampaignPublicExpensesGrid({ expensesList }: GridProps) {
  const { t } = useTranslation('')
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'type',
      headerName: t('expenses:fields.type'),
      headerClassName: classes.gridColumn,
      flex: 1,
      minWidth: 160,
      valueGetter: ({ value }) => value && t('expenses:field-types.' + value),
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return t('expenses:field-types.' + params.row.type)
      },
    },
    {
      field: 'amount',
      headerName: t('expenses:fields.amount'),
      headerClassName: classes.gridColumn,
      align: 'right',
      minWidth: 120,
      valueGetter: ({ value, row }) => value && toMoney(row.amount, 1),
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
      flex: 2,
      minWidth: 250,
    },
    {
      field: 'spentAt',
      type: 'date',
      headerName: t('expenses:fields.date'),
      headerClassName: classes.gridColumn,
      flex: 1,
      minWidth: 80,
      valueGetter: ({ value }) => value && new Date(value),
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        if (!params.row.spentAt) {
          return ''
        }

        return new Date(params.row.spentAt).toLocaleDateString()
      },
    },
    {
      field: 'files',
      headerName: t('expenses:fields.attached-files'),
      headerClassName: classes.gridColumn,
      flex: 1,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams) => {
        const rows = params.row.expenseFiles.map((file: ExpenseFile) => {
          return (
            <Tooltip key={file.id} title={file.filename}>
              <Link href={expenseFileUrl(file.id)} target="_blank" passHref>
                <Button sx={{ minWidth: 0, py: 0, px: 1 }}>
                  <FilePresentIcon />
                </Button>
              </Link>
            </Tooltip>
          )
        })
        return <Grid>{rows}</Grid>
      },
    },
  ]

  return (
    <Root>
      <DataGrid
        className={classes.grid}
        rows={expensesList || []}
        columns={columns}
        columnVisibilityModel={{
          id: false,
        }}
        pageSizeOptions={[20, 40, 60]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        autoHeight
        disableRowSelectionOnClick
        getRowHeight={() => 'auto'}
        sx={{
          '.MuiDataGrid-cell': {
            alignItems: 'flex-start',
          },
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
            py: '8px',
          },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
            py: '17px',
          },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
            py: '22px',
          },
        }}
      />
    </Root>
  )
}

export default memo(function CampaignPublicExpensesSection({
  canEditCampaign,
  campaign,
}: ExpenseSection) {
  const { t } = useTranslation()
  const { data: expensesList } = useCampaignApprovedExpensesList(campaign.slug)
  const totalExpenses = expensesList?.reduce((acc, expense) => acc + expense.amount, 0)

  return (
    <Grid id="expenses">
      <Grid item xs={12}>
        <Typography variant="h4" component="h4" my={4}>
          {t('campaigns:campaign.financial-report')} <Assessment />
          {canEditCampaign ? (
            <Tooltip title={t('campaigns:cta.edit')}>
              <LinkButton
                href={routes.campaigns.viewExpenses(campaign.slug)}
                variant="contained"
                endIcon={<EditIcon />}
              />
            </Tooltip>
          ) : (
            ''
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <ReceiptLongIcon /> {t('expenses:reported')}:{' '}
          {moneyPublic(totalExpenses || 0, campaign.currency)}
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <CampaignPublicExpensesGrid expensesList={expensesList} />
      </Grid>
    </Grid>
  )
})
