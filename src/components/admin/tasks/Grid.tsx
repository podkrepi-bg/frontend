import { DataGrid } from '@mui/x-data-grid'
import { GridColumns } from '@mui/x-data-grid'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import { useRouter } from 'next/router'
export default function TasksGrid({ value }: any) {
  const { setOpen, setCarId }: any = useContext(ModalContext)
  const router = useRouter()
  const deleteCar = (id: any) => {
    return axios.delete(`http://localhost:5010/api/car/${id}`)
  }
  const queryClient = useQueryClient()
  const { mutate } = useMutation(deleteCar, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries('cars', data)
    },
  })

  const columns: GridColumns = [
    { field: 'id', headerName: 'id', hide: true },
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
                  router.push(`/admin/panel/tasks/edit/${values.id}`)
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
      onRowClick={() => {}}
    />
  )
}
