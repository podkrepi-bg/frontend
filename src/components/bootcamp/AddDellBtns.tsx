import { Toolbar, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/system'
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { AlertStore } from 'stores/AlertStore'

type Props = {
  selectedIds: never[]
  openModal: () => void
}
const iconStyles = {
  background: 'white',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0.5,
  boxShadow: 3,
  mr: 1,
}

const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}

export default function AddDellBtns({ selectedIds, openModal }: Props) {
  const { t } = useTranslation()
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
        <Typography>{t('bootcamp:nav.all')}</Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Изтрий избраните">
            <DeleteIcon
              onClick={() =>
                selectedIds.length
                  ? openModal()
                  : AlertStore.show(t('bootcamp:alerts.delete-row.error-empty'), 'error')
              }
              sx={iconStyles}
              fontSize="medium"
              color="action"
            />
          </Tooltip>
          <Tooltip title="Добави">
            <AddIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() => {
                router.push('/bootcamp/add')
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
}
