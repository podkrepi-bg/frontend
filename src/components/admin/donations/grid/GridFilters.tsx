import { Box, TextField } from '@mui/material'
import Filter from './Filter'
import { useStores } from '../../../../common/hooks/useStores'
import { observer } from 'mobx-react'
import { DonationStatus, PaymentProvider } from 'gql/donations.enums'
import { DateTimePicker, enUS, LocalizationProvider } from '@mui/x-date-pickers'
import { useTranslation } from 'react-i18next'
import { bg } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { fromMoney, toMoney } from 'common/util/money'

export default observer(function GridFilters() {
  const { donationStore } = useStores()
  const { t, i18n } = useTranslation()
  const donationStatusOptions = {
    name: 'status',
    label: 'donations:cta.status',
  }

  const donationStatusMenuItems = Object.values(DonationStatus)

  const paymentProviderOptions = {
    name: 'paymentProvider',
    label: 'donations:cta.provider',
  }

  const paymentProviderMenuItems = Object.values(PaymentProvider)

  const handleChange = (
    filterName: string,
    filterValue: string | number | null | { from: Date; to: Date },
  ) => {
    console.log('Setting filter:', filterName, filterValue)
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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <LocalizationProvider
        adapterLocale={i18n.language === 'bg' ? bg : enUS}
        dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label={t('donations:cta.from')}
          value={donationStore.donationFilters.date?.from || null}
          onChange={(date: Date | null | 'Invalid Date') => handleDatePick(date, 'from')}
          renderInput={(params) => <TextField size="small" sx={{ marginRight: 1 }} {...params} />}
          maxDate={donationStore.donationFilters.date?.to}
        />
        <DateTimePicker
          label={t('donations:cta.to')}
          value={donationStore.donationFilters.date?.to || null}
          onChange={(date: Date | null | 'Invalid Date') => handleDatePick(date, 'to')}
          renderInput={(params) => <TextField size="small" sx={{ marginRight: 1 }} {...params} />}
          minDate={donationStore.donationFilters.date?.from}
        />
      </LocalizationProvider>
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
        value={donationStore.donationFilters.provider}
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
