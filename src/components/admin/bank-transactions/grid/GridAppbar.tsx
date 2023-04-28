import { useTranslation } from 'next-i18next'
import { Box, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { GetApp as DownloadFileIcon } from '@mui/icons-material'

import { useMutation } from '@tanstack/react-query'
import { useExportToExcel } from 'service/bankTransaction'
import { AlertStore } from 'stores/AlertStore'
import { downloadFile } from '../../../../common/util/downloadFile'
import { useMemo, useState } from 'react'
import { useStores } from 'common/hooks/useStores'
import { debounce } from 'lodash'

const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}

export default function GridAppbar() {
  const { bankTransactionsStore } = useStores()
  const { t } = useTranslation()
  const exportToExcel = useMutation({
    mutationFn: useExportToExcel(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: ({ data }) => {
      downloadFile('Bank-Transactions.xlsx', data)
      AlertStore.show(t('common:alerts.success'), 'success')
    },
  })
  const [searchValue, setSearchValue] = useState('')

  const debounceSearch = useMemo(
    () =>
      debounce(
        (text: string) => {
          bankTransactionsStore.setBankTransactionSearch(text)
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
        background: 'white',
        borderTop: '1px solid lightgrey',
        display: 'flex',
        justifyContent: 'space-between',
        height: '72px',
      }}>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
        <Typography>{t('bank-transactions:all')}</Typography>
      </Box>
      <TextField
        label="Search"
        type="search"
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={handleSearch}
        sx={{ minWidth: 250, marginRight: 20 }}
      />
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('bank-transactions:cta:download') || ''}>
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
