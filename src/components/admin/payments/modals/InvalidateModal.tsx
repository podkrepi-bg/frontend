import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { DonationResponse } from 'gql/donations'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteDialog from 'components/admin/DeleteDialog'
import { useInvalidateStripeDonation } from 'service/donation'

import { InvalidateStore } from '../PaymentsPage'

type Props = {
  onUpdate: () => void
}

export default observer(function InvalidateModal({ onUpdate }: Props) {
  const router = useRouter()
  const { hideDelete, selectedRecord } = InvalidateStore
  const { t } = useTranslation()

  const mutationFn = useInvalidateStripeDonation()

  const invalidateMutation = useMutation<
    AxiosResponse<DonationResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('donations:alerts:error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('donations:alerts:invalidate'), 'success')
      router.push(routes.admin.donations.index)
      onUpdate()
    },
  })

  function invalidateHandler() {
    invalidateMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={InvalidateStore} deleteHandler={invalidateHandler} />
})
