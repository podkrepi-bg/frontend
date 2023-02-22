import { Box, TextField } from '@mui/material'
import Filter from './Filter'
import { useStores } from '../../../../common/hooks/useStores'
import { observer } from 'mobx-react'
import { DonationStatus, DonationType } from 'gql/donations.enums'
import { DateTimePicker, enUS, LocalizationProvider } from '@mui/x-date-pickers'
import { useTranslation } from 'react-i18next'
import { bg } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export default observer(function GridFilters() {
  const { donationStore } = useStores()
  const { t, i18n } = useTranslation()
  const donationStatusOptions = {
    name: 'status',
    label: 'donations:cta.status',
  }

  const donationStatusMenuItems = Object.values(DonationStatus)

  const donationTypeOptions = {
    name: 'type',
    label: 'donations:cta.type',
  }

  const donationTypeMenuItems = Object.values(DonationType)

  const handleChange = (
    filterName: string,
    filterValue: string | null | { from: Date; to: Date },
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
      <Filter
        value={donationStore.donationFilters.status}
        options={donationStatusOptions}
        onChange={handleChange}
        menuItems={donationStatusMenuItems}
      />
      <Filter
        value={donationStore.donationFilters.type}
        options={donationTypeOptions}
        onChange={handleChange}
        menuItems={donationTypeMenuItems}
      />
    </Box>
  )
})
