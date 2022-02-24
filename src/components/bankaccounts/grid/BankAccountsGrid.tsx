import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import {
  GridColumns,
  DataGrid,
  GridRowId,
  GridSelectionModel,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import { BankAccountResponse } from 'gql/bankaccounts'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { useBankAccountsList } from 'common/hooks/bankaccounts'
import GridActions from 'components/admin/GridActions'

import { renderCellWithdraws } from './BankAccountsGridHelper'
import { commonProps } from './BankAccountsGridHelper'
import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'

export default observer(function BankAccountsGrid() {
  const [selected, setSelected] = useState({
    id: '',
    name: '',
  })
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const { t } = useTranslation('bankaccounts')

  const { data }: UseQueryResult<BankAccountResponse[]> = useBankAccountsList()

  const { selectedPositive, selectedNegative } = ModalStore

  const columns: GridColumns = [
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
            id={params.row.id}
            name={params.row.ibanNumber}
            setSelected={setSelected}
            editLink={routes.admin.bankaccounts.edit(params.row.id)}
          />
        )
      },
    },
  ]

  return (
    <>
      <DataGrid
        style={{
          background: 'white',
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
        rowsPerPageOptions={[5, 10]}
        pageSize={10}
        autoHeight
        autoPageSize
        disableSelectionOnClick
        checkboxSelection
        onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
          newSelectionModel.length !== 0 ? selectedPositive() : selectedNegative()
          setSelectionModel(newSelectionModel)
        }}
      />
      <DetailsModal id={selected.id} />
      <DeleteModal id={selected.id} name={selected.name} />
      <DeleteAllModal selectionModel={selectionModel} />
    </>
  )
})
