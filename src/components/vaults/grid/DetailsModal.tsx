import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { DocumentResponse } from 'gql/document'
import { useDocument } from 'common/hooks/documents'
import { ModalStore } from 'stores/documents/ModalStore'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { data }: UseQueryResult<DocumentResponse> = useDocument(id)
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            {t('documents:cta:details')}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('documents:type')}: {data?.type}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('documents:name')}: {data?.name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('documents:filename')}: {data?.filename}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('documents:filetype')}: {data?.filetype}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('documents:description')}: {data?.description}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('documents:sourceUrl')}:{' '}
            {
              <a target="_blank" href={data?.sourceUrl} rel="noreferrer">
                Link
              </a>
            }
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
})
