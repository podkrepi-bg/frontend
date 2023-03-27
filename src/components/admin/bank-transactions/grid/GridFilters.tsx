import { Box, TextField } from '@mui/material'
import Filter from './Filter'
import { useStores } from '../../../../common/hooks/useStores'
import { observer } from 'mobx-react'

import { DateTimePicker, enUS, LocalizationProvider } from '@mui/x-date-pickers'
import { useTranslation } from 'react-i18next'
import { bg } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { BankDonationStatus, BankTransactionType } from 'gql/bank-transactions.enums'

export default observer(function GridFilters() {
  const { bankTransactionsStore } = useStores()
  const { t, i18n } = useTranslation()
  const bankTransactionStatusOptions = {
    name: 'status',
    label: 'bank-transactions:cta.status',
  }

  const bankTransactionStatusMenuItems = Object.values(BankDonationStatus)

  const bankTransactionTypeOptions = {
    name: 'type',
    label: 'bank-transactions:cta.type',
  }

  const bankTransactionTypeMenuItems = Object.values(BankTransactionType)

  const handleChange = (
    filterName: string,
    filterValue: string | null | { from: Date; to: Date },
  ) => {
    bankTransactionsStore.setBankTransactionFilters(filterName, filterValue)
  }

  const handleDatePick = (
    date: Date | null | undefined | 'Invalid Date',
    column: 'from' | 'to',
  ) => {
    if ((!!date && date?.toString() !== 'Invalid Date') || date === null) {
      bankTransactionsStore.setBankTransactionFilters('date', {
        ...bankTransactionsStore.bankTransactionsFilter.date,
        [column]: date || '',
      })
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <LocalizationProvider
        adapterLocale={i18n.language === 'bg' ? bg : enUS}
        dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label={t('bank-transactions:cta.from')}
          value={bankTransactionsStore.bankTransactionsFilter.date?.from || null}
          onChange={(date: Date | null | 'Invalid Date') => handleDatePick(date, 'from')}
          renderInput={(params) => <TextField size="small" sx={{ marginRight: 1 }} {...params} />}
          maxDate={bankTransactionsStore.bankTransactionsFilter.date?.to}
        />
        <DateTimePicker
          label={t('bank-transactions:cta.to')}
          value={bankTransactionsStore.bankTransactionsFilter.date?.to || null}
          onChange={(date: Date | null | 'Invalid Date') => handleDatePick(date, 'to')}
          renderInput={(params) => <TextField size="small" sx={{ marginRight: 1 }} {...params} />}
          minDate={bankTransactionsStore.bankTransactionsFilter.date?.from}
        />
      </LocalizationProvider>
      <Filter
        value={bankTransactionsStore.bankTransactionsFilter.status}
        options={bankTransactionStatusOptions}
        onChange={handleChange}
        menuItems={bankTransactionStatusMenuItems}
      />
      <Filter
        value={bankTransactionsStore.bankTransactionsFilter.type}
        options={bankTransactionTypeOptions}
        onChange={handleChange}
        menuItems={bankTransactionTypeMenuItems}
      />
    </Box>
  )
})
