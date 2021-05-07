import React from 'react'
import { Box, Tooltip } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

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
      <Tooltip title={description?.toString() || ''}>
        <InfoIcon color="primary" style={{ opacity: '0.45' }} />
      </Tooltip>
    </Box>
  )
}
