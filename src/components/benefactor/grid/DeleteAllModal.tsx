import React from 'react'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

import { BenefactorResponse } from 'gql/benefactor'
import { ApiErrors } from 'service/apiErrors'
import { ModalStore } from 'stores/ModalStore'
import { deleteBenefactor } from 'service/restRequests'
import { AlertStore } from 'stores/AlertStore'

type Props = {
  selectionModel: GridSelectionModel
}

export default observer(function DeleteAllModal({ selectionModel }: Props) {
  const { isDeleteAllOpen, hideDeleteAll } = ModalStore

  const { t } = useTranslation('benefactor')

  const router = useRouter()

  const delMutation = useMutation<AxiosResponse<BenefactorResponse>, AxiosError<ApiErrors>, string>(
    {
      mutationFn: deleteBenefactor,
      onError: () => AlertStore.show(t('alerts.delete-row.error'), 'error'),
      onSuccess: () => {
        return
      },
    },
  )

  const idsToDelete = selectionModel.map((x) => x.toString())

  const deleteRows = async () => {
    try {
      await Promise.all(idsToDelete.map((id) => delMutation.mutateAsync(id)))
      AlertStore.show(t('alerts.deleteAll'), 'success')
      hideDeleteAll()
      router.push(routes.benefactor.index)
    } catch (err) {
      AlertStore.show(t('alerts.error'), 'error')
    }
  }

  return (
    <Dialog open={isDeleteAllOpen} onClose={hideDeleteAll} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('deleteTitle')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('deleteAllContent')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteRows}>
              {t('cta.delete')}
            </Button>
            <Button onClick={hideDeleteAll}>{t('benefactor:cta:cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
