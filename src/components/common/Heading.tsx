import { styled } from '@mui/material/styles'
import LinkIcon from '@mui/icons-material/Link'
import { PropsWithChildren, useState } from 'react'
import { Typography, TypographyProps } from '@mui/material'

import LinkIconButton from 'components/common/LinkIconButton'

const PREFIX = 'Heading'

const classes = {
  linkIcon: `${PREFIX}-linkIcon`,
  hideLinkIcon: `${PREFIX}-hideLinkIcon`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.linkIcon}`]: {
    transform: 'rotate(-45deg)',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },

  [`& .${classes.hideLinkIcon}`]: {
    visibility: 'hidden',
  },
}))

type HeadingParams = PropsWithChildren<TypographyProps> & {
  component?: React.ElementType
}

export default function Heading({ children, id, ...props }: HeadingParams) {
  return (
    <Root id={id}>
      <Typography {...props}>{children}</Typography>
    </Root>
  )
}
