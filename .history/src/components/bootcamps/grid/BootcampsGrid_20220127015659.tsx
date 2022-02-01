import React from 'react'
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { useBootcampsList } from 'common/hooks/bootcamps'
import router from 'next/router'
import { routes } from 'common/routes'
import BootcampForm from './BootcampForm'

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import { AlertStore } from 'stores/AlertStore'
import { deleteBootcamp } from 'common/rest'
import { useMutation } from 'react-query'
import ButtonAppBar from './ButtonAppBar'
import Drawer from './Drawer'
import { endpoints } from 'common/api-endpoints'

export default function BootcampsGrid() {
  const { data } = useBootcampsList()

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'firstName',
      headerName: 'First Name',
      editable: true,
      width: 200,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      editable: true,
      width: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,

      getActions: ({ id }) => {
        if (false) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" color="primary" key={id} />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              color="inherit"
              key={id}
            />,
          ]
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            key={id}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id.toString())}
            key={id}
            color="inherit"
          />,
        ]
      },
    },
  ]

  const { t } = useTranslation()
  const mutation = useMutation({
    mutationFn: deleteBootcamp,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const handleDeleteClick = (id: string) => async () => {
    try {
      await mutation.mutateAsync({ id: id })
      router.push(routes.bootcamps.home)
    } catch (error) {
      console.error(error)
      AlertStore.show(t('common:alert.error'), 'error')
    }
    router.push(routes.bootcamps.home)
  }

  return (
    <>
      <Drawer></Drawer>
      <BootcampForm></BootcampForm>
      <DataGrid
        rows={data || []}
        columns={columns}
        pageSize={5}
        editMode="row"
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        // onRowClick={(row) => {
        //   const id = row.getValue(row.id, 'id')
        //   if (typeof id !== 'string') return
        //   router.push(routes.bootcamps.viewBootcampById(id))
        // }}
      />
    </>
  )
}
