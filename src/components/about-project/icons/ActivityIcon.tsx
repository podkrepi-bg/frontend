import React from 'react'
import { createStyles, Grid, makeStyles, SvgIconProps, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    activity: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.dark,
      '& > p': {
        fontSize: theme.spacing(2),
        width: theme.spacing(17),
      },
      '& > span': {
        fontSize: theme.spacing(8),
        fontWeight: 'bold',
      },
    },
    icon: {
      fontSize: theme.spacing(10),
      padding: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  }),
)
type ActivityIconProps = {
  ComponentIcon: React.FC<SvgIconProps>
  label: string
  description: string
}
export default function ActivityIcon({
  ComponentIcon,
  label,
  description,
  ...props
}: ActivityIconProps) {
  const classes = useStyles()

  return (
    <div className={classes.activity}>
      <ComponentIcon {...props} className={classes.icon} />
      <Typography variant="h4" component="span">
        {label}
      </Typography>
      <Typography variant="body2" component="p">
        {description}
      </Typography>
    </div>
  )
}
