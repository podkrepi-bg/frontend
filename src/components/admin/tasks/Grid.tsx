import { DataGrid } from '@mui/x-data-grid'
import { GridColumns } from '@mui/x-data-grid'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { ModalContext } from 'context/ModalContext'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios'
import AlertDialog from './ConfirmationDialog'
import SkeletonLoading from './SkeletonLoading'
export default function TasksGrid() {
  const { setOpen, setCarId, search, setSearchLoading, searchLoading }: any =
    useContext(ModalContext)

  const [open, setOpenAlertModal] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [id, setId] = useState('')
  useEffect(() => {
    const submitSearch = async () => {
      if (search === '') return
      setSearchLoading(true)
      const result = await axios.post(`http://localhost:5010/api/car/search`, {
        searchTerm: search,
      })
      setSearchData(result.data)
      setSearchLoading(false)
    }
    submitSearch()
  }, [search])
  console.log(search)
  const handleClickOpen = () => {
    setOpenAlertModal(true)
  }

  const handleClose = () => {
    setOpenAlertModal(false)
  }
  const router = useRouter()
  const commonCellStyles: any = {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'id', hide: true },
    {
      field: 'type',
      headerName: 'вид',
      width: 60,
      headerAlign: 'center',
      renderCell: (cellValues) => {
        return <div style={commonCellStyles}>Кола</div>
        /*           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <SkeletonLoading />
          </div> */
      },
    },
    {
      field: 'brand',
      headerName: 'марка',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return <div style={commonCellStyles}>{cellValues.value}</div>
        /*           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <SkeletonLoading />
          </div> */
      },
    },
    {
      field: 'model',
      headerName: 'модел',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return <div style={commonCellStyles}>{cellValues.value}</div>
        /*           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <SkeletonLoading />
          </div> */
      },
    },
    {
      field: 'year',
      headerName: 'година',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return <div style={commonCellStyles}>{cellValues.value}</div>
        /*           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <SkeletonLoading />
          </div> */
      },
    },

    {
      field: 'engine',
      headerName: 'двигател',
      headerAlign: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return <div style={commonCellStyles}>{cellValues.value}</div>
        /*           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <SkeletonLoading />
          </div> */
      },
    },
    {
      field: 'price',
      headerName: 'цена',
      width: 150,
      headerAlign: 'center',
      renderCell: (cellValues) => {
        return <div style={commonCellStyles}>{cellValues.value}</div>

        /*           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <SkeletonLoading />
          </div> */
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
  const { data }: any = useQuery('cars', async () => {
    return await axios.get(`http://localhost:5010/api/car`)
  })

  return (
    <>
      <AlertDialog open={open} handleClose={handleClose} id={id}></AlertDialog>
      <DataGrid
        style={{
          marginTop: '2px',
          background: 'white',
          height: 'calc(100vh - 500px)',
          border: 'none',
          padding: '10px 50px',
        }}
        rows={
          search !== ''
            ? searchData
            : data?.data || [
                {
                  id: '1',
                  brand: 'Audi',
                  model: 'A3',
                  year: 2015,
                  engine: 'Petrol',
                  price: '25000',
                },
              ]
        }
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        disableSelectionOnClick
        onRowClick={() => {}}
      />
    </>
  )
}
