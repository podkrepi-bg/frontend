import React from 'react'
import { Close } from '@mui/icons-material'
import { IconButton, IconButtonProps, SvgIconTypeMap } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { OverridableComponent } from '@mui/material/OverridableComponent'

import { routes } from 'common/routes'

import LinkIconButton from './LinkIconButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    closeButton: ({ edge }: Pick<CloseModalButtonProps, 'edge'>) => ({
      position: 'absolute',
      top: theme.spacing(1),
      left: edge === 'start' ? theme.spacing(1) : undefined,
      right: edge === 'end' ? theme.spacing(1) : undefined,
      zIndex: theme.zIndex.drawer,
    }),
  }),
)
export type CloseModalButtonProps = {
  href?: string
  onClose?: () => void
  edge?: 'start' | 'end'
  fontSize?: SvgIconTypeMap['props']['fontSize']
  Icon?: OverridableComponent<SvgIconTypeMap>
} & Omit<IconButtonProps, 'ref'>
export default function CloseModalButton({
  edge = 'end',
  fontSize = 'small',
  href = routes.index,
  Icon = Close,
  onClose,
  ...buttonProps
}: CloseModalButtonProps) {
  const classes = useStyles({ edge })
  if (typeof onClose === 'function') {
    return (
      <IconButton onClick={onClose} className={classes.closeButton} {...buttonProps} size="large">
        <Icon fontSize={fontSize} />
      </IconButton>
    )
  }
  return (
    <LinkIconButton href={href} className={classes.closeButton} {...buttonProps}>
      <Icon fontSize={fontSize} />
    </LinkIconButton>
  )
}
