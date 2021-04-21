import React from 'react'
import { Close } from '@material-ui/icons'
import { IconButton, IconButtonProps, SvgIconTypeMap } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'

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
  fontSize?: 'inherit' | 'default' | 'small' | 'large'
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
      <IconButton onClick={onClose} className={classes.closeButton} {...buttonProps}>
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
