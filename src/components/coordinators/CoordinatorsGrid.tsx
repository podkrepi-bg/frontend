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
import { useMutation, useQueryClient, UseQueryResult } from 'react-query'

import { routes } from 'common/routes'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { useCoordinatorsList } from 'common/hooks/coordinators'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

import { ControlIcons, commonProps } from './CoordinatorsGridHelper'
import { CoordinatorResponse } from 'gql/coordinators'
import { useDeleteCoordinatorRequest } from 'service/coordinator'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors } from 'service/apiErrors'

export default observer(function CoordinatorsGrid() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [multipleDelete, setMultipleDelete] = useState<GridRowId[]>([])
  const [id, setId] = useState('')
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<CoordinatorResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteCoordinatorRequest(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  //CONFIRMATION DIALOG HANDLERS
  const handleClickOpen = () => {
    ModalStore.openCfrm()
  }
  const handleClose = () => {
    ModalStore.closeCfrm()
  }

  //DELETE HANDLER CHECKS IF ONE OR MORE ITEMS ARE SELECTED
  const handleDelete = () => {
    const ids = multipleDelete.length > 0 ? multipleDelete : [id]
    Promise.all(ids.map((e) => mutation.mutateAsync(e as string))).then(() => {
      handleClose()
      queryClient.invalidateQueries(endpoints.coordinators.coordinatorsList.url)
    })
  }

  const columns: GridColumns = [
    {
      ...commonProps,
      headerName: 'Име',
      field: 'status',
      renderCell: (row) => `${row.row.person.firstName} ${row.row.person.lastName}`,
    },
    {
      ...commonProps,
      headerName: 'Имейл',
      field: 'ibanNumber',
      width: 220,
      renderCell: (row) => `${row.row.person.email}`,
    },
    {
      ...commonProps,
      headerName: 'Телефон',
      field: 'accountHolderName',
      flex: 1,
      renderCell: (row) => `${row.row.person.phone}`,
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
            route={routes.admin.coordinators.edit(params.id)}
            handleOpen={handleClickOpen}
            setId={setId}
            idToSet={String(params.id)}
          />
        )
      },
    },
  ]

  const { data }: UseQueryResult<CoordinatorResponse[]> = useCoordinatorsList()

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
