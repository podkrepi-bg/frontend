import React, { useState } from 'react'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import GridAppbar from './grid/GridAppbar'
import BootcampGrid from './grid/BootcampGrid'
import { useTranslation } from 'next-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { endpoints } from 'service/apiEndpoints'
import { AlertStore } from 'stores/AlertStore'
import { deleteTasks, useDeleteMany } from 'service/bootcamp'
import { AxiosError, AxiosResponse } from 'axios'
import DeleteModal from './DeleteModal'
import { ApiErrors } from 'service/apiErrors'
import { Divider } from '@mui/material'
import { BootcampResponse } from 'gql/bootcamp'

export default function BootcampPage() {
  const { t } = useTranslation()
  const [selectedIds, setSelectedIds] = useState([])
  const [openCloseDeleteAll, setDeleteAll] = useState(false)
  const closeModal = () => setDeleteAll(false)
  const openModal = () => setDeleteAll(true)
  const queryClient = useQueryClient()

  const mutationFn = deleteTasks
  const mutation = useMutation<AxiosResponse<BootcampResponse>, AxiosError<ApiErrors>, []>({
    mutationFn,
    onError: () => AlertStore.show(t('bootcamp:alerts.delete-row.error'), 'error'),
    onSuccess: () => {
      closeModal()
      AlertStore.show(t('bootcamp:alerts.delete-row.success'), 'success')
      queryClient.invalidateQueries(endpoints.bootcamp.deleteTasks.url)
    },
  })

  const deleteManyTasks = async () => {
    try {
      await mutation.mutateAsync(selectedIds as [])
    } catch (error) {
      AlertStore.show(t('common:alert.error'), 'error')
    }
  }

  return (
    <AdminLayout>
      <AdminContainer title={'Задачи'}>
        <GridAppbar selectedIds={selectedIds} openModal={openModal} />
        <DeleteModal
          open={openCloseDeleteAll}
          confirmHandler={deleteManyTasks}
          closeModal={closeModal}
        />
        <Divider />
        <BootcampGrid setIds={setSelectedIds} />
      </AdminContainer>
    </AdminLayout>
  )
}
