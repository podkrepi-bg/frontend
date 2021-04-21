import React from 'react'
import { createStyles, makeStyles, SvgIcon, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    activity: {
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
    icon: {
      fontSize: theme.typography.pxToRem(80),
      padding: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
)
type ActivityIconProps = {
  Icon: typeof SvgIcon
  count?: string
  description: string
}
export default function ActivityIcon({ Icon, count, description, ...props }: ActivityIconProps) {
  const classes = useStyles()

  return (
    <div className={classes.activity}>
      <Icon {...props} className={classes.icon} />
      <Typography variant="h4" component="span">
        {count}
      </Typography>
      <Typography variant="body2" component="p">
        {description}
      </Typography>
    </div>
  )
}
