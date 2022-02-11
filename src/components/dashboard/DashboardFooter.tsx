import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    marginTop: 20,
    color: '#FFF',
    backgroundColor: '#294E85',
    padding: '8px 22px',
  },
})

export default function DashboardFooter() {
  const classes = useStyles()
  const { t } = useTranslation('dashboard')

  return (
    <footer className={classes.footer}>
      <Typography
        variant="inherit"
        sx={{
          fontFamily: 'Lato',
          fontSize: '16px',
        }}>
        {t('footer')}
      </Typography>
    </footer>
  )
}
