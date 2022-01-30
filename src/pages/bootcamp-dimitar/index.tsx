import * as React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useBootcampDimitarList } from '../../common/hooks/bootcampDimitar'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { deleteBootcampDimitar } from '../../common/rest'
import { useMutation } from 'react-query'
import { AlertStore } from 'stores/AlertStore'
import { useRouter } from 'next/router'
import CustomLayout from './layout'
import EditIcon from '@mui/icons-material/Edit'
import Link from 'next/link'
import { IconButton } from '@mui/material'
import PageviewIcon from '@mui/icons-material/Pageview'
import DeleteIcon from '@mui/icons-material/Delete'

function BootcampDimitarList() {
  const { data = [] } = useBootcampDimitarList()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: deleteBootcampDimitar,
    onSuccess: () => AlertStore.show('Success', 'success'),
  })

  const deleteHandler = (row: any) => {
    mutation.mutateAsync(row.id)
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
        console.log(cellValues)
        return (
          <>
            <Link href={`/bootcamp-dimitar/${cellValues.row.id}`}>
              <IconButton size="small" sx={{ mr: 1 }}>
                <PageviewIcon />
              </IconButton>
            </Link>
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
    </CustomLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
  },
})

export default BootcampDimitarList
