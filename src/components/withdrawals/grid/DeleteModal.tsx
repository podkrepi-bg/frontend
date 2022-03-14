import React, { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'

import { WithdrawalResponse } from 'gql/withdrawals'
import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useDeleteWithdrawal } from 'service/withdrawal'
import { ModalStore } from 'stores/documents/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'

type Props = {
  id: string
  setSelectedId: Dispatch<SetStateAction<string>>
}

export default observer(function DeleteModal({ id, setSelectedId }: Props) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { isDeleteOpen, hideDelete } = ModalStore
  const { t } = useTranslation()

  const mutationFn = useDeleteWithdrawal(id)

  const deleteMutation = useMutation<
    AxiosResponse<WithdrawalResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('withdrawals:alerts:error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show('Тегленето беше преместено в кошчето!', 'warning')
      queryClient.removeQueries(endpoints.withdrawals.getWithdrawal(id).url)
      setSelectedId('')
      router.push(routes.admin.withdrawals.index)
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
            {t('withdrawals:deleteTitle')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('withdrawals:deleteContent')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteHandler}>
              {t('withdrawals:cta:delete')}
            </Button>
            <Button onClick={hideDelete}>{t('withdrawals:cta:cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
