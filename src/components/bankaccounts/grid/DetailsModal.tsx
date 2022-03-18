import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { BankAccountResponse } from 'gql/bankaccounts'
import { useViewBankAccount } from 'common/hooks/bankaccounts'
import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../BankAccountsPage'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<BankAccountResponse> = useViewBankAccount(selectedRecord.id)
  const { t } = useTranslation('bankaccounts')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('status'), value: `${data?.status}` },
    { name: t('ibanNumber'), value: `${data?.ibanNumber}` },
    { name: t('accountHolder'), value: `${data?.accountHolderName}` },
    { name: t('AccountHolderType'), value: `${data?.accountHolderType}` },
    { name: t('bankName'), value: `${data?.bankName}` },
    { name: t('bankIdCode'), value: `${data?.bankIdCode}` },
    { name: t('fingerprint'), value: `${data?.fingerprint}` },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
