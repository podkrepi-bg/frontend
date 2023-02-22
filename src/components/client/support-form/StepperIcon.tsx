import React from 'react'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'

import GroupAddIcon from '@mui/icons-material/GroupAdd'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import { StepIconProps } from '@mui/material/StepIcon'
import { AccessibilityNew } from '@mui/icons-material'
import MailIcon from '@mui/icons-material/Mail'
import HelpIcon from '@mui/icons-material/Help'

const PREFIX = 'StepperIcon'

const classes = {
  root: `${PREFIX}-root`,
  active: `${PREFIX}-active`,
  completed: `${PREFIX}-completed`,
}

const Root = styled('div')({
  [`&.${classes.root}`]: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    width: 50,
    zIndex: 1,
  },

  [`&.${classes.active}`]: {
    backgroundImage: 'linear-gradient(136deg, #4AC3FF 0%, #29a2df 50%, #1b88be 100%)',
    boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
  },

  [`&.${classes.completed}`]: {
    backgroundImage: 'linear-gradient(136deg, #4AC3FF 0%, #29a2df 50%, #1b88be 100%)',
  },
})

export default function StepIcon(props: StepIconProps) {
  const { active, completed } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <GroupAddIcon />,
    2: <HelpIcon />,
    3: <ContactMailIcon />,
    4: <MailIcon />,
    5: <AccessibilityNew />,
  }

  return (
    <Root
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}>
      {icons[String(props.icon)]}
    </Root>
  )
}
