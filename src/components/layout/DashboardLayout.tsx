import { makeStyles } from '@mui/styles'

import Snackbar from 'components/layout/Snackbar'

import DashboardMiniDrawer from './DashboardMiniDrawer'

type Props = {
  children: React.ReactNode
  title: string
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
      textAlign: 'center',
      position: 'absolute',
      color: '#fff',
      bottom: 0,
      padding: '16px',
      width: '100%',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow:
        '0px 2px 4px -1px rgb(0 0 0 / 35%), 0px 4px 5px 0px rgb(0 0 0 / 74%), 0px 1px 10px 0px rgb(0 0 0 / 49%)',
    },
  }
})

export default function DashboardLayout({ children, title }: Props) {
  const classes = useStyles()
  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentWrapper}>
        <DashboardMiniDrawer title={title}>{children}</DashboardMiniDrawer>
        <Snackbar />
        <footer className={classes.footer}>
          <p>This is footer &copy;</p>
        </footer>
      </div>
    </div>
  )
}
