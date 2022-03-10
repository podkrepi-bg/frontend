import React from 'react'
import Link from 'next/link'
import { DataGrid, GridColumns, GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import { useCountriesList } from 'common/hooks/countries'
import { routes } from 'common/routes'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'

import GridActions from '../../admin/GridActions'
import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'

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

export default observer(function CountryGrid() {
  const { showDeleteAll, setSelectedIdsToDelete, selectedIdsToDelete } = ModalStore
  const [pageSize, setPageSize] = React.useState<number>(10)

  const { data } = useCountriesList()

  const { t } = useTranslation('countries')
  const classes = useStyles()

  const deleteAllClickHandler = () => {
    selectedIdsToDelete.length > 0
      ? showDeleteAll()
      : AlertStore.show(t('common:alerts.noselected'), 'warning')
  }

  const selectMultipleRows = (ids: GridSelectionModel) => {
    const idsToStr = ids.map((id) => id.toString())
    setSelectedIdsToDelete(idsToStr)
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
        <GridActions
          id={p.row.id}
          name={p.row.name}
          editLink={routes.admin.countries.view(p.row.id)}
        />
      ),
      width: 120,
      type: 'actions',
      headerClassName: classes.gridColumn,
    },
  ]

  return (
    <>
      <DetailsModal />
      <DeleteModal />
      <DeleteAllModal />
      <div className={classes.gridWrapper}>
        <div className={classes.gridTitleWrapper}>
          <Typography variant="body2" className={classes.gridDescription}>
            {t('description')}
          </Typography>
          <section className={classes.gridMainActionsBtns}>
            <Tooltip title={t('tooltips.delete') || ''}>
              <IconButton onClick={deleteAllClickHandler} className={classes.gridBtn}>
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
})
