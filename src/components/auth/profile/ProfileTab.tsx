import { ReactNode } from 'react'
import { Box } from '@mui/material'

import { ProfileTabs } from './tabs'

type Props = {
  name: ProfileTabs
  title: string
  children: ReactNode
}

function ProfileTab({ children, name, title, ...other }: Props) {
  return (
    <div role="tabpanel" id={`tabpanel-${name}`} aria-labelledby={`tab-${name}`} {...other}>
      <Box
        sx={(theme) => ({
          backgroundColor: 'white',
          padding: theme.spacing(5, 4),
          marginTop: theme.spacing(2),
        })}>
        <Box
          component="h3"
          sx={{
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '25px',
            lineHeight: '116.7%',
            margin: '0',
          }}>
          {title}
        </Box>
        <Box>{children}</Box>
      </Box>
    </div>
  )
}

export default ProfileTab
