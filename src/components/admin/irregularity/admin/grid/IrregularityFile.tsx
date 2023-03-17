import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import FilePresentIcon from '@mui/icons-material/FilePresent'
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { deleteIrregularityFile, download } from 'service/irregularity'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { IrregularityFileResponse } from 'components/client/irregularity/helpers/irregularity.types'
import { useSession } from 'next-auth/react'

type Props = {
  irregularityId: string
  file: IrregularityFileResponse
}

export default function IrregularityFile({ file, irregularityId }: Props) {
  const { t } = useTranslation('irregularity')
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: session } = useSession()

  const mutation = useMutation<AxiosResponse<IrregularityFileResponse>, AxiosError<ApiErrors>>({
    mutationFn: deleteIrregularityFile(file.id),
    onError: () => AlertStore.show(t('admin.alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('admin.alerts.delete-file'), 'success')
      queryClient.invalidateQueries([endpoints.irregularity.viewIrregularity(irregularityId).url])
      router.push(routes.admin.irregularity.index)
    },
  })
  const downloadFileHandler = async () => {
    download(file.id, session)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${file.filename}`)
        link.click()
      })
      .catch((error) => console.error(error))
  }

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
      <></>
      <Tooltip title={'download'}>
        <Button onClick={downloadFileHandler}>{t('admin.cta.download')}</Button>
      </Tooltip>
      <Button onClick={deleteFileHandler}>{t('admin.cta.delete')}</Button>
    </ListItem>
  )
}
