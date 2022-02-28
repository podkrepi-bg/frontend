import { GridColumns, DataGrid, GridSelectionModel, GridRenderCellParams } from '@mui/x-data-grid'
import { observer } from 'mobx-react'
import React from 'react'
import { useMutation, UseQueryResult } from 'react-query'
import { useCoordinatorsList } from 'common/hooks/coordinators'
import { commonProps } from './CoordinatorsGridHelper'
import { CoordinatorResponse } from 'gql/coordinators'
import { useDeleteCoordinatorRequest } from 'service/coordinator'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors } from 'service/apiErrors'
import GridActions from 'components/admin/GridActions'
import { ModalStore } from 'stores/dashboard/ModalStore'
import DeleteRowDialog from './DeleteRowDialog'
import InfoDialog from './InfoDialog'

export default observer(function CoordinatorsGrid() {
  const [selected, setSelected] = React.useState({
    id: '',
    name: '',
  })
  const { isDetailsOpen, hideDetails, isDeleteOpen, hideDelete, showDeleteAll, hideDeleteAll } =
    ModalStore
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<CoordinatorResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteCoordinatorRequest(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const selectMultipleRows = (ids: GridSelectionModel) => {
    // console.log('ids', ids)
    const idsToStr = ids.map((id) => id.toString())
    showDeleteAll(idsToStr)
    if (ids.length === 0) {
      hideDeleteAll()
    }
  }

  const deleteRow = async () => {
    try {
      hideDelete()
      await mutation.mutateAsync(selected.id)
      // router.push(routes.admin.countries.index)
    } catch (err) {
      console.log(err)
    }
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
      renderCell: (p: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            id={p.row.id}
            name={`${p.row.person.firstName} ${p.row.person.lastName}`}
            setSelected={setSelected}
          />
        )
      },
    },
  ]

  const { data }: UseQueryResult<CoordinatorResponse[]> = useCoordinatorsList()

  return (
    <>
      <InfoDialog open={isDetailsOpen} closeFn={hideDetails} data={selected} />
      <DeleteRowDialog
        open={isDeleteOpen}
        closeFn={hideDelete}
        name={selected.name}
        deleteRow={deleteRow}
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
        onSelectionModelChange={selectMultipleRows}
      />
    </>
  )
})
