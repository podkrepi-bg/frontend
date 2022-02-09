import React from 'react'
import Link from 'next/link'
import { DataGrid, GridColumns, GridSelectionModel } from '@mui/x-data-grid'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import { useCountriesList } from 'common/hooks/countries'
import { routes } from 'common/routes'
import { CountryResponse } from 'gql/countries'
import { ApiErrors } from 'common/api-errors'
import { AlertStore } from 'stores/AlertStore'
import { deleteCountry, getCountry } from 'common/rest'

import InfoDialog from './InfoDialog'
import DeleteRowDialog from './DeleteRowDialog'
import DeleteRowsDialog from './DeleteRowsDialog'
import ActionsButtons from './ActionButtons'

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
  const [selected, setSelected] = React.useState({
    id: '',
    name: '',
    ids: [''],
  })
  const [country, setCountry] = React.useState<CountryResponse>(initialValues)

  const { data } = useCountriesList()
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('country')

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
      AlertStore.show(t('alerts.delete-row.success'), 'success')
      router.push(routes.dashboard.index)
    },
  })

  const openDeleteRowDialog = (id: string, name: string) => {
    setSelected({ ...selected, id, name })
    setOpenRowDel(true)
  }

  const closeDeleteRowDialog = () => {
    setOpenRowDel(false)
  }

  const openDeleteRowsDialog = () => {
    if (selected.ids.length == 0 || selected.ids[0] == '') {
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

  const deleteRow = async () => {
    try {
      closeDeleteRowDialog()
      delMutation.mutateAsync(selected.id)
    } catch (err) {
      console.log(err)
    }
  }

  const selectMultipleRows = (ids: GridSelectionModel) => {
    const idsToStr = ids.map((id) => id.toString())
    setSelected({ ...selected, ids: idsToStr })
  }

  const deleteRows = async () => {
    try {
      closeDeleteRowsDialog()
      await Promise.all(selected.ids.map((id) => delMutation.mutateAsync(id)))
      AlertStore.show(t('alerts.delete-rows.success'), 'success')
      setSelected({ ...selected, ids: [] })
      router.push(routes.dashboard.index)
    } catch (err) {
      AlertStore.show(t('alerts.delete-rows.error'), 'error')
    }
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
      renderCell: (p) => (
        <ActionsButtons
          id={p.row.id}
          name={p.row.name}
          loadInfo={loadCountryInfo}
          openDialog={openDeleteRowDialog}
        />
      ),
      width: 150,
      type: 'actions',
    },
  ]

  return (
    <>
      <InfoDialog open={openInfo} closeFn={closeInfoDialog} country={country} />
      <DeleteRowDialog
        open={openRowDel}
        closeFn={closeDeleteRowDialog}
        countryName={selected.name}
        deleteRow={deleteRow}
      />
      <DeleteRowsDialog
        open={openRowsDel}
        closeFn={closeDeleteRowsDialog}
        deleteRows={deleteRows}
      />
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
