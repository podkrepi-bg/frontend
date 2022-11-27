import React from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { DocumentResponse } from 'gql/document'
import { useDocument } from 'common/hooks/documents'
import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../DocumentsPage'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<DocumentResponse> = useDocument(selectedRecord.id)
  const { t } = useTranslation('documents')

  const SourceUrl = () => (
    <a target="_blank" href={data?.sourceUrl} rel="noreferrer">
      {data?.sourceUrl}
    </a>
  )

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('type'), value: `${data?.type}` },
    { name: t('name'), value: `${data?.name}` },
    { name: t('filename'), value: `${data?.filename}` },
    { name: t('filetype'), value: `${data?.filetype}` },
    { name: t('description'), value: `${data?.description}` },
    { name: t('sourceUrl'), value: <SourceUrl /> },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
