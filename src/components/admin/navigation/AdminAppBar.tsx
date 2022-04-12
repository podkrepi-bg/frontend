import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'components/common/Link'
import { styled, Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import PictureLogo from '/public/android-chrome-192x192.png'
import Image from 'next/image'
import { routes } from 'common/routes'
import React from 'react'

const drawerWidth = 200
const useStyles = makeStyles({
  drawerHeader: {
    width: drawerWidth,
    height: 64,
    position: 'absolute',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 19px 0 24px',
  },
  appbarWrapper: {
    display: 'flex',
    width: 'calc(100% - 24px)',
    position: 'relative',
    paddingRight: '16px',
  },
  logoWrapper: {
    width: 150,
    display: 'flex',
  },
})
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) => prop !== 'open',
})<AppBarProps>(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  background: 'none',
  boxShadow: 'none',
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
  height: '64px',
  width: '100%',
}))

type Props = {
  isOpen: boolean
  children?: React.ReactNode
}
export function AdminAppBar({ isOpen, children }: Props) {
  const classes = useStyles()

  return (
    <AppBar position="fixed" open={isOpen} sx={{ p: 0, display: 'flex' }}>
      <Box className={classes.appbarWrapper}>
        <Box className={classes.drawerHeader}>
          <Box className={classes.logoWrapper}>
            <Link href={routes.admin.index}>
              <a>
                <Image src={PictureLogo} width={40} height={40} />
              </a>
            </Link>
          </Box>
        </Box>
        {children}
      </Box>
    </AppBar>
  )
}
