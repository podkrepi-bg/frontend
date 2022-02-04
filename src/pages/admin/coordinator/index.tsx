import Layout from 'components/admin/Layout'
import { DataGrid, GridColumns, GridRowId } from '@mui/x-data-grid'
import { useCoordinatorList } from 'common/hooks/coordinators'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PageviewIcon from '@mui/icons-material/Pageview'
import Link from 'next/link'
import React from 'react'
import { CoordinatorResponse } from 'gql/coordinator'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DeleteSelectedModal from 'components/admin/DeleteSelectedModal'
import { useMutation } from 'react-query'
import { AlertStore } from 'stores/AlertStore'
import { deleteCoordinator } from 'common/rest'
import { ApiErrors } from 'common/api-errors'
import { AxiosError, AxiosResponse } from 'axios'
import router from 'next/router'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

function Coordinator() {
  const { data = [] } = useCoordinatorList()
  const [selectedRows, setSelectedRows] = React.useState<CoordinatorResponse[]>([])
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([])
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [row, setRow] = React.useState<CoordinatorResponse>()
  const [rowToDelete, setRowToDelete] = React.useState<{ id: string }>()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)

  const mutation = useMutation<AxiosResponse<CoordinatorResponse>, AxiosError<ApiErrors>, any>({
    mutationFn: deleteCoordinator,
    onError: () => AlertStore.show('error', 'error'),
    onSuccess: () => AlertStore.show('success', 'success'),
  })

  const handleOpen = (row: any) => {
    return () => {
      setOpen(true)
      setRow(row)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteModalOpen = (row: any) => {
    return () => {
      setRowToDelete(row)
      setIsDeleteModalOpen(true)
    }
  }

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false)
  }

  const deleteHandler = () => {
    mutation.mutateAsync(rowToDelete?.id as string).then(() => {
      handleDeleteModalClose()
      router.reload()
    })
  }

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
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton size="small" sx={{ mr: 1 }} onClick={handleOpen(cellValues.row)}>
              <PageviewIcon />
            </IconButton>
            <Link href={`/admin/coordinator/${cellValues.row.id}/edit`}>
              <IconButton size="small" sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton size="small" sx={{ mr: 1 }} onClick={handleDeleteModalOpen(cellValues.row)}>
              <DeleteIcon />
            </IconButton>
          </>
        )
      },
      minWidth: 150,
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {row?.person.firstName} {row?.person.lastName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {row?.person.company}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={deleteHandler}>
              Yes
            </Button>
            <Button variant="contained" onClick={handleDeleteModalClose}>
              No
            </Button>
          </Typography>
        </Box>
      </Modal>
    </Layout>
  )
}

export default Coordinator
