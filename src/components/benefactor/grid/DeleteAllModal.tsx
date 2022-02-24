import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Card, CardContent, Box, Button, Typography } from '@mui/material'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

import { BenefactorResponse } from 'gql/benefactor'
import { ApiErrors } from 'common/api-errors'
import { endpoints } from 'common/api-endpoints'
import { deleteManyBenefactors } from 'common/rest'
import { ModalStore } from 'stores/ModalStore'
import { deleteBenefactor, getBenefactor } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'

type Props = {
  selectionModel: GridSelectionModel
}

export default observer(function DeleteAllModal({ selectionModel }: Props) {
  const queryClient = useQueryClient()
  const [openRowsDel, setOpenRowsDel] = React.useState<boolean>(false)
  const [openInfo, setOpenInfo] = React.useState<boolean>(false)
  const [selectedId, setSelectedId] = React.useState<string>('')
  const [multipleSelectedIds, setMultipleSelectedIds] = React.useState<string[]>([])
  const [benefactor, setBenefactor] = React.useState<BenefactorResponse>(initialValues)
  const { isDeleteAllOpen, hideDeleteAll } = ModalStore

  const { t } = useTranslation()

  const initialValues: BenefactorResponse = {
    id: '',
    personId: '',
    extCustomerId: '',
    createdAt: '',
    updatedAt: '',
  }
  const router = useRouter()

  const delMutation = useMutation<AxiosResponse<BenefactorResponse>, AxiosError<ApiErrors>, string>(
    {
      mutationFn: deleteBenefactor,
      onError: () => AlertStore.show(t('benefactor:alerts.delete-row.error'), 'error'),
      onSuccess: () => {
        return
      },
    },
  )

  const idsToDelete = selectionModel.map((x) => x.toString())

  const deleteRows = async () => {
    try {
      await Promise.all(idsToDelete.map((id) => delMutation.mutateAsync(id)))
      AlertStore.show(t('benefactor:alerts.alerts:deleteAll'), 'success')
      hideDeleteAll()
      router.push(routes.benefactor.index)
    } catch (err) {
      AlertStore.show(t('benefactor:alerts:error'), 'error')
    }
  }

  return (
    <Dialog open={isDeleteAllOpen} onClose={hideDeleteAll} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('benefactor:deleteTitle')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('benefactor:deleteAllContent')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={deleteRows}>
              {t('benefactor:cta:delete')}
            </Button>
            <Button onClick={hideDeleteAll}>{t('benefactor:cta:cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
})
