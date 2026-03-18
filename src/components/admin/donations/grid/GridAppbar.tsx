import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Box, Button, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { Receipt, GetApp as DownloadFileIcon } from '@mui/icons-material'

import { routes } from 'common/routes'
import { useMutation } from '@tanstack/react-query'
import { useExportToExcel } from 'service/donation'
import { AlertStore } from 'stores/AlertStore'
import { downloadFile } from '../../../../common/util/downloadFile'
import { useMemo, useState } from 'react'
import { useStores } from 'common/hooks/useStores'
import theme from 'common/theme'
import { debounce } from 'lodash'

const addIconStyles = {
  background: theme.palette.primary.light,
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}

export default function GridAppbar() {
  const router = useRouter()
  const { donationStore } = useStores()
  const { t } = useTranslation()
  const exportToExcel = useMutation({
    mutationFn: useExportToExcel(
      donationStore.donationFilters,
      donationStore.donationSearch,
      donationStore.getCampaignId,
      donationStore.getPaymentId,
    ),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: ({ data }) => {
      downloadFile('Donations.xlsx', data)
      AlertStore.show(t('common:alerts.success'), 'success')
    },
  })
  const [searchValue, setSearchValue] = useState('')

  const debounceSearch = useMemo(
    () =>
      debounce(
        (text: string) => {
          donationStore.setDonationSearch(text)
        },
        300,
        { leading: false, trailing: true },
      ),
    [],
  )

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const searchText = event.target.value
    setSearchValue(searchText)
    debounceSearch(searchText)
  }

  return (
    <Toolbar
      sx={{
        background: theme.palette.common.white,
        borderTop: '1px solid lightgrey',
        display: 'flex',
        justifyContent: 'space-between',
        height: '72px',
      }}>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
        <Typography>{t('donations:all')}</Typography>
      </Box>
      <TextField
        label="Search"
        type="search"
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={handleSearch}
        sx={{ minWidth: 250 }}
      />
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* button is disabled because we have a bug(conflicting bank donations) https://github.com/podkrepi-bg/frontend/issues/1649 */}
          <Button disabled>
            <Tooltip title={t('donations:form-heading-bank-transactions-file') || ''}>
              <Receipt
                sx={addIconStyles}
                fontSize="large"
                onClick={() => router.push(routes.admin.donations.addBankTransactionsFile)}
              />
            </Tooltip>
          </Button>
          <Tooltip title={t('donations:cta:download') || ''}>
            <DownloadFileIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() => exportToExcel.mutate()}
            />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
}
