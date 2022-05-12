import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { deleteCampaignReport } from 'service/campaignReport'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import DeleteDialog from 'components/admin/DeleteDialog'

import { ModalStore } from '../CampaignReportPage'
import { CampaignReportResponse } from 'components/irregularity-report/helpers/report.types'

export default observer(function DeleteModal() {
  const { t } = useTranslation('irregularity-report')
  const queryClient = useQueryClient()
  const router = useRouter()

  const { hideDelete, selectedRecord } = ModalStore

  const mutation = useMutation<
    AxiosResponse<CampaignReportResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn: deleteCampaignReport(selectedRecord.id),
    onError: () => AlertStore.show(t('admin.alerts.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('admin.alerts.delete'), 'success')
      queryClient.invalidateQueries(endpoints.campaignReport.campaignReportsList.url)
      router.push(routes.admin.campaignReport.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={ModalStore} deleteHandler={deleteHandler} />
})
