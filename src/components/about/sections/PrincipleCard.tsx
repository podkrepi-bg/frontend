import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography, IconButton, Collapse, CardContent, CardHeader, Card } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SvgIcon from '@material-ui/icons/ExpandMore'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      padding: theme.spacing(0),
      transform: 'rotate(180deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    container: { backgroundColor: grey[50] },
    contentContainer: {
      padding: theme.spacing(0),
      '&:last-child': {
        paddingBottom: theme.spacing(0),
      },
    },
    cardHeaderAction: {
      margin: theme.spacing(0),
      alignSelf: 'center',
    },
    heading: { fontSize: theme.spacing(3.125), color: '#4AC3FF' },
    content: { fontSize: theme.spacing(2.5), marginBottom: theme.spacing(0) },
    cardHeader: { padding: theme.spacing(0) },
    expandOpen: {
      transform: 'rotate(0deg)',
    },
    cardHeaderTitleRoot: {
      flex: 0,
    },
    icon: {
      fontSize: theme.spacing(10),
    },
    expandIcon: {
      fontSize: theme.spacing(6),
      color: '#4AC3FF',
    },
  }),
)

type PrincipleCardProps = {
  Icon: typeof SvgIcon
  heading?: string
  content: string
}

export default function PrincipleCard({ Icon, heading, content }: PrincipleCardProps) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card elevation={0} className={classes.container}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<Icon className={classes.icon} />}
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon className={classes.expandIcon} />
          </IconButton>
        }
        title={
          <Typography variant="h6" className={classes.heading}>
            {heading}
          </Typography>
        }
        classes={{
          action: classes.cardHeaderAction,
          content: classes.cardHeaderTitleRoot,
        }}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.contentContainer}>
          <Typography variant="h2" paragraph className={classes.content}>
            {content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
