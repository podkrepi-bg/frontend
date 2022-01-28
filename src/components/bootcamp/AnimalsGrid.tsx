import { Button } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import {
  DataGrid,
  GridColumns,
  GridEditRowProps,
  GridEditRowsModel,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import { useAnimalsList } from 'common/hooks/bootcampStudents'
import { deleteAnimal, editAnimal } from 'common/rest'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { AlertStore } from 'stores/AlertStore'
import ConfirmModal from './ConfirmModal'

const useStyles = makeStyles(() => {
  return {
    deleteBtn: {
      ':hover': {
        backgroundColor: '#bf0000',
      },
    },
  }
})

export default function AnimalsGrid() {
  const [editRowsModel, setEditRowsModel] = useState({})
  const { data } = useAnimalsList()
  const [animals, setAnimals] = useState(data)
  const [modifiedAnimals, setModifiedAnimals] =
    useState<{ id: string; name: string; type: string; isModified: boolean }[] | undefined>(
      undefined,
    )
  const classes = useStyles()
  const { t } = useTranslation()

  useEffect(() => {
    setAnimals(data)
    if (data) {
      setModifiedAnimals(
        data.map((x) => {
          return {
            ...x,
            isModified: false,
          }
        }),
      )
    }
  }, [data])

  const handleEditRowsModelChange = (model: GridEditRowsModel) => {
    const values: GridEditRowProps[] = Object.values(model)
    const currentAnimal = animals?.find((x) => x.id === Object.keys(model)[0])

    if (
      currentAnimal &&
      (currentAnimal.name !== values[0].name.value || currentAnimal.type !== values[0].type.value)
    ) {
      setModifiedAnimals((old) => {
        const index = old?.findIndex((x) => x.id === currentAnimal.id)
        const copy = old?.slice()
        const newAnimal = {
          id: currentAnimal.id,
          name: (values[0]?.name?.value as string) || currentAnimal.name,
          type: (values[0]?.type?.value as string) || currentAnimal.type,
          isModified: true,
        }
        copy![index!] = newAnimal
        return copy
      })
    } else if (
      currentAnimal &&
      currentAnimal.name === values[0].name.value &&
      currentAnimal.type === values[0].type.value
    ) {
      setModifiedAnimals((old) => {
        const index = old?.findIndex((x) => x.id === currentAnimal.id)
        const copy = old?.slice()
        const newAnimal = {
          id: currentAnimal.id,
          name: (values[0]?.name?.value as string) || currentAnimal.name,
          type: (values[0]?.type?.value as string) || currentAnimal.type,
          isModified: false,
        }
        copy![index!] = newAnimal
        return copy
      })
    }
    setEditRowsModel(model)
  }

  const renderEditButton = (params: GridRenderCellParams) => {
    const mutation = useMutation({
      mutationFn: editAnimal,
      onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
      onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
    })

    const values: { name: { value: string }; type: { value: string } }[] =
      Object.values(editRowsModel)
    const editHandler = async () => {
      try {
        await mutation.mutateAsync({
          id: params.row.id,
          name: values[0]?.name?.value || params.row.name,
          type: values[0]?.type?.value || params.row.type,
        })
        setAnimals((old) => {
          const index = old?.findIndex((x) => x.id === params.row.id)
          const copy = old?.slice()
          copy![index!] = {
            id: params.row.id,
            name: values[0]?.name?.value || params.row.name,
            type: values[0]?.type?.value || params.row.type,
          }
          return copy
        })
        setModifiedAnimals((old) => {
          const index = old?.findIndex((x) => x.id === params.row.id)
          const copy = old?.slice()
          const newAnimal = {
            id: params.row.id,
            name: values[0]?.name?.value || params.row.name,
            type: values[0]?.type?.value || params.row.type,
            isModified: false,
          }
          copy![index!] = newAnimal
          return copy
        })
        setEditRowsModel({})
      } catch (error) {
        AlertStore.show(t('common:alerts.error'), 'error')
      }
    }

    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={editHandler}
        disabled={!modifiedAnimals?.find((x) => x.id === params.row.id)?.isModified}>
        Edit
      </Button>
    )
  }

  const renderDeleteButton = (params: GridRenderCellParams) => {
    const [open, setOpen] = useState(false)
    const mutation = useMutation({
      mutationFn: deleteAnimal,
      onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
      onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
    })
    const onClickHandler = () => {
      setOpen(true)
    }
    const closeModal = () => setOpen(false)
    const deleteConfirmHandler = async () => {
      try {
        await mutation.mutateAsync({ slug: params.row.id })
        setAnimals((old) => old?.filter((x) => x.id !== params.row.id))
        setModifiedAnimals((old) => old?.filter((x) => x.id !== params.row.id))
      } catch (error) {
        AlertStore.show(t('common:alerts.error'), 'error')
      }
      setOpen(false)
    }

    return (
      <>
        <Button
          onClick={onClickHandler}
          variant="contained"
          color="error"
          size="small"
          className={classes.deleteBtn}>
          Delete
        </Button>
        <ConfirmModal open={open} confirmHandler={deleteConfirmHandler} closeModal={closeModal} />
      </>
    )
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      width: 200,
    },
    {
      field: 'type',
      headerName: 'Type',
      editable: true,
      width: 200,
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      renderCell: renderEditButton,
      width: 150,
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      renderCell: renderDeleteButton,
      width: 150,
    },
  ]

  return (
    <DataGrid
      rows={modifiedAnimals || []}
      columns={columns}
      pageSize={5}
      editMode="row"
      editRowsModel={editRowsModel}
      onEditRowsModelChange={handleEditRowsModelChange}
      autoHeight
      autoPageSize
      disableSelectionOnClick
    />
  )
}
