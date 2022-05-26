import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import FilePresentIcon from '@mui/icons-material/FilePresent'
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { deleteCampaignReportFile } from 'service/campaignReport'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { CampaignReportFile } from 'components/irregularity-report/helpers/report.types'

type Props = {
  reportId: string
  file: CampaignReportFile
}

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

export default function ReportFile({ file, reportId }: Props) {
  const { t } = useTranslation('irregularity-report')
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation<AxiosResponse<CampaignReportFile>, AxiosError<ApiErrors>>({
    mutationFn: deleteCampaignReportFile(file.id),
    onError: () => AlertStore.show(t('admin.alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('admin.alerts.delete-file'), 'success')
      queryClient.invalidateQueries(endpoints.campaignReport.viewCampaignReport(reportId).url)
      router.push(routes.admin.campaignReport.index)
    },
  })

  const deleteFileHandler = () => {
    mutation.mutate()
  }

  return (
    <ListItem key={file.id}>
      <ListItemAvatar>
        <Avatar>
          <FilePresentIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={file.filename} />
      <Button>
        {/* TODO: to be discussed */}
        <a href={API_URL + `/report-file/${file.id}`}>{t('admin.cta.download')}</a>
      </Button>
      <Button onClick={deleteFileHandler}>{t('admin.cta.delete')}</Button>
    </ListItem>
  )
}
