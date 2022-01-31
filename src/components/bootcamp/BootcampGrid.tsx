import React from 'react'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PreviewIcon from '@mui/icons-material/Preview'

import { useBootcampList } from 'common/hooks/bootcamp'
import { routes } from 'common/routes'
import { BootcampResponse } from 'gql/bootcamp'
import { ApiErrors } from 'common/api-errors'
import { AlertStore } from 'stores/AlertStore'
import { deleteBootcampIntern, getBootcampIntern } from 'common/rest'

const useStyles = makeStyles({
  gridWrapper: {
    margin: '0 auto',
    maxWidth: '802px',
  },
  grid: {
    marginBottom: '15px',
  },
  gridTitle: {
    marginBottom: '10px',
  },
  infoBtn: {
    margin: '0 auto',
  },
})

const initialValues: BootcampResponse = {
  id: '',
  firstName: '',
  lastName: '',
  phone: '',
}

export default function BootcampGrid() {
  const [openDel, setOpenDel] = React.useState(false)
  const [openInfo, setOpenInfo] = React.useState(false)
  const [selectedInternId, setSelectedInternId] = React.useState('')
  const [intern, setIntern] = React.useState(initialValues)
  const classes = useStyles()
  const { data } = useBootcampList()
  const router = useRouter()
  const { t } = useTranslation()

  const openDeleteRowDialog = (id: string) => {
    setSelectedInternId(id)
    setOpenDel(true)
  }

  const closeDeleteDialog = () => {
    setOpenDel(false)
  }

  const loadInternInfo = async (id: string) => {
    try {
      await infoMutation.mutateAsync(id)
    } catch (error) {
      console.error(error)
    }
  }

  const closeInfoDialog = () => {
    setOpenInfo(false)
  }

  const infoMutation = useMutation<AxiosResponse<BootcampResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: getBootcampIntern,
    onError: () => AlertStore.show(t('bootcamp:alerts.load-intern.error'), 'error'),
    onSuccess: ({ data }) => {
      setIntern(data)
      setOpenInfo(true)
    },
  })

  const delMutation = useMutation<AxiosResponse<BootcampResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: deleteBootcampIntern,
    onError: () => AlertStore.show(t('bootcamp:alerts.delete-row.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('bootcamp:alerts.delete-row.success'), 'success')
      router.push(routes.bootcamp.index)
    },
  })

  const deleteRow = () => {
    closeDeleteDialog()
    delMutation.mutateAsync(selectedInternId)
  }

  type ActionsProps = {
    id: string
  }

  const ActionsButtons = ({ id }: ActionsProps) => {
    return (
      <>
        <IconButton onClick={() => loadInternInfo(id)}>
          <PreviewIcon />
        </IconButton>
        <IconButton href={routes.bootcamp.view(id)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => openDeleteRowDialog(id)}>
          <DeleteIcon />
        </IconButton>
      </>
    )
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'firstName',
      headerName: t('auth:fields.first-name'),
      valueGetter: (p) => p.row.firstName,
      width: 200,
    },
    {
      field: 'lastName',
      headerName: t('auth:fields.last-name'),
      valueGetter: (p) => p.row.lastName,
      width: 200,
    },
    {
      field: 'phone',
      headerName: t('auth:fields.phone'),
      valueGetter: (p) => p.row.phone,
      width: 200,
    },
    {
      field: 'actions',
      headerName: '',
      renderCell: (p) => <ActionsButtons id={p.row.id} />,
      width: 150,
      type: 'actions',
    },
  ]

  const DeleteDialog = () => (
    <Dialog open={openDel} onClose={closeDeleteDialog} maxWidth="xs">
      <DialogTitle>
        {t('bootcamp:alerts.delete-row.question')} ({selectedInternId})?
      </DialogTitle>
      <DialogActions>
        <Button variant="contained" color="secondary" fullWidth onClick={deleteRow}>
          {t('bootcamp:btns.confirm')}
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={closeDeleteDialog}>
          {t('bootcamp:btns.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
  const InfoDialog = () => (
    <Dialog open={openInfo} onClose={closeInfoDialog} maxWidth="xs">
      <DialogTitle>{t('bootcamp:titles.intern-info')}</DialogTitle>
      <DialogContent>
        <p>
          <b>Id:</b> {intern.id}
        </p>
        <p>
          <b>{t('auth:fields.first-name')}:</b> {intern.firstName}
        </p>
        <p>
          <b>{t('auth:fields.last-name')}:</b> {intern.lastName}
        </p>
        <p>
          <b>{t('auth:fields.phone')}:</b> {intern.phone}
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.infoBtn}
          onClick={closeInfoDialog}>
          {t('bootcamp:btns.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <>
      <InfoDialog />
      <DeleteDialog />
      <div className={classes.gridWrapper}>
        <Typography variant="h5" className={classes.gridTitle}>
          {t('bootcamp:titles.bootcamp-interns')}
        </Typography>
        <DataGrid
          className={classes.grid}
          rows={data || []}
          columns={columns}
          pageSize={5}
          autoHeight
          autoPageSize
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  )
}
