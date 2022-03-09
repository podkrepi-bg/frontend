import { Typography } from '@mui/material'
import { BottomNavigation } from '@mui/material'
import { useTranslation } from 'next-i18next'

export default function BootcampFooter() {
  const { t } = useTranslation()
  return (
    <BottomNavigation
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        heig: '45x',
        background: '#294e85',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        paddingInline: 10,
        paddingLeft: '12rem',
      }}>
      <Typography variant="inherit">&copy; {t('bootcamp:footer')}</Typography>
    </BottomNavigation>
  )
}
