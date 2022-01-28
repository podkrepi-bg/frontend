import { makeStyles } from '@mui/styles'
import DashboardDrawer from './DashboardDrawer'

type Props = {
  children: React.ReactNode
  title: string
}

const useStyles = makeStyles(() => {
  return {
    footer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'lightblue',
      zIndex: 1201,
      padding: '16px',
      textAlign: 'center',
    },
  }
})

export default function DashboardLayout({ children, title }: Props) {
  const classes = useStyles()
  return (
    <>
      <DashboardDrawer title={title}>{children}</DashboardDrawer>
      <footer className={classes.footer}>This is footer &copy;</footer>
    </>
  )
}
