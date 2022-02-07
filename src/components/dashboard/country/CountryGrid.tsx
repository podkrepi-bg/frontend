import React from 'react'
import Link from 'next/link'
import { DataGrid, GridColumns, GridSelectionModel } from '@mui/x-data-grid'
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
import AddIcon from '@mui/icons-material/Add'

import { useCountriesList } from 'common/hooks/countries'
import { routes } from 'common/routes'
import { CountryResponse } from 'gql/countries'
import { ApiErrors } from 'common/api-errors'
import { AlertStore } from 'stores/AlertStore'
import { deleteCountry, getCountry } from 'common/rest'

const useStyles = makeStyles({
  gridWrapper: {
    margin: '0 auto',
    maxWidth: 602,
  },
  grid: {
    marginBottom: 15,
  },
  gridTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  gridTitle: {
    marginBottom: 10,
  },
  infoBtn: {
    margin: '0 auto',
  },
})

const initialValues: CountryResponse = {
  id: '',
  name: '',
  countryCode: '',
}

export default function CountryGrid() {
  const [openRowDel, setOpenRowDel] = React.useState<boolean>(false)
  const [openRowsDel, setOpenRowsDel] = React.useState<boolean>(false)
  const [openInfo, setOpenInfo] = React.useState<boolean>(false)
  const [selectedId, setSelectedId] = React.useState<string>('')
  const [selectedCountryName, setSelectedCountryName] = React.useState<string>('')
  const [multipleSelectedIds, setMultipleSelectedIds] = React.useState<string[]>([])
  const [country, setCountry] = React.useState<CountryResponse>(initialValues)

  const { data } = useCountriesList()
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('country')

  const openDeleteRowDialog = (id: string, name: string) => {
    setSelectedId(id)
    setSelectedCountryName(name)
    setOpenRowDel(true)
  }

  const closeDeleteRowDialog = () => {
    setOpenRowDel(false)
  }

  const openDeleteRowsDialog = () => {
    if (multipleSelectedIds.length == 0) {
      return
    }
    setOpenRowsDel(true)
  }

  const closeDeleteRowsDialog = () => {
    setOpenRowsDel(false)
  }

  const loadCountryInfo = async (id: string) => {
    try {
      await infoMutation.mutateAsync(id)
    } catch (error) {
      console.error(error)
    }
  }

  const closeInfoDialog = () => {
    setOpenInfo(false)
  }

  const infoMutation = useMutation<AxiosResponse<CountryResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: getCountry,
    onError: () => AlertStore.show(t('alerts.load.error'), 'error'),
    onSuccess: ({ data }) => {
      setCountry(data)
      setOpenInfo(true)
    },
  })

  const delMutation = useMutation<AxiosResponse<CountryResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: deleteCountry,
    onError: () => AlertStore.show(t('alerts.delete-row.error'), 'error'),
    onSuccess: () => {
      return
    },
  })

  const deleteRow = async () => {
    try {
      closeDeleteRowDialog()
      delMutation.mutateAsync(selectedId)
      AlertStore.show(t('alerts.delete-row.success'), 'success')
      router.push(routes.dashboard.index)
    } catch (err) {
      console.log(err)
    }
  }

  const selectMultipleRows = (ids: GridSelectionModel) => {
    setMultipleSelectedIds(ids.map((id) => id.toString()))
  }

  const deleteRows = async () => {
    try {
      closeDeleteRowsDialog()
      await Promise.all(multipleSelectedIds.map((id) => delMutation.mutateAsync(id)))
      AlertStore.show(t('alerts.delete-rows.success'), 'success')
      setMultipleSelectedIds([])
      router.push(routes.dashboard.index)
    } catch (err) {
      AlertStore.show(t('alerts.delete-rows.error'), 'error')
    }
  }

  type ActionsProps = {
    id: string
    name: string
  }

  const ActionsButtons = ({ id, name }: ActionsProps) => {
    return (
      <>
        <IconButton onClick={() => loadCountryInfo(id)}>
          <PreviewIcon />
        </IconButton>
        <Link href={routes.dashboard.country.view(id)} passHref>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton onClick={() => openDeleteRowDialog(id, name)}>
          <DeleteIcon />
        </IconButton>
      </>
    )
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'name',
      headerName: t('fields.name'),
      valueGetter: (p) => p.row.name,
      width: 200,
    },
    {
      field: 'countryCode',
      headerName: t('fields.country-code'),
      valueGetter: (p) => p.row.countryCode,
      width: 200,
    },
    {
      field: 'actions',
      headerName: '',
      renderCell: (p) => <ActionsButtons id={p.row.id} name={p.row.name} />,
      width: 150,
      type: 'actions',
    },
  ]

  const DeleteRowDialog = () => (
    <Dialog open={openRowDel} onClose={closeDeleteRowDialog} maxWidth="xs">
      <DialogTitle>
        {t('alerts.delete-row.question')} ({selectedCountryName})?
      </DialogTitle>
      <DialogActions>
        <Button variant="contained" color="secondary" fullWidth onClick={deleteRow}>
          {t('btns.confirm')}
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={closeDeleteRowDialog}>
          {t('btns.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
  const DeleteRowsDialog = () => (
    <Dialog open={openRowsDel} onClose={closeDeleteRowsDialog} maxWidth="xs">
      <DialogTitle>{t('alerts.delete-rows.question')}</DialogTitle>
      <DialogActions>
        <Button variant="contained" color="secondary" fullWidth onClick={deleteRows}>
          {t('btns.confirm')}
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={closeDeleteRowsDialog}>
          {t('btns.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
  const InfoDialog = () => (
    <Dialog open={openInfo} onClose={closeInfoDialog} maxWidth="xs">
      <DialogTitle>{t('headings.country-info')}</DialogTitle>
      <DialogContent>
        <p>
          <b>Id:</b> {country.id}
        </p>
        <p>
          <b>{t('fields.name')}:</b> {country.name}
        </p>
        <p>
          <b>{t('fields.country-code')}:</b> {country.countryCode}
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.infoBtn}
          onClick={closeInfoDialog}>
          {t('btns.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <>
      <InfoDialog />
      <DeleteRowDialog />
      <DeleteRowsDialog />
      <div className={classes.gridWrapper}>
        <div className={classes.gridTitleWrapper}>
          <Typography variant="h6" className={classes.gridTitle}>
            {t('headings.countries')}
          </Typography>

          <section>
            <Link href={routes.dashboard.country.create} passHref>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Link>
            <IconButton onClick={openDeleteRowsDialog}>
              <DeleteIcon />
            </IconButton>
          </section>
        </div>

        <DataGrid
          className={classes.grid}
          rows={data || []}
          columns={columns}
          pageSize={5}
          autoHeight
          autoPageSize
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectMultipleRows}
        />
      </div>
    </>
  )
}
