import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { Receipt, GetApp as DownloadFileIcon, Close } from '@mui/icons-material'

import { routes } from 'common/routes'
import { useMutation } from '@tanstack/react-query'
import { useExportToExcel } from 'service/donation'
import { AlertStore } from 'stores/AlertStore'
import { downloadFile } from '../../../../common/util/downloadFile'
import { useMemo, useState } from 'react'
import { useStores } from 'common/hooks/useStores'
import theme from 'common/theme'
import debounce from 'lodash/debounce'

import { useCampaignList } from 'common/hooks/campaigns'
import AddIcon from '@mui/icons-material/Add'
import { ModalStore } from '../PaymentsPage'
import { observer } from 'mobx-react'

const addIconStyles = {
  background: theme.palette.primary.light,
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}

function GridAppbar() {
  const router = useRouter()
  const { donationStore } = useStores()
  const { t } = useTranslation()
  const exportToExcel = useMutation({
    mutationFn: useExportToExcel(donationStore.donationFilters, donationStore.donationSearch),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: ({ data }) => {
      downloadFile('Donations.xlsx', data)
      AlertStore.show(t('common:alerts.success'), 'success')
    },
  })
  const [searchValue, setSearchValue] = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState<string | undefined>('')
  const { data: campaigns } = useCampaignList()
  const { showImport } = ModalStore
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

  const handleCampaignFilter = (event: SelectChangeEvent) => {
    donationStore.setCampaignId(event.target.value)
    setSelectedCampaign(event.target.value)
  }
  const clearFilter = () => {
    donationStore.setCampaignId(undefined)
    setSelectedCampaign(undefined)
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
        <Typography>{t('donations:payments-all')}</Typography>
      </Box>

      <Box display={'flex'} gap={2}>
        <TextField
          label="Търсене по име/емайл"
          type="search"
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={handleSearch}
          sx={{ minWidth: 250 }}
        />
        <FormControl fullWidth size="small">
          <InputLabel id="select-campaign">Намиране по кампания</InputLabel>
          <Select
            label={'Намиране по кампания'}
            labelId={'select-campaign'}
            variant="outlined"
            startAdornment={
              selectedCampaign ? (
                <Close
                  sx={{ cursor: 'pointer', color: theme.palette.primary.dark }}
                  fontSize="small"
                  onClick={clearFilter}
                />
              ) : null
            }
            onChange={handleCampaignFilter}
            size="small"
            sx={{ minWidth: 250 }}
            value={selectedCampaign}>
            {campaigns?.map((campaign) => (
              <MenuItem key={campaign.id} value={campaign.id}>
                {campaign.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <IconButton onClick={() => showImport()}>
            <Tooltip title="Създаване на ново плащане">
              <AddIcon sx={addIconStyles} fontSize="large" />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={t('donations:cta:download') || ''}>
              <DownloadFileIcon
                sx={addIconStyles}
                fontSize="large"
                onClick={() => exportToExcel.mutate()}
              />
            </Tooltip>
          </IconButton>
          {/* button is disabled because we have a bug(conflicting bank donations) https://github.com/podkrepi-bg/frontend/issues/1649 */}
          <IconButton disabled>
            <Tooltip title={t('donations:form-heading-bank-transactions-file') || ''}>
              <Receipt
                sx={addIconStyles}
                fontSize="large"
                onClick={() => router.push(routes.admin.donations.addBankTransactionsFile)}
              />
            </Tooltip>
          </IconButton>
        </Box>
      </Box>
    </Toolbar>
  )
}

export default observer(GridAppbar)
