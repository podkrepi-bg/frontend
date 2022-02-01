import {
  Card,
  CardContent,
  Container,
  Dialog,
  Typography,
  Tooltip,
  Box,
  Button,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridSelectionModel,
  GridToolbarContainer,
} from '@mui/x-data-grid'
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
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Link from 'next/link'
import { routes } from 'common/routes'

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

type GridToolbarProps = {
  selectionModel: GridSelectionModel
  setAnimals: (old: any) => void
}

function GridToolbar({ selectionModel, setAnimals }: GridToolbarProps) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const mutation = useMutation({
    mutationFn: deleteAnimal,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })
  const deleteConfirmHandler = async () => {
    for (let i = 0; i < selectionModel.length; i++) {
      await mutation.mutateAsync({ slug: selectionModel[i].toString() })
    }
    setAnimals((old: any) =>
      (old as AnimalResponse[])?.filter((x) => !selectionModel.includes(x.id)),
    )
    setOpen(false)
  }

  return (
    <GridToolbarContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}>
        <Link passHref href={routes.bootcamp.dashboard.createPet}>
          <Button color="primary" startIcon={<AddCircleIcon />}>
            Add new
          </Button>
        </Link>
        <Tooltip title="Delete selected" placement="top">
          <span>
            <Button
              color="primary"
              disabled={selectionModel.length == 0}
              startIcon={<DeleteIcon />}
              onClick={() => setOpen(true)}>
              Delete
            </Button>
          </span>
        </Tooltip>
        <ConfirmModal
          open={open}
          confirmHandler={deleteConfirmHandler}
          closeModal={() => setOpen(false)}
        />
      </Box>
    </GridToolbarContainer>
  )
}

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
      <Link passHref href={routes.bootcamp.dashboard.editPet(params.row.id)}>
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
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])

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
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            selectionModel,
            setAnimals,
          },
        }}
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids)
        }}
      />
    </Container>
  )
}
