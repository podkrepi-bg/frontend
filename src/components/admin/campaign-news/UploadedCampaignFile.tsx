import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import FilePresentIcon from '@mui/icons-material/FilePresent'
import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'

import { AlertStore } from 'stores/AlertStore'
import { useSession } from 'next-auth/react'
import { Delete } from '@mui/icons-material'
import { CampaignNewsFile } from 'gql/campaign-news'
import { deleteCampaignNewsFile, downloadCampaignNewsFile } from 'service/campaign-news'

type Props = {
  articleId: string
  file: CampaignNewsFile
}

export default function UploadedCampaignFile({ file, articleId }: Props) {
  const { t } = useTranslation('campaigns')
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const mutation = useMutation<AxiosResponse<CampaignNewsFile>, AxiosError<ApiErrors>>({
    mutationFn: deleteCampaignNewsFile(file.id),
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('alerts.deletedFile'), 'success')
      queryClient.invalidateQueries([endpoints.campaignNews.viewNewsArticleById(articleId).url])
    },
  })
  const downloadFileHandler = async () => {
    downloadCampaignNewsFile(file.id, session)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${file.filename}`)
        link.click()
      })
      .catch((error) => console.log(error))
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
      <ListItemText primary={file.role} sx={{ textAlign: 'right', pr: 'inherit' }} />
      <></>
      <Tooltip title={'download'}>
        <Button onClick={downloadFileHandler}>{t('cta.download')}</Button>
      </Tooltip>
      <IconButton edge="end" aria-label="delete" onClick={deleteFileHandler}>
        <Delete />
      </IconButton>
    </ListItem>
  )
}
