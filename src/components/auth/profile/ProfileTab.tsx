import { ReactNode } from 'react'
import { Box } from '@mui/material'
import { ProfileTabs } from './tabs'
import { styled } from '@mui/material/styles'

const PREFIX = 'ProfileTab'

const classes = {
  boxContainer: `${PREFIX}-boxContainer`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.boxContainer}`]: {
    padding: theme.spacing(5, 7),
    marginTop: theme.spacing(0.5),
    backgroundColor: 'white ',
    boxShadow: theme.shadows[3],
    borderRadius: '0px 0px 25px 25px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 2),
    },
  },
}))

type Props = {
  name: ProfileTabs
  children: ReactNode
}

function ProfileTab({ children, name, ...other }: Props) {
  return (
    <Root role="tabpanel" id={`tabpanel-${name}`} aria-labelledby={`tab-${name}`} {...other}>
      <Box className={classes.boxContainer}>
        <Box>{children}</Box>
      </Box>
    </Root>
  )
}

export default ProfileTab
