import { useRouter } from 'next/router'
import { Box, Toolbar, Tooltip, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import theme from 'common/theme'

const addIconStyles = {
  background: theme.palette.primary.light,
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}

export default function GridAppbar() {
  const { t } = useTranslation('coordinator')
  const router = useRouter()

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
        <Typography>{t('allCoordinators')}</Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('btns.add')}>
            <AddIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() => router.push(routes.admin.coordinators.add)}
            />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
}
