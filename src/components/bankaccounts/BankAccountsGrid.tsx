import {
  GridColumns,
  DataGrid,
  GridRowId,
  GridSelectionModel,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import { ModalStore } from 'stores/cars/ModalStore'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { usePersonList } from 'common/hooks/person'
import { useQueryClient, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { ControlIcons, commonProps } from './BankAccountsGridHelper'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { PersonFormData } from 'gql/person'

export default observer(function PeopleGrid() {
  const queryClient = useQueryClient()

  const router = useRouter()
  const [multipleDelete, setMupltipleDelete] = useState<GridRowId[]>([])
  const [id, setId] = useState('')

  const handleClickOpen = () => {
    ModalStore.openCfrm()
  }
  const handleClose = () => {
    ModalStore.closeCfrm()
  }

  const handleDelete = () => {
    const params: [string, GridRowId[]] | [string, null] =
      multipleDelete.length > 0
        ? [endpoints.person.removemany.url, multipleDelete]
        : [endpoints.person.viewPerson(id).url, null]
    const deleteRecords = async () => {
      try {
        console.log(params)
        params[1] === null ? await axios.delete(params[0]) : await axios.post(params[0], params[1])
        handleClose()
        queryClient.invalidateQueries('/')
      } catch (error) {
        console.log(error)
      }
    }
    deleteRecords()
    handleClose()
  }
  const columns: GridColumns = [
    {
      ...commonProps,
      headerName: 'First name',
      field: 'firstName',
      renderCell: (p) => p.row.firstName,
    },
    {
      ...commonProps,
      headerName: 'Last name',
      field: 'lastName',
      renderCell: (p) => p.row.lastName,
    },
    {
      ...commonProps,
      headerName: 'Email',
      field: 'email',
      renderCell: (p) => p.row.email,
    },
    {
      field: 'others',
      headerName: 'Actions',
      headerAlign: 'left',
      width: 150,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <ControlIcons
            setCarId={ModalStore.setCarId}
            carId={String(params.id)}
            openModal={ModalStore.openModal}
            router={router}
            route={`/admin/person/edit/${params.id}`}
            handleOpen={handleClickOpen}
            setId={setId}
            idToSet={String(params.id)}
          />
        )
      },
    },
  ]
  const { data }: UseQueryResult<PersonFormData[]> = usePersonList()

  return (
    <>
      <ConfirmationDialog
        isOpen={ModalStore.cfrmOpen}
        handleConfirm={handleDelete}
        handleCancel={ModalStore.closeCfrm}
        title={'Confirmation'}
        content={'Are you sure you want to remove this/those record(s) ?'}
        confirmButtonLabel={'Yes'}
        cancelButtonLabel={'No'}></ConfirmationDialog>
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
