import { useTranslation } from 'next-i18next'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Close } from '@mui/icons-material'

type Options = {
  name: string
  label: string
}

interface DropdownFilterProps {
  options: Options
  value: string
  onChange: (filterName: string, filterValue: string) => void
  menuItems: string[]
}

export default function DropdownFilter(props: DropdownFilterProps) {
  const { t } = useTranslation()
  const {
    options: { name, label },
    value,
    onChange,
    menuItems,
  } = props

  const handleChange = (e: SelectChangeEvent) => {
    e.stopPropagation()
    const filterName = e.target.name as string
    const filterValue = e.target.value as string
    onChange(filterName, filterValue)
  }

  const handleClear = (event: React.MouseEvent, filterName: string, filterValue: string) => {
    event.stopPropagation()
    onChange(filterName, filterValue)
  }

  const selectElementStyle = {
    minWidth: 115,
    marginRight: 1,
    marginLeft: 1,
  }

  const closeIconStyle = {
    color: '#365b99',
    cursor: 'pointer',
  }

  return (
    <FormControl style={selectElementStyle}>
      <InputLabel size="small">{t(label)}</InputLabel>
      <Select
        startAdornment={
          value ? (
            <Close
              fontSize="small"
              style={closeIconStyle}
              onClick={(e) => handleClear(e, name, '')}
            />
          ) : null
        }
        name={name}
        value={value}
        label={t(label)}
        size="small"
        onChange={(e) => handleChange(e)}>
        {menuItems.map((key) => {
          return (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
