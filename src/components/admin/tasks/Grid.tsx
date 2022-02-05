import {
  GridColumns,
  DataGrid,
  GridRenderCellParams,
  GridColDef,
  GridRowId,
  GridSelectionModel,
  GridCellValue,
} from '@mui/x-data-grid'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import { ModalStore } from 'stores/cars/ModalStore'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AlertDialog from './ConfirmationDialog'
import { useBankAccountsList } from 'common/hooks/cars'
import { UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react'
import { useState } from 'react'
import CSS from 'csstype'
import { bankAccountResponse } from 'gql/bankAccounts'

export default observer(function TasksGrid() {
  const router = useRouter()
  const [multipleDelete, setMupltipleDelete] = useState<GridRowId[]>([])
  const [id, setId] = useState<GridRowId>('')

  const handleClickOpen = () => {
    ModalStore.openCfrm()
  }

  const handleClose = () => {
    ModalStore.closeCfrm()
  }
  const commonCellStyles = (status: GridCellValue): CSS.Properties => {
    return {
      fontWeight: 'bold',
      color: status === 'verified' ? 'green' : status === 'verification_failed' ? 'red' : '',
    }
  }

  const renderCell = (cellValues: GridRenderCellParams<bankAccountResponse>): React.ReactNode => {
    return (
      <div style={commonCellStyles(cellValues.getValue(cellValues.id, 'status'))}>
        {cellValues.value}
      </div>
    )
  }
  const commonProps: Partial<GridColDef> = {
    align: 'center',
    width: 150,
    headerAlign: 'center',
    renderCell,
  }
  const columns: GridColumns = [
    { ...commonProps, headerName: 'статус', field: 'status' },
    { ...commonProps, headerName: 'ибан', field: 'ibanNumber' },
    { ...commonProps, headerName: 'собственик', field: 'accountHolderName' },
    { ...commonProps, headerName: 'вид', field: 'accountHolderType' },
    { ...commonProps, headerName: 'име на банка', field: 'bankName' },
    { ...commonProps, headerName: 'ид на банката', field: 'bankIdCode' },
    { ...commonProps, headerName: 'цена', field: 'fingerprint' },
    {
      field: 'others',
      headerName: 'редактиране',
      headerAlign: 'center',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            {
              <PrivacyTipIcon
                sx={{ cursor: 'pointer' }}
                color="info"
                onClick={() => {
                  ModalStore.setCarId(params.id)
                  ModalStore.openModal()
                }}
              />
            }
            {
              <EditIcon
                sx={{ cursor: 'pointer' }}
                color="action"
                onClick={() => {
                  router.push(`/tasks/edit/${params.id}`)
                }}
              />
            }
            {
              <DeleteIcon
                sx={{ cursor: 'pointer', opacity: 0.9 }}
                color="error"
                onClick={() => {
                  handleClickOpen()
                  setId(params.id)
                }}
              />
            }
          </div>
        )
      },
    },
  ]
  const { data }: UseQueryResult<bankAccountResponse[]> = useBankAccountsList()
  console.log(data)
  if (data) {
    console.log(data)
  }
  return (
    <>
      <AlertDialog
        open={ModalStore.cfrmOpen}
        handleClose={handleClose}
        id={id}
        multipleDeleteItems={multipleDelete}></AlertDialog>
      <DataGrid
        style={{
          marginTop: '2px',
          background: 'white',
          height: 'calc(100vh - 500px)',
          border: 'none',
          padding: '10px 50px',
        }}
        rows={data || []}
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        disableSelectionOnClick
        checkboxSelection
        onSelectionModelChange={(selectionModel: GridSelectionModel) => {
          setMupltipleDelete(selectionModel)
          if (selectionModel.length > 0) {
            ModalStore.csPositive()
          } else {
            ModalStore.csNegative()
          }
        }}
      />
    </>
  )
})
