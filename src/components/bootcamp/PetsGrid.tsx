import { Card, CardContent, Container, Dialog, Typography, Link, Tooltip, Box } from '@mui/material'
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
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const useStyles = makeStyles(() => {
  return {
    btn: {
      marginRight: '16px',
      cursor: 'pointer',
    },
    deleteBtn: {
      ':hover': {
        backgroundColor: '#bf0000',
      },
    },
    link: {
      margin: 0,
      padding: 0,
      color: '#000',
      display: 'flex',
    },
  }
})

function DetailsButton({ params }: { params: GridRenderCellParams }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const closeModal = () => setModalIsOpen(false)
  const classes = useStyles()
  return (
    <Tooltip title="details" placement="top">
      <Box className={classes.link}>
        <PermDeviceInformationIcon onClick={() => setModalIsOpen(true)} className={classes.btn} />
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
      </Box>
    </Tooltip>
  )
}

const EditButton = ({ params }: { params: GridRenderCellParams }) => {
  const classes = useStyles()

  return (
    <Tooltip title="edit" placement="top">
      <Link className={classes.link} href={`/bootcamp/dashboard/pets/${params.row.id}/edit`}>
        <EditIcon className={classes.btn} />
      </Link>
    </Tooltip>
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
    <Tooltip title="delete" placement="top">
      <Box className={classes.link}>
        <DeleteIcon onClick={onClickHandler} className={`${classes.deleteBtn} ${classes.btn}`} />
        <ConfirmModal open={open} confirmHandler={deleteConfirmHandler} closeModal={closeModal} />
      </Box>
    </Tooltip>
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
        <EditButton params={params} />
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
        flex: 2,
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 200,
        flex: 6,
      },
      {
        field: 'Actions',
        headerName: 'Actions',
        renderCell: renderActions,
        width: 250,
        flex: 1,
      },
    ]
  }, [])

  return (
    <Container>
      <DataGrid
        rows={animals || []}
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
      />
    </Container>
  )
}
