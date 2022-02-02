import {
  GridColumns,
  DataGrid,
  GridRenderCellParams,
  GridColDef,
  GridRowId,
  GridSelectionModel,
} from '@mui/x-data-grid'
import CSS from 'csstype'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AlertDialog from './ConfirmationDialog'
import { useRouter } from 'next/router'
import { useCarList } from 'common/hooks/cars'
import { CarResponse } from 'gql/cars'
import { UseQueryResult } from 'react-query'
import { ModalStore } from 'stores/cars/ModalStore'
import { observer } from 'mobx-react'
export default observer(function TasksGrid() {
  const router = useRouter()
  const [multipleDelete, setMupltipleDelete] = useState<GridRowId[]>([])
  const [id, setId] = useState<GridRowId>('')

  const handleClickOpen = () => {
    ModalStore.openCfrm()
  }

  const handleClose = () => {
    ModalStore.closeCfrm()
  }
  const commonCellStyles: CSS.Properties = {
    fontWeight: 'bold',
  }

  const renderCell = (cellValues: GridRenderCellParams): React.ReactNode => {
    return <div style={commonCellStyles}>{cellValues.value}</div>
  }
  const commonProps: Partial<GridColDef> = {
    align: 'center',
    width: 150,
    headerAlign: 'center',
    renderCell,
  }
  const columns: GridColumns = [
    {
      field: 'type',
      headerName: 'вид',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: () => {
        return <div style={commonCellStyles}>Кола</div>
      },
    },
    { ...commonProps, headerName: 'марка', field: 'brand' },
    { ...commonProps, headerName: 'модел', field: 'model' },
    { ...commonProps, headerName: 'година', field: 'year' },
    { ...commonProps, headerName: 'двигател', field: 'engine' },
    { ...commonProps, headerName: 'цена', field: 'price' },
    {
      field: 'others',
      headerName: 'редактиране',
      headerAlign: 'center',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
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
                  ModalStore.setCarId(params.id)
                  ModalStore.openModal()
                }}
              />
            }
            {
              <EditIcon
                sx={{ cursor: 'pointer' }}
                color="action"
                onClick={() => {
                  router.push(`/tasks/edit/${params.id}`)
                }}
              />
            }
            {
              <DeleteIcon
                sx={{ cursor: 'pointer', opacity: 0.9 }}
                color="error"
                onClick={() => {
                  handleClickOpen()
                  setId(params.id)
                }}
              />
            }
          </div>
        )
      },
    },
  ]
  const { data }: UseQueryResult<CarResponse[]> = useCarList()
  return (
    <>
      <AlertDialog
        open={ModalStore.cfrmOpen}
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
        rows={
          data || [
            {
              brand: 'Audi',
              model: 'A3',
              year: 2015,
              engine: 'petrol',
              price: 20111,
              id: '22232 ',
            },
          ]
        }
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        disableSelectionOnClick
        checkboxSelection
        onSelectionModelChange={(selectionModel: GridSelectionModel) => {
          setMupltipleDelete(selectionModel)
          if (selectionModel.length > 0) {
            ModalStore.csPositive()
          } else {
            ModalStore.csNegative()
          }
        }}
      />
    </>
  )
})
