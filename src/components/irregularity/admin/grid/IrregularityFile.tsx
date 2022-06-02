import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import FilePresentIcon from '@mui/icons-material/FilePresent'
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { deleteIrregularityFile } from 'service/irregularity'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { IrregularityFileResponse } from 'components/irregularity/helpers/irregularity.types'

type Props = {
  irregularityId: string
  file: IrregularityFileResponse
}

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

export default function IrregularityFile({ file, irregularityId }: Props) {
  const { t } = useTranslation('irregularity')
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation<AxiosResponse<IrregularityFileResponse>, AxiosError<ApiErrors>>({
    mutationFn: deleteIrregularityFile(file.id),
    onError: () => AlertStore.show(t('admin.alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('admin.alerts.delete-file'), 'success')
      queryClient.invalidateQueries(endpoints.irregularity.viewIrregularity(irregularityId).url)
      router.push(routes.admin.irregularity.index)
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
        <a href={API_URL + `/irregularity-file/${file.id}`}>{t('admin.cta.download')}</a>
      </Button>
      <Button onClick={deleteFileHandler}>{t('admin.cta.delete')}</Button>
    </ListItem>
  )
}
