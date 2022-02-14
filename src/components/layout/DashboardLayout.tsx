import { useTranslation } from 'next-i18next'
import { makeStyles } from '@mui/styles'
import { observer } from 'mobx-react'

import Snackbar from 'components/layout/Snackbar'

import DashboardMiniDrawer from './DashboardMiniDrawer'
import { DrawerStore } from 'stores/DrawerStore'

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

export default observer(function DashboardLayout({ children }: Props) {
  const { t } = useTranslation()
  const { isFullClosed } = DrawerStore
  const classes = useStyles()

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentWrapper}>
        <DashboardMiniDrawer>{children}</DashboardMiniDrawer>
        <Snackbar />
        <footer className={classes.footer} style={{ zIndex: isFullClosed ? 1201 : 0 }}>
          <p style={{ width: '315px' }}>{t('components.footer.admin')}</p>
        </footer>
      </div>
    </div>
  )
})
