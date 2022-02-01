import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import { useContext, useState } from 'react'
import { ModalContext } from 'context/ModalContext'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AlertDialog from './ConfirmationDialog'
import { GridColumns, DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { useCarList } from 'common/hooks/cars'

export default function TasksGrid() {
  const { setAreCarsSelected, setConfirmationOpen, confirmationOpen, setCarId, setOpen }: any =
    useContext(ModalContext)
  const router = useRouter()
  const [multipleDelete, setMupltipleDelete] = useState<any>([])
  const [id, setId] = useState('')

  const handleClickOpen = () => {
    setConfirmationOpen(true)
  }

  const handleClose = () => {
    setConfirmationOpen(false)
  }
  const commonCellStyles: any = {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  }
  const displayRow = (cellValues: any) => {
    return <div style={commonCellStyles}>{cellValues.value}</div>
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'id', hide: true },
    {
      field: 'type',
      headerName: 'вид',
      width: 100,
      headerAlign: 'center',
      renderCell: () => {
        return <div style={commonCellStyles}>Кола</div>
      },
    },
    {
      field: 'brand',
      headerName: 'марка',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return displayRow(cellValues)
      },
    },
    {
      field: 'model',
      headerName: 'модел',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return displayRow(cellValues)
      },
    },
    {
      field: 'year',
      headerName: 'година',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return displayRow(cellValues)
      },
    },

    {
      field: 'engine',
      headerName: 'двигател',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return displayRow(cellValues)
      },
    },
    {
      field: 'price',
      headerName: 'цена',
      width: 150,
      headerAlign: 'center',
      renderCell: (cellValues) => {
        return displayRow(cellValues)
      },
    },
    {
      field: 'others',
      headerName: 'редактиране',
      headerAlign: 'center',
      width: 150,
      renderCell: (values: any) => {
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            {
              <PrivacyTipIcon
                sx={{ cursor: 'pointer' }}
                color="info"
                onClick={() => {
                  setCarId(values.id)
                  setOpen(true)
                }}
              />
            }
            {
              <EditIcon
                sx={{ cursor: 'pointer' }}
                color="action"
                onClick={() => {
                  router.push(`/tasks/edit/${values.id}`)
                }}
              />
            }
            {
              <DeleteIcon
                sx={{ cursor: 'pointer', opacity: 0.9 }}
                color="error"
                onClick={() => {
                  handleClickOpen()
                  setId(values.id)
                }}
              />
            }
          </div>
        )
      },
    },
  ]
  const { data } = useCarList()
  return (
    <>
      <AlertDialog
        open={confirmationOpen}
        handleClose={handleClose}
        id={id}
        multipleDeleteItems={multipleDelete}></AlertDialog>
      <DataGrid
        style={{
          marginTop: '2px',
          background: 'white',
          height: 'calc(100vh - 500px)',
          border: 'none',
          padding: '10px 50px',
        }}
        rows={data || []}
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        disableSelectionOnClick
        checkboxSelection
        onSelectionModelChange={(row: any) => {
          setMupltipleDelete(row)
          if (row.length > 0) {
            setAreCarsSelected(true)
          } else {
            setAreCarsSelected(false)
          }
        }}
      />
    </>
  )
}
