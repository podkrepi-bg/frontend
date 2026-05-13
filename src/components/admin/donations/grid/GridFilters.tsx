import { Box, TextField } from '@mui/material'
import Filter from './Filter'
import { useStores } from '../../../../common/hooks/useStores'
import { observer } from 'mobx-react'
import { PaymentStatus, PaymentProvider } from 'gql/donations.enums'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { useTranslation } from 'next-i18next'
import { bg, enUS } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { fromMoney, toMoney } from 'common/util/money'
import { useEffect, useState } from 'react'

export default observer(function GridFilters() {
  const { donationStore } = useStores()
  const { t, i18n } = useTranslation()
  const [isClient, setIsClient] = useState(false)

  // Ensure this only renders on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])
  const donationStatusOptions = {
    name: 'status',
    label: 'donations:cta.status',
  }

  const donationStatusMenuItems = Object.values(PaymentStatus)

  const paymentProviderOptions = {
    name: 'paymentProvider',
    label: 'donations:cta.provider',
  }

  const paymentProviderMenuItems = Object.values(PaymentProvider)

  const handleChange = (
    filterName: string,
    filterValue: string | number | null | { from: Date; to: Date },
  ) => {
    donationStore.setDonationFilters(filterName, filterValue)
  }

  const handleDatePick = (
    date: Date | null | undefined | 'Invalid Date',
    column: 'from' | 'to',
  ) => {
    if ((!!date && date?.toString() !== 'Invalid Date') || date === null) {
      donationStore.setDonationFilters('date', {
        ...donationStore.donationFilters.date,
        [column]: date || '',
      })
    }
  }

  // Get the current locale with fallback to enUS
  const currentLocale = i18n?.language === 'bg' ? bg : enUS

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {isClient && (
        <LocalizationProvider adapterLocale={currentLocale} dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label={t('donations:cta.from')}
            value={donationStore.donationFilters.date?.from || null}
            onChange={(date: Date | null | 'Invalid Date') => handleDatePick(date, 'from')}
            slotProps={{ textField: { size: 'small', sx: { marginRight: 1 } } }}
            maxDate={donationStore.donationFilters.date?.to}
          />
          <DateTimePicker
            label={t('donations:cta.to')}
            value={donationStore.donationFilters.date?.to || null}
            onChange={(date: Date | null | 'Invalid Date') => handleDatePick(date, 'to')}
            slotProps={{ textField: { size: 'small', sx: { marginRight: 1 } } }}
            minDate={donationStore.donationFilters.date?.from}
          />
        </LocalizationProvider>
      )}
      <TextField
        label={t('donations:cta.minAmount')}
        type="number"
        value={fromMoney(donationStore.donationFilters.minAmount) || null}
        onChange={(event) => {
          handleChange('minAmount', event.target.value ? toMoney(Number(event.target.value)) : null)
        }}
        variant="outlined"
        size="small"
      />
      <TextField
        label={t('donations:cta.maxAmount')}
        type="number"
        value={fromMoney(donationStore.donationFilters.maxAmount) || null}
        onChange={(event) => {
          handleChange('maxAmount', event.target.value ? toMoney(Number(event.target.value)) : null)
        }}
        variant="outlined"
        size="small"
      />
      <Filter
        value={donationStore.donationFilters.status}
        options={donationStatusOptions}
        onChange={handleChange}
        menuItems={donationStatusMenuItems}
      />
      <Filter
        value={donationStore.donationFilters.paymentProvider}
        options={paymentProviderOptions}
        onChange={handleChange}
        menuItems={paymentProviderMenuItems}
      />
      <Filter
        value={donationStore.donationFilters.sortBy}
        options={{ name: 'sortBy', label: 'donations:cta.sortBy' }}
        onChange={handleChange}
        menuItems={['createdAt', 'amount']}
      />
    </Box>
  )
})
