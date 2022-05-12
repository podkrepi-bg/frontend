import React from 'react'
import { styled } from '@mui/material/styles'
import { SvgIconProps, Typography } from '@mui/material'

const PREFIX = 'ActivityIcon'

const classes = {
  activity: `${PREFIX}-activity`,
  icon: `${PREFIX}-icon`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.activity}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.dark,
    '& > p': {
      fontSize: theme.typography.pxToRem(16),
      maxWidth: theme.spacing(20),
    },
    '& > span': {
      fontSize: theme.typography.pxToRem(64),
      fontWeight: 'bold',
    },
  },

  [`& .${classes.icon}`]: {
    fontSize: theme.typography.pxToRem(80),
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

type ActivityIconProps = {
  Icon: React.ComponentType<SvgIconProps>
  count?: string
  description: string
}
export default function ActivityIcon({ Icon, count, description, ...props }: ActivityIconProps) {
  return (
    <Root className={classes.activity}>
      <Icon {...props} className={classes.icon} />
      <Typography variant="h4" component="span">
        {count}
      </Typography>
      <Typography variant="body2" component="p">
        {description}
      </Typography>
    </Root>
  )
}
