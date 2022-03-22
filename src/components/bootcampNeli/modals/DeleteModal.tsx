import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useDeleteBootcampNeli } from 'service/restRequests/bootcampNeli'

import { AlertStore } from 'stores/AlertStore'
import { ModalStore } from 'stores/bootcampNeli/ModalStore'

import { BootcampNeliResponse } from 'gql/bootcampNeli'

type Props = {
  id: string
}

export default observer(function DeleteModal({ id }: Props) {
  const queryClient = useQueryClient()
  const { isDeleteOpen, hideDelete } = ModalStore
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<BootcampNeliResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteBootcampNeli(id),
    onError: () => AlertStore.show(t('bootcampNeli:alerts:error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('bootcampNeli:alerts:delete'), 'success')
      queryClient.invalidateQueries(endpoints.bootcampNeli.listBootcampNeli.url)
    },
  })

  function deleteHandler() {
    mutation.mutate(id)
  }

  return (
    <Dialog open={isDeleteOpen} onClose={hideDelete} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('bootcampNeli:deleteTitle')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('bootcampNeli:deleteContent')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              {t('bootcampNeli:cta:delete')}
            </Button>
            <Button onClick={hideDelete}>{t('bootcampNeli:cta:cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
