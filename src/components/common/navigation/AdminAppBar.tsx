import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'components/common/Link'
import { styled, Theme } from '@mui/material/styles'
import PictureLogo from '/public/android-chrome-192x192.png'
import Image from 'next/image'
import { routes } from 'common/routes'
import React from 'react'

const drawerWidth = 200

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
  return (
    <AppBar position="fixed" open={isOpen} sx={{ p: 0, display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          width: 'calc(100% - 24px)',
          position: 'relative',
          paddingRight: '16px',
        }}>
        <Box
          sx={{
            width: drawerWidth,
            height: 64,
            position: 'absolute',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 19px 0 24px',
          }}>
          <Box sx={{ width: 150, display: 'flex' }}>
            <Link href={routes.admin.index}>
              {/* A11Y TODO: Translate alt text */}
              <Image alt="Bird with a shape of a hand" src={PictureLogo} width={40} height={40} />
            </Link>
          </Box>
        </Box>
        {children}
      </Box>
    </AppBar>
  )
}
