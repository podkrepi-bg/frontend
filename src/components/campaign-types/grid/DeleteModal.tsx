import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { BeneficiaryType } from 'gql/beneficiary'
import { ApiErrors } from 'service/apiErrors'
import { routes } from 'common/routes'
import { useRemoveCampaignType } from 'service/restRequests/campaignTypes'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'

import DeleteDialog from 'components/admin/DeleteDialog'

export default observer(function DeleteModal() {
  const router = useRouter()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation('documents')

  const mutationFn = useRemoveCampaignType()

  const deleteMutation = useMutation<AxiosResponse<BeneficiaryType>, AxiosError<ApiErrors>, string>(
    {
      mutationFn,
      onError: () => AlertStore.show(t('alerts.error'), 'error'),
      onSuccess: () => {
        hideDelete()
        AlertStore.show(t('alerts.delete'), 'success')
        router.push(routes.admin.campaignTypes.index)
      },
    },
  )

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog deleteHandler={deleteHandler} />
})
