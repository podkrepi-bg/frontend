import React from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { BeneficiaryListResponse } from 'gql/beneficiary'
import { ApiErrors } from 'service/apiErrors'
import { useRemoveBeneficiary } from 'service/beneficiary'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteDialog from 'components/admin/DeleteDialog'

import { ModalStore } from '../BeneficiaryPage'
import { endpoints } from 'service/apiEndpoints'

export default observer(function DeleteModal() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation()

  const mutationFn = useRemoveBeneficiary()

  const deleteMutation = useMutation<
    AxiosResponse<BeneficiaryListResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('common:alerts:error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('common:alerts:success-deleted'), 'success')
      queryClient.invalidateQueries([endpoints.beneficiary.listBeneficiary.url])
      router.push(routes.admin.beneficiary.index)
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={ModalStore} deleteHandler={deleteHandler} />
})
