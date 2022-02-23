import {
  GridColumns,
  DataGrid,
  GridRowId,
  GridSelectionModel,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useQueryClient, UseQueryResult } from 'react-query'

import { routes } from 'common/routes'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { BankAccountResponse } from 'gql/bankaccounts'
import { ModalStore } from 'stores/dashboard/ModalStoreOld'
import { useBankAccountsList } from 'common/hooks/bankaccounts'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

import { renderCellWithdraws } from './BankAccountsGridHelper'
import { ControlIcons, commonProps } from './BankAccountsGridHelper'

export default observer(function BankAccountsGrid() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [multipleDelete, setMultipleDelete] = useState<GridRowId[]>([])
  const [id, setId] = useState('')

  //CONFIRMATION DIALOG HANDLERS
  const handleClickOpen = () => {
    ModalStore.openCfrm()
  }
  const handleClose = () => {
    ModalStore.closeCfrm()
  }

  //DELETE HANDLER CHECKS IF ONE OR MORE ITEMS ARE SELECTED
  const handleDelete = () => {
    const params: [string, GridRowId[]] | [string, null] =
      multipleDelete.length > 0
        ? [endpoints.bankAccounts.deleteManyBankAccounts.url, multipleDelete]
        : [endpoints.bankAccounts.deleteBankAccount(id).url, null]
    const deleteRecords = async () => {
      try {
        params[1] === null
          ? await apiClient.delete(params[0])
          : await apiClient.post(params[0], params[1])
        handleClose()
        queryClient.invalidateQueries(endpoints.bankAccounts.bankAccountList.url)
      } catch (error) {
        console.log(error)
      }
    }
    deleteRecords()
  }

  const columns: GridColumns = [
    { ...commonProps, headerName: 'Статус', field: 'status' },
    { ...commonProps, headerName: 'IBAN', field: 'ibanNumber', width: 220 },
    { ...commonProps, headerName: 'Собственик', field: 'accountHolderName', flex: 1 },
    { ...commonProps, headerName: 'Вид', field: 'AccountHolderType' },
    { ...commonProps, headerName: 'Име на банка', field: 'bankName', flex: 1 },
    { ...commonProps, headerName: 'BIC код', field: 'bankIdCode' },
    { ...commonProps, headerName: 'Уникален код', field: 'fingerprint' },
    {
      ...commonProps,
      headerName: 'Извлечения',
      field: 'withdraws',
      renderCell: renderCellWithdraws,
    },
    {
      field: 'others',
      headerName: 'Действия',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      width: 180,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <ControlIcons
            setCarId={ModalStore.setCarId}
            carId={String(params.id)}
            openModal={ModalStore.openModal}
            router={router}
            route={routes.admin.bankaccounts.edit(params.id)}
            handleOpen={handleClickOpen}
            setId={setId}
            idToSet={String(params.id)}
          />
        )
      },
    },
  ]

  const { data }: UseQueryResult<BankAccountResponse[]> = useBankAccountsList()

  return (
    <>
      <ConfirmationDialog
        isOpen={ModalStore.cfrmOpen}
        handleConfirm={handleDelete}
        handleCancel={ModalStore.closeCfrm}
        title={'Потвърждение'}
        content={'Наистина ли искате да изтриете тези записи ?'}
        confirmButtonLabel={'Потвърди'}
        cancelButtonLabel={'Отказ'}
      />
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
        onSelectionModelChange={(selectionModel: GridSelectionModel) => {
          setMultipleDelete(selectionModel)
          selectionModel.length > 0 ? ModalStore.csPositive() : ModalStore.csNegative()
        }}
      />
    </>
  )
})
