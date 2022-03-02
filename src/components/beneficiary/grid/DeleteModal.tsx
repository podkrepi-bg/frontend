import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { BeneficiaryType } from 'gql/beneficiary'
import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useRemoveBeneficiary } from 'service/beneficiary'
import { ModalStore } from 'stores/documents/ModalStore'
import { AlertStore } from 'stores/AlertStore'

type Props = {
  id: string
}

export default observer(function DeleteModal({ id }: Props) {
  const queryClient = useQueryClient()
  const { isDeleteOpen, hideDelete } = ModalStore
  const { t } = useTranslation()

  const mutationFn = useRemoveBeneficiary()

  const deleteMutation = useMutation<AxiosResponse<BeneficiaryType>, AxiosError<ApiErrors>, string>(
    {
      mutationFn,
      onError: () => AlertStore.show(t('documents:alerts:error'), 'error'),
      onSuccess: () => {
        hideDelete()
        AlertStore.show(t('documents:alerts:delete'), 'success')
        queryClient.invalidateQueries(endpoints.beneficiary.listBeneficiary.url)
      },
    },
  )

  function deleteHandler() {
    deleteMutation.mutate(id)
  }

  return (
    <Dialog open={isDeleteOpen} onClose={hideDelete} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('documents:deleteTitle')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('documents:deleteContent')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              {t('documents:cta:delete')}
            </Button>
            <Button onClick={hideDelete}>{t('documents:cta:cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
