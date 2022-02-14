import { useTranslation } from 'next-i18next'
import { makeStyles } from '@mui/styles'

import Snackbar from 'components/layout/Snackbar'

import DashboardMiniDrawer from './DashboardMiniDrawer'

type Props = {
  children: React.ReactNode
}

const useStyles = makeStyles(() => {
  return {
    pageContainer: {
      position: 'relative',
      minHeight: '100vh',
    },
    contentWrapper: {
      paddingBottom: '40px',
    },
    footer: {
      backgroundColor: '#294E85',
      position: 'absolute',
      color: '#fff',
      bottom: 0,
      padding: '16px 20px',
      width: '100%',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  }
})

export default function DashboardLayout({ children }: Props) {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentWrapper}>
        <DashboardMiniDrawer>{children}</DashboardMiniDrawer>
        <Snackbar />
        <footer className={classes.footer}>
          <p style={{ width: '315px' }}>{t('components.footer.admin')}</p>
        </footer>
      </div>
    </div>
  )
}
