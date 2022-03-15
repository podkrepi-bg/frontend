import { BottomNavigation, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

function BootcampFooter() {
  const { t } = useTranslation()

  return (
    <BottomNavigation
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '45px',
        background: '#294e85',
        display: 'flex',
        alignItems: 'center',
        paddingInline: 10,
        paddingLeft: '12rem',
      }}>
      <Typography variant="inherit">&copy; {t('bootcamp-footer')}</Typography>
    </BottomNavigation>
  )
}

export default BootcampFooter
