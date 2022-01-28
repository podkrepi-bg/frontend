import { DataGrid } from '@mui/x-data-grid'
import { GridColumns } from '@mui/x-data-grid'
import StarIcon from '@mui/icons-material/Star'
import CircleIcon from '@mui/icons-material/Circle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { useCarsList } from 'common/hooks/useCarsList'
import { QueryClient } from 'react-query'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
export default function TasksGrid({ value }: any) {
  const { carData, setData }: any = useContext(ModalContext)
  const deleteCar = (id: any) => {
    return axios.delete(`http://localhost:5010/api/car/${id}`)
  }
  const queryClient = useQueryClient()
  const { isLoading, isError, isSuccess, isIdle, mutate } = useMutation(deleteCar, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries('cars', data)
    },
  })

  const types = [
    { icon: <StarIcon color="action" /> },
    { icon: <CircleIcon color="warning" /> },
    { icon: <StarIcon color="info" /> },
    { icon: <CircleIcon color="success" /> },
    { icon: <StarIcon color="error" /> },
  ]
  const random = (arr: any): any => {
    return arr[Math.floor(Math.random() * types.length)].icon
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'type',
      headerName: 'вид',
      width: 60,
      headerAlign: 'center',
      renderCell: () => {
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Кола
          </div>
        )
      },
    },
    {
      field: 'brand',
      headerName: 'марка',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'model',
      headerName: 'модел',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'year',
      headerName: 'година',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
            {cellValues.value}
          </div>
        )
      },
    },

    {
      field: 'engine',
      headerName: 'двигател',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'price',
      headerName: 'цена',
      width: 150,
      headerAlign: 'center',
      renderCell: (cellValues) => {
        return (
          <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
            {cellValues.value}
          </div>
        )
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
              width: '80%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            {
              <EditIcon
                sx={{ cursor: 'pointer' }}
                color="action"
                onClick={() => {
                  console.log(values.id)
                }}
              />
            }
            {
              <DeleteIcon
                sx={{ cursor: 'pointer', opacity: 0.9 }}
                color="error"
                onClick={() => {
                  mutate(values.id)
                }}
              />
            }
          </div>
        )
      },
    },
  ]
  const { data }: any = useQuery('cars', async () => {
    return await axios.get(`http://localhost:5010/api/car`)
  })

  return (
    <DataGrid
      style={{
        marginTop: '2px',
        background: 'white',
        height: 'calc(100vh - 400px)',
        border: 'none',
        padding: '10px 50px',
      }}
      rows={data?.data || []}
      columns={columns}
      pageSize={5}
      autoHeight
      autoPageSize
      checkboxSelection
      disableSelectionOnClick
      onRowClick={() => {
        console.log('clicked')
      }}
    />
  )
}
