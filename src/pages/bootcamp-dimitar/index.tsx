import * as React from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/layout/Layout'
import { useBootcampDimitarList } from '../../common/hooks/bootcampDimitar'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { deleteBootcampDimitar } from '../../common/rest'
import { useMutation } from 'react-query'
import { AlertStore } from 'stores/AlertStore'
import { useRouter } from 'next/router'
import { endpoints } from '../../common/api-endpoints'
import MyAppBar from '../../components/bootcamp-dimitar/appBar'
import CustomDrawer from '../../components/bootcamp-dimitar/CustomDrawer'

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
      field: 'delete',
      headerName: 'Delete',
      valueGetter: () => 'X',
    },
  ]

  return (
    <Layout title={'Bootcamp'}>
      <MyAppBar />
      <h1>Welcome</h1>
      <DataGrid
        rows={data || []}
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        // onRowClick={(p) => DialogStore.show(p)}
        onCellClick={(p) =>
          p.formattedValue === 'X'
            ? deleteHandler(p.row)
            : router.push(endpoints.bootcampDimitar.view(p.row.id).url)
        }
      />
      <CustomDrawer />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
  },
})

export default BootcampDimitarList
