import React from 'react'
import Link from 'next/link'
import { DataGrid, GridColumns, GridSelectionModel } from '@mui/x-data-grid'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import { useCountriesList } from 'common/hooks/countries'
import { routes } from 'common/routes'
import { CountryResponse } from 'gql/countries'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { useDeleteCountry, getCountry } from 'service/restRequests'

import InfoDialog from './InfoDialog'
import DeleteRowDialog from './DeleteRowDialog'
import DeleteRowsDialog from './DeleteRowsDialog'
import ActionsButtons from './ActionButtons'

const useStyles = makeStyles({
  gridWrapper: {
    margin: '0 auto',
  },
  grid: {
    marginBottom: 15,
    border: 'none',
    '& .MuiDataGrid-virtualScroller': {
      overflow: 'hidden',
    },
    '& .MuiDataGrid-footerContainer': {
      marginTop: '30px',
      marginRight: '40px',
    },
    fontFamily: 'Lato',
    fontSize: '12px',
  },
  gridColumn: {
    '& .MuiDataGrid-columnHeaderTitle': {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: '700',
    },
  },
  gridBtn: {
    background: '#FFFFFF',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
    borderRadius: '50%',
    marginRight: '8px',
    padding: '4px',
  },
  gridAddBtn: {
    background: '#4AC3FF',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
    borderRadius: '50%',
    padding: '8px',
  },
  gridTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 10px 5px 23px',
    height: '80px',
  },
  gridDescription: {
    fontFamily: 'Lato',
    fontSize: '12px',
    color: '#666',
    alignSelf: 'flex-start',
  },
  gridMainActionsBtns: {
    alignSelf: 'flex-end',
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
  const [pageSize, setPageSize] = React.useState<number>(10)

  const { data } = useCountriesList()
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('countries')

  const infoMutation = useMutation<AxiosResponse<CountryResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: getCountry,
    onError: () => AlertStore.show(t('alerts.load.error'), 'error'),
    onSuccess: ({ data }) => {
      setCountry(data)
      setOpenInfo(true)
    },
  })

  const delMutation = useMutation<AxiosResponse<CountryResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteCountry(),
    onError: () => AlertStore.show(t('alerts.delete-row.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('alerts.delete-row.success'), 'success')
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
      await delMutation.mutateAsync(selected.id)
      router.push(routes.admin.countries.index)
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
      router.push(routes.admin.countries.index)
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
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'countryCode',
      headerName: t('fields.country-code'),
      valueGetter: (p) => p.row.countryCode,
      headerClassName: classes.gridColumn,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: t('fields.action'),
      headerAlign: 'left',
      renderCell: (p) => (
        <ActionsButtons
          id={p.row.id}
          name={p.row.name}
          loadInfo={loadCountryInfo}
          openDialog={openDeleteRowDialog}
        />
      ),
      width: 120,
      type: 'actions',
      headerClassName: classes.gridColumn,
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
        itemsCount={selected.ids.length}
      />
      <div className={classes.gridWrapper}>
        <div className={classes.gridTitleWrapper}>
          <Typography variant="body2" className={classes.gridDescription}>
            {t('description')}
          </Typography>
          <section className={classes.gridMainActionsBtns}>
            <Tooltip title={t('tooltips.delete') || ''}>
              <IconButton onClick={openDeleteRowsDialog} className={classes.gridBtn}>
                <DeleteIcon
                  sx={{
                    fontSize: '1.4rem',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Link href={routes.admin.countries.create} passHref>
              <Tooltip title={t('tooltips.add') || ''}>
                <IconButton className={classes.gridAddBtn}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </section>
        </div>

        <DataGrid
          className={classes.grid}
          rows={data || []}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10]}
          pagination
          autoHeight
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectMultipleRows}
        />
      </div>
    </>
  )
}
