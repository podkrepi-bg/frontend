import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { GridColDef, DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import theme from 'common/theme'
import { BankAccountResponse } from 'gql/bankaccounts'
import { useBankAccountsList } from 'common/hooks/bankaccounts'
import GridActions from 'components/admin/GridActions'

import { ModalStore } from '../BankAccountsPage'
import { renderCellWithdraws } from './BankAccountsGridHelper'
import { commonProps } from './BankAccountsGridHelper'
import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'

export default observer(function BankAccountsGrid() {
  const { t } = useTranslation('bankaccounts')
  const { data }: UseQueryResult<BankAccountResponse[]> = useBankAccountsList()
  const { isDetailsOpen } = ModalStore
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: t('actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.ibanNumber}
            editLink={routes.admin.bankaccounts.edit(params.row.id)}
          />
        )
      },
    },
    { ...commonProps, headerName: t('status'), field: 'status' },
    { ...commonProps, headerName: t('ibanNumber'), field: 'ibanNumber', width: 220 },
    { ...commonProps, headerName: t('accountHolderName'), field: 'accountHolderName', flex: 1 },
    { ...commonProps, headerName: t('AccountHolderType'), field: 'AccountHolderType' },
    { ...commonProps, headerName: t('bankName'), field: 'bankName', flex: 1 },
    { ...commonProps, headerName: t('bankIdCode'), field: 'bankIdCode' },
    { ...commonProps, headerName: t('fingerprint'), field: 'fingerprint' },
    {
      ...commonProps,
      headerName: t('withdrawals'),
      field: 'withdrawals',
      renderCell: renderCellWithdraws,
    },
  ]

  return (
    <>
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
        pageSizeOptions={[5, 10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
      />

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
