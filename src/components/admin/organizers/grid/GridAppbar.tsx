import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Add as AddIcon } from '@mui/icons-material'
import { Box, Toolbar, Tooltip, Typography } from '@mui/material'

import { routes } from 'common/routes'

const toolbarStyles = {
  background: 'white',
  borderTop: '1px solid lightgrey',
  display: 'flex',
  justifyContent: 'space-between',
  height: '72px',
}

const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}

export default function GridAppbar() {
  const router = useRouter()
  const { t } = useTranslation('organizer')

  return (
    <Toolbar sx={toolbarStyles}>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
        <Typography>{t('admin.headings.all')}</Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('admin.cta.add') || ''}>
            <AddIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() => {
                router.push(routes.admin.organizers.create)
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
}
