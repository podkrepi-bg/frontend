import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Box, Toolbar, Tooltip, Typography } from '@mui/material'
import { Add as AddIcon, Receipt, GetApp as DownloadFileIcon } from '@mui/icons-material'

import { routes } from 'common/routes'
import { useMutation } from '@tanstack/react-query'
import { useExportToExcel } from 'service/donation'
import { AlertStore } from 'stores/AlertStore'
import { downloadFile } from './../../../common/util/downloadFile'

const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}

export default function GridAppbar() {
  const router = useRouter()
  const { t } = useTranslation()
  const exportToExcel = useMutation({
    mutationFn: useExportToExcel(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: ({ data }) => {
      downloadFile('Donations.xlsx', data)
      AlertStore.show(t('common:alerts.success'), 'success')
    },
  })

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
        <Typography>{t('donations:all')}</Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('donations:form-heading-bank-transactions-file') || ''}>
            <Receipt
              sx={addIconStyles}
              fontSize="large"
              onClick={() => router.push(routes.admin.donations.addBankTransactionsFile)}
            />
          </Tooltip>
          <Tooltip title={t('donations:cta:add') || ''}>
            <AddIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() => router.push(routes.admin.donations.create)}
            />
          </Tooltip>
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
