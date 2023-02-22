import React from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'

type Props = {
  onChange: (newValue: string) => void
}

// Note: Consider reworking the main rendering logic so we hide the categories from the Tabs list
// if there are no any matching results within (only when using the search functionality)
const FaqSearch = ({ onChange }: Props) => {
  const { t } = useTranslation('faq')

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        mb: 3,
      }}>
      <TextField
        id="faq--search-field"
        onChange={(event) => onChange(event.target.value)}
        placeholder={t('filters.searchKeyword.placeholder')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 2 / 3,
            md: 1 / 2,
          },
        }}
      />
    </Box>
  )
}

export default FaqSearch
