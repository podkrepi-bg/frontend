import { PropsWithChildren, useState } from 'react'

import { Typography as MaterialTypography, TypographyProps } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import LinkIcon from '@material-ui/icons/Link'

import LinkIconButton from 'components/common/LinkIconButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    linkIcon: {
      transform: 'rotate(-45deg)',
      color: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
    hideLinkIcon: {
      visibility: 'hidden',
    },
  }),
)

type TypographyParams = PropsWithChildren<TypographyProps> & {
  id?: string
  linkable?: boolean
  component?: string
}

export default function Typography({ children, id, linkable, ...props }: TypographyParams) {
  const [linkIconIsShown, setlinkIconIsShown] = useState(false)
  const classes = useStyles()

  return (
    <div
      id={id}
      onMouseEnter={() => setlinkIconIsShown(true)}
      onMouseLeave={() => setlinkIconIsShown(false)}>
      <MaterialTypography {...props}>
        {children}
        {linkable && (
          <LinkIconButton href={`#${id}`} className={linkIconIsShown ? '' : classes.hideLinkIcon}>
            <LinkIcon className={classes.linkIcon} />
          </LinkIconButton>
        )}
      </MaterialTypography>
    </div>
  )
}
