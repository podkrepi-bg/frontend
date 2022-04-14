import React from 'react'

import clsx from 'clsx'
import makeStyles from '@mui/styles/makeStyles'

import { StepIconProps } from '@mui/material/StepIcon'

const useStepIconStyles = makeStyles({
  root: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '50%',
    border: '2px solid #03a9f4',
    color: '#000000',
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    width: 32,
    zIndex: 1,
    fontSize: '24px',
  },
  active: {
    backgroundColor: '#03a9f4',
    color: '#ffffff',
    height: 38,
    width: 38,
  },
  completed: {
    color: '#000000',
  },
})

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
