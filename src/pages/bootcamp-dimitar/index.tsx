import * as React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useBootcampDimitarList } from '../../common/hooks/bootcampDimitar'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import CustomLayout from './layout'
import EditIcon from '@mui/icons-material/Edit'
import Link from 'next/link'
import { IconButton } from '@mui/material'
import PageviewIcon from '@mui/icons-material/Pageview'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

function BootcampDimitarList() {
  const { data = [] } = useBootcampDimitarList()
  const [open, setOpen] = React.useState(false)
  const [row, setRow] = React.useState({})
  const handleOpen = (row) => {
    return () => {
      setOpen(true)
      setRow(row)
    }
  }
  const handleClose = () => {
    setOpen(false)
    // setRow({})
  }

  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'ID',
      valueGetter: (p) => p.row.id,
      width: 300,
    },
    {
      field: 'name',
      headerName: 'Name',
      valueGetter: (p) => `${p.row.firstName} ${p.row.lastName}`,
      width: 300,
    },
    {
      field: 'company',
      headerName: 'Company',
      valueGetter: (p) => p.row.company,
      width: 300,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton size="small" sx={{ mr: 1 }} onClick={handleOpen(cellValues.row)}>
              <PageviewIcon />
            </IconButton>
            <Link href={`/bootcamp-dimitar/${cellValues.row.id}/edit`}>
              <IconButton size="small" sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
            </Link>
            <Link href="test">
              <IconButton size="small" sx={{ mr: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Link>
          </>
        )
      },
      width: 500,
    },
  ]

  return (
    <CustomLayout title={'Bootcamp'}>
      {/* <MyAppBar /> */}
      <h1>Welcome</h1>
      <DataGrid
        rows={data || []}
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {row.firstName} {row.lastName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {row.company}
          </Typography>
        </Box>
      </Modal>
    </CustomLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
  },
})

export default BootcampDimitarList
