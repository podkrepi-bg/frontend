import {
  GridColumns,
  DataGrid,
  GridRowId,
  GridSelectionModel,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import { ModalStore } from 'stores/dashboard/ModalStore'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { useBankAccountsList } from 'common/hooks/bankaccounts'
import { useQueryClient, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { ControlIcons, commonProps } from './BankAccountsGridHelper'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { renderCellWithdraws } from './BankAccountsGridHelper'
import { BankAccountResponse } from 'gql/bankaccounts'
export default observer(function BankAccountsGrid() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [multipleDelete, setMupltipleDelete] = useState<GridRowId[]>([])
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
        params[1] === null ? await axios.delete(params[0]) : await axios.post(params[0], params[1])
        handleClose()
        queryClient.invalidateQueries('/bankaccount')
      } catch (error) {
        console.log(error)
      }
    }
    deleteRecords()
  }
  const columns: GridColumns = [
    { ...commonProps, headerName: 'статус', field: 'status' },
    { ...commonProps, headerName: 'ИБАН', field: 'ibanNumber', width: 220 },
    { ...commonProps, headerName: 'собственик', field: 'accountHolderName' },
    { ...commonProps, headerName: 'вид', field: 'accountHolderType' },
    { ...commonProps, headerName: 'име на банка', field: 'bankName' },
    { ...commonProps, headerName: 'ид на банката', field: 'bankIdCode' },
    { ...commonProps, headerName: 'подпис', field: 'fingerprint' },
    {
      ...commonProps,
      headerName: 'извлечения',
      field: 'withdraws',
      renderCell: renderCellWithdraws,
    },
    {
      field: 'others',
      headerName: 'Действие',
      headerAlign: 'left',
      width: 150,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <ControlIcons
            setCarId={ModalStore.setCarId}
            carId={String(params.id)}
            openModal={ModalStore.openModal}
            router={router}
            route={`/bankaccounts/edit/${params.id}`}
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
        cancelButtonLabel={'Отказ'}></ConfirmationDialog>
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
        pageSize={5}
        autoHeight
        autoPageSize
        disableSelectionOnClick
        checkboxSelection
        onSelectionModelChange={(selectionModel: GridSelectionModel) => {
          setMupltipleDelete(selectionModel)
          selectionModel.length > 0 ? ModalStore.csPositive() : ModalStore.csNegative()
        }}
      />
    </>
  )
})
