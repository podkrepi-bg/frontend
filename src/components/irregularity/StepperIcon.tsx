import React from 'react'

import clsx from 'clsx'

import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { StepIconProps } from '@mui/material/StepIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: '50%',
      border: '3px solid',
      borderColor: theme.palette.info.light,
      color: '#000000',
      display: 'flex',
      width: 40,
      height: 40,
      justifyContent: 'center',
      zIndex: 1,
      fontSize: '28px',
    },
    active: {
      backgroundColor: theme.palette.info.light,
      color: '#ffffff',
      height: 42,
      width: 42,
    },
    completed: {
      color: '#000000',
    },
  }),
)

export default function StepIcon(props: StepIconProps) {
  const classes = useStyles()
  const { active, completed } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <span>1</span>,
    2: <span>2</span>,
    3: <span>3</span>,
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}>
      {icons[String(props.icon)]}
    </div>
  )
}
