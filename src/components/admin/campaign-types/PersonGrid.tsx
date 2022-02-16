import {
  GridColumns,
  DataGrid,
  GridRowId,
  GridSelectionModel,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import { ModalStore } from 'stores/cars/ModalStore'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { ControlIcons, commonProps } from './PersonGridHelper'
import { apiClient as axios } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { CampaignTypesResponse } from 'gql/campaign-types'

interface GridProps {
  data: CampaignTypesResponse[]
}

export default observer(function PeopleGrid({ data }: GridProps) {
  const router = useRouter()
  const [multipleDelete, setMupltipleDelete] = useState<GridRowId[]>([])
  const [id, setId] = useState('')
  const [pageSize, setPageSize] = useState(5)

  const handleClickOpen = () => {
    ModalStore.openCfrm()
  }
  const handleClose = () => {
    ModalStore.closeCfrm()
  }

  const handleDelete = () => {
    const params: [string, GridRowId[]] | [string, null] =
      multipleDelete.length > 0
        ? [endpoints.campaignTypes.deleteMany.url, multipleDelete]
        : [endpoints.campaignTypes.deleteCampaignType(id).url, null]
    const deleteRecords = async () => {
      try {
        console.log(params)
        params[1] === null ? await axios.delete(params[0]) : await axios.post(params[0], params[1])
        handleClose()
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
      headerName: 'Name',
      field: 'name',
      renderCell: (p) => p.row.name,
      width: 1150,
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
            route={`/admin/campaign-types/edit/${params.id}`}
            handleOpen={handleClickOpen}
            setId={setId}
            idToSet={String(params.id)}
          />
        )
      },
    },
  ]

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
        sortModel={[{ field: 'name', sort: 'asc' }]}
        rows={data || []}
        columns={columns}
        rowsPerPageOptions={[5, 10, 15]}
        pagination
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pageSize={pageSize}
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
