import * as React from 'react'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { Bootcamp, deleteTask, useTasksList } from '../survices/bootcampSurvices'
import { ButtonGroup } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import DeleteModal from './DeleteModal'
import { useMutation, useQueryClient } from 'react-query'
import { AlertStore } from 'stores/AlertStore'
import InfoModal from './InfoModal'
import { endpoints } from '../survices/requester'
import { GridCellExpand } from './GridCellExpand'

type Props = {
  setIds: (id: []) => void
}

export default function BootcampGrid({ setIds }: Props) {
  const { t } = useTranslation()
  const router = useRouter()
  const [openClose, setOpenClose] = React.useState(false)
  const [info, setInfo] = React.useState({})
  const [openCloseInfo, setOpenCloseInfo] = React.useState(false)
  const [id, setId] = React.useState('')
  const closeModal = () => setOpenClose(false)
  const openModal = () => setOpenClose(true)
  const closeInfo = () => setOpenCloseInfo(false)
  const queryClient = useQueryClient()

  const mutationDell = useMutation({
    mutationFn: deleteTask,
    onError: () => AlertStore.show(t('bootcamp:alerts.delete-row.error'), 'error'),
    onSuccess: () => {
      closeModal()
      AlertStore.show(t('bootcamp:alerts.delete-row.success'), 'success')
      queryClient.invalidateQueries(endpoints.bootcamp.allTasks.url)
    },
  })

  const handleDelete = async () => {
    try {
      await mutationDell.mutateAsync(id)
    } catch (error) {
      AlertStore.show(t('common:alert.error'), 'error')
    }
  }

  function renderCellExpand(params: GridRenderCellParams<string>) {
    return <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'status',
      headerName: t('bootcamp:task.status'),
      flex: 2,
      minWidth: 200,
      align: 'left',
    },
    {
      field: 'title',
      headerName: t('bootcamp:task.title'),
      flex: 3,
      minWidth: 200,
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'email',
      headerName: t('bootcamp:task.email'),
      flex: 3,
      minWidth: 200,
      align: 'left',
    },
    {
      field: 'message',
      headerName: t('bootcamp:task.message'),
      flex: 3,
      minWidth: 200,
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'startDate',
      headerName: t('bootcamp:task.created-at'),
      valueGetter: (task) => task.row.createdAt,
      valueFormatter: (d) => (typeof d.value === 'string' ? d.value.substring(0, 10) : false),
      minWidth: 200,
      align: 'right',
    },
    {
      field: 'finalDate',
      headerName: t('bootcamp:task.final-date'),
      valueGetter: (task) => task.row.date,
      valueFormatter: (d) => (typeof d.value === 'string' ? d.value.substring(0, 10) : false),
      minWidth: 200,
      width: 200,
      align: 'right',
    },
    {
      field: 'action',
      type: 'actions',
      headerName: t('bootcamp:task.action'),
      width: 200,
      align: 'center',
      renderCell: (task) => {
        return (
          <ButtonGroup>
            <InfoOutlinedIcon
              color="info"
              onClick={() => {
                setOpenCloseInfo(true)
                setInfo(task.row)
              }}
              sx={{ cursor: 'pointer' }}
            />
            <EditOutlinedIcon
              color="info"
              sx={{ marginLeft: 4, marginRight: 4, cursor: 'pointer' }}
              onClick={() => router.push(`/bootcamp/${task.id}`)}
            />
            <DeleteForeverOutlinedIcon
              color="error"
              onClick={() => {
                setId(task.id as string)
                openModal()
              }}
              sx={{ cursor: 'pointer' }}
            />
          </ButtonGroup>
        )
      },
    },
  ]

  const { data = [] } = useTasksList()

  return (
    <>
      <DataGrid
        rows={data || []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => setIds(ids as [])}
      />
      <DeleteModal open={openClose} closeModal={closeModal} confirmHandler={handleDelete} />
      <InfoModal openInfo={openCloseInfo} data={info as Bootcamp} setClose={closeInfo} />
    </>
  )
}
