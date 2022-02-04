import Layout from 'components/admin/Layout'
import { DataGrid, GridColumns, GridRowId } from '@mui/x-data-grid'
import { useCoordinatorList } from 'common/hooks/coordinators'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PageviewIcon from '@mui/icons-material/Pageview'
import Link from 'next/link'
import React from 'react'
import { CoordinatorResponse } from 'gql/coordinator'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DeleteSelectedModal from 'components/admin/DeleteSelected'
import { useMutation } from 'react-query'
import { AlertStore } from 'stores/AlertStore'
import { deleteCoordinator } from 'common/rest'
import { ApiErrors } from 'common/api-errors'
import { AxiosError, AxiosResponse } from 'axios'
import router from 'next/router'

function Coordinator() {
  const { data = [] } = useCoordinatorList()
  const [selectedRows, setSelectedRows] = React.useState<CoordinatorResponse[]>([])
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([])
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = React.useState(false)

  const mutation = useMutation<AxiosResponse<CoordinatorResponse>, AxiosError<ApiErrors>, any>({
    mutationFn: deleteCoordinator,
    onError: () => AlertStore.show('error', 'error'),
    onSuccess: () => AlertStore.show('success', 'success'),
  })

  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Name',
      valueGetter: (p) => `${p.row.person.firstName} ${p.row.person.lastName}`,
      flex: 2,
    },
    {
      field: 'email',
      headerName: 'Email',
      valueGetter: (p) => p.row.person.email,
      flex: 3,
    },
    {
      field: 'company',
      headerName: 'Company',
      valueGetter: (p) => p.row.person.company,
      flex: 2,
    },
  ]

  const deleteSelectedHandler = () => {
    selectedRows.forEach((row: any) => {
      mutation.mutateAsync(row?.id as string).then((_) => {
        router.reload()
      })
    })
  }

  const closeDeleteSelectedHandler = () => {
    setIsDeleteSelectedModalOpen(false)
    setSelectedRows([])
    setSelectionModel([])
  }
  return (
    <Layout>
      <h1>All coordinators</h1>
      <IconButton aria-label="delete" href="/admin/coordinator/create">
        <PersonAddIcon />
      </IconButton>
      <Button
        variant="contained"
        onClick={() => setIsDeleteSelectedModalOpen(true)}
        disabled={selectedRows.length == 0}>
        Delete selected
      </Button>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        selectionModel={selectionModel}
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids)
          const selectedIDs = new Set(ids)
          const selectedRows = data.filter((row) => selectedIDs.has(row.id))
          setSelectedRows(selectedRows)
        }}
      />
      <DeleteSelectedModal
        isOpen={isDeleteSelectedModalOpen}
        deleteHandler={deleteSelectedHandler}
        handleDeleteModalClose={closeDeleteSelectedHandler}></DeleteSelectedModal>
    </Layout>
  )
}

export default Coordinator
