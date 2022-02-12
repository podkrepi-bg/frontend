import React, { useState } from 'react'
import { ControlIcons, commonProps } from '../GridHelper'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import { deleteInfoRequest } from 'common/rest'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'
import ViewModal from './ViewModal'
import { UseBaseQueryResult, useMutation } from 'react-query'
import { AlertStore } from 'stores/AlertStore'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { InfoRequest, useInfoRequestList } from 'common/hooks/infoRequest'
import { ApiErrors } from 'common/api-errors'
import { useTranslation } from 'next-i18next'
import { endpoints } from 'common/api-endpoints'

export default function InfoRequestGrid() {
  const { data }: UseBaseQueryResult<InfoRequest[]> = useInfoRequestList()
  const [deleteId, setDeleteId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [row, setRow] = useState<any>()
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<InfoRequest>, AxiosError<ApiErrors>, string>({
    mutationFn: deleteInfoRequest,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const handleDelete = () => {
    // mutation.mutateAsync(deleteId).then(() => {
    //   router.push(routes.admin.infoRequest)
    //   setIsModalOpen(false)
    // })
    deleteInfoRequest(deleteId).then(() => {
      router.push(routes.admin.infoRequest)
      setIsModalOpen(false)
    })
  }

  const columns: GridColumns = [
    { ...commonProps, headerName: 'message', field: 'message' },
    {
      ...commonProps,
      headerName: 'First name',
      field: 'firstname',
      width: 220,
      valueGetter: (data) => {
        return data.row.person.firstName
      },
    },
    {
      ...commonProps,
      headerName: 'Last name',
      field: 'lastname',
      width: 220,
      valueGetter: (data) => {
        return data.row.person.lastName
      },
    },
    {
      field: 'others',
      headerName: 'Действие',
      headerAlign: 'left',
      width: 150,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <ControlIcons
            setId={setDeleteId}
            handleDelete={() => setIsModalOpen(true)}
            editRoute="/edit"
            row={params.row}
            setOpen={setRow}
            openModal={() => setIsViewModalOpen(true)}
          />
        )
      },
    },
  ]

  return (
    <>
      <ViewModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        data={row}></ViewModal>
      <ConfirmationDialog
        isOpen={isModalOpen}
        handleConfirm={handleDelete}
        handleCancel={() => setIsModalOpen(false)}
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
      />
    </>
  )
}
