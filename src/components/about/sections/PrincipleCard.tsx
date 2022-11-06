import React from 'react'
import { styled } from '@mui/material/styles'
import { Typography, CardContent, CardHeader, Card, SvgIconProps } from '@mui/material'

const PREFIX = 'PrincipleCard'

const classes = {
  contentContainer: `${PREFIX}-contentContainer`,
  heading: `${PREFIX}-heading`,
  cardHeader: `${PREFIX}-cardHeader`,
  cardHeaderAction: `${PREFIX}-cardHeaderAction`,
  cardHeaderTitleRoot: `${PREFIX}-cardHeaderTitleRoot`,
  icon: `${PREFIX}-icon`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`& .${classes.contentContainer}`]: {
    margin: theme.spacing(2, 0, 5, 0),
    '&:last-child': {
      paddingBottom: 0,
    },
  },

  [`& .${classes.heading}`]: {
    color: theme.palette.primary.main,
    display: 'block',
    fontSize: theme.typography.pxToRem(18),
  },

  [`& .${classes.cardHeader}`]: {
    padding: theme.spacing(0),
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'initial',
    },
  },

  [`& .${classes.cardHeaderAction}`]: {
    margin: theme.spacing(0),
    alignSelf: 'center',
  },

  [`& .${classes.cardHeaderTitleRoot}`]: {
    flexGrow: 1,
    flex: 0,
  },

  [`& .${classes.icon}`]: {
    fontSize: theme.spacing(5),
  },
}))

type PrincipleCardProps = {
  Icon: React.ComponentType<SvgIconProps>
  heading?: string
  content: string
}

export default function PrincipleCard({ Icon, heading, content }: PrincipleCardProps) {
  return (
    <StyledCard elevation={0}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<Icon className={classes.icon} />}
        title={
          <Typography variant="body2" component="div" className={classes.heading}>
            {heading}
          </Typography>
        }
        classes={{
          action: classes.cardHeaderAction,
          content: classes.cardHeaderTitleRoot,
        }}
      />
      <CardContent className={classes.contentContainer}>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </StyledCard>
  )
}
