import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 20,
    textAlign: 'center',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    marginTop: 20,
  },
})

export default function DashboardFooter() {
  const classes = useStyles()
  const { t } = useTranslation('dashboard')

  return (
    <footer className={classes.footer}>
      <Typography variant="inherit">&copy; {t('footer')}</Typography>
    </footer>
  )
}
