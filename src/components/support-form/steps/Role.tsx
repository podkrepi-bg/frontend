import React from 'react'
import { Box, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

import CheckboxField from 'components/common/form/CheckboxField'

interface RoleProps {
  name: string
  label: string
  description?: string
}

export default function Role({ name, label, description }: RoleProps) {
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center">
      <CheckboxField label={label} name={name} />
      {description && (
        <Tooltip title={description}>
          <InfoIcon color="primary" style={{ opacity: '0.45' }} />
        </Tooltip>
      )}
    </Box>
  )
}
