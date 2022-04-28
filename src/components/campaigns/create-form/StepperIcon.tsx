import React from 'react'

import clsx from 'clsx'
import makeStyles from '@mui/styles/makeStyles'

import { StepIconProps } from '@mui/material/StepIcon'
import createStyles from '@mui/styles/createStyles'
import { Theme } from '@mui/material'

const useStepIconStyles = makeStyles((theme: Theme) =>
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
  const classes = useStepIconStyles()
  const { active, completed } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <span>1</span>,
    2: <span>2</span>,
    3: <span>3</span>,
    4: <span>4</span>,
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
