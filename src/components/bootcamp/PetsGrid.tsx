import { Button, Card, CardContent, Container, Dialog, Modal, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useAnimalsList } from 'common/hooks/bootcampStudents'
import { deleteAnimal } from 'common/rest'
import { AnimalResponse } from 'gql/bootcamp'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { AlertStore } from 'stores/AlertStore'
import ConfirmModal from './ConfirmModal'
import CreateAnimalForm from './CreateAnimalForm'

const useStyles = makeStyles(() => {
  return {
    btn: {
      marginRight: '16px',
    },
    deleteBtn: {
      ':hover': {
        backgroundColor: '#bf0000',
      },
    },
  }
})

function DetailsButton({ params }: { params: GridRenderCellParams }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const closeModal = () => setModalIsOpen(false)
  const classes = useStyles()
  return (
    <>
      <Button
        onClick={() => setModalIsOpen(true)}
        variant="outlined"
        size="small"
        className={classes.btn}>
        Details
      </Button>
      <Dialog open={modalIsOpen} onClose={closeModal} sx={{ top: '-35%' }}>
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ marginBottom: '16px' }}>
              Pet details:
            </Typography>
            <Typography variant="body2">Name: {params.row.name}</Typography>
            <Typography variant="body2">Type: {params.row.type}</Typography>
          </CardContent>
        </Card>
      </Dialog>
    </>
  )
}

const EditButton = ({
  params,
  setAnimals,
}: {
  params: GridRenderCellParams
  setAnimals: (old: any) => void
}) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const successHandler = (newAnimal: { id: string; name: string; type: string }) => {
    closeModal()
    setAnimals((old: any) => {
      const index = (old as AnimalResponse[])?.findIndex((x) => x.id === params.row.id)
      const copy = (old as AnimalResponse[])?.slice()
      copy![index!] = newAnimal
      return copy
    })
  }

  return (
    <>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        size="small"
        onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      <Modal open={isOpen} onClose={closeModal} sx={{ top: '20%' }}>
        <Container>
          <CreateAnimalForm
            initialValues={params.row}
            redirectUrl="/bootcamp/dashboard/pets"
            successHandler={successHandler}
            closeModal={closeModal}
          />
        </Container>
      </Modal>
    </>
  )
}

const DeleteButton = ({
  params,
  setAnimals,
}: {
  params: GridRenderCellParams
  setAnimals: (old: any) => void
}) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const classes = useStyles()
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
      setAnimals((old: any) => (old as AnimalResponse[])?.filter((x) => x.id !== params.row.id))
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
        className={`${classes.deleteBtn} ${classes.btn}`}>
        Delete
      </Button>
      <ConfirmModal open={open} confirmHandler={deleteConfirmHandler} closeModal={closeModal} />
    </>
  )
}

export default function PetsGrid() {
  const { data } = useAnimalsList()
  const [animals, setAnimals] = useState(data)

  useEffect(() => {
    setAnimals(data)
  }, [data])

  const renderActions = useCallback((params: GridRenderCellParams) => {
    return (
      <>
        <DetailsButton params={params} />
        <EditButton params={params} setAnimals={setAnimals} />
        <DeleteButton params={params} setAnimals={setAnimals} />
      </>
    )
  }, [])

  const columns: GridColumns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', hide: true },
      {
        field: 'name',
        headerName: 'Name',
        width: 200,
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 200,
      },
      {
        field: 'Actions',
        headerName: 'Actions',
        renderCell: renderActions,
        width: 250,
      },
    ]
  }, [])

  return (
    <DataGrid
      rows={animals || []}
      columns={columns}
      pageSize={5}
      autoHeight
      autoPageSize
      disableSelectionOnClick
    />
  )
}
