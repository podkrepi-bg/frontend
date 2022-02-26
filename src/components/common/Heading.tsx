import { PropsWithChildren, useState } from 'react'

import { Theme, Typography, TypographyProps } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import LinkIcon from '@mui/icons-material/Link'

import LinkIconButton from 'components/common/LinkIconButton'

const useStyles = makeStyles((theme: Theme) =>
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

type Linkable =
  | {
      id: string
      linkable: true
    }
  | { linkable?: false }

type HeadingParams = PropsWithChildren<TypographyProps & Linkable> & {
  component?: React.ElementType
}

export default function Heading({ children, id, linkable, ...props }: HeadingParams) {
  const [linkIconIsShown, setlinkIconIsShown] = useState(false)
  const classes = useStyles()

  return (
    <div
      id={id}
      onMouseEnter={() => setlinkIconIsShown(true)}
      onMouseLeave={() => setlinkIconIsShown(false)}>
      <Typography {...props}>
        {children}
        {linkable && (
          <LinkIconButton href={`#${id}`} className={linkIconIsShown ? '' : classes.hideLinkIcon}>
            <LinkIcon className={classes.linkIcon} />
          </LinkIconButton>
        )}
      </Typography>
    </div>
  )
}
