import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { BenefactorResponse } from 'gql/benefactor'
import { ApiErrors } from 'common/api-errors'
import { endpoints } from 'common/api-endpoints'
import { deleteBenefactor } from 'common/rest'
import { ModalStore } from 'stores/ModalStore'
import { AlertStore } from 'stores/AlertStore'

type Props = {
  id: string
}

export default observer(function DeleteModal({ id }: Props) {
  const queryClient = useQueryClient()
  const { isDeleteOpen, hideDelete } = ModalStore
  const { t } = useTranslation()

  const mutationFn = deleteBenefactor

  const deleteMutation = useMutation<
    AxiosResponse<BenefactorResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('benefactor:alerts:error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('benefactor:alerts:delete'), 'success')
      queryClient.invalidateQueries(endpoints.benefactor.benefactorList.url)
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(id)
  }

  return (
    <Dialog open={isDeleteOpen} onClose={hideDelete} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('benefactor:deleteTitle')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('benefactor:deleteContent')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              {t('benefactor:cta:delete')}
            </Button>
            <Button onClick={hideDelete}>{t('benefactor:cta:cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
