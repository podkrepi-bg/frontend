import { useTranslation } from 'next-i18next'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function DashboardSearchField() {
  const { t } = useTranslation('dashboard')

  return (
    <TextField
      fullWidth
      label={t('appbar.search')}
      size="small"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        width: '340px',
        marginRight: 'auto',
      }}
    />
  )
}
