import { PropsWithChildren } from 'react'
import { Typography as MaterialTypography, TypographyProps } from '@material-ui/core'

import LinkIcon from '@material-ui/icons/Link'

type TypographyParams = PropsWithChildren<TypographyProps> & { id?: string; component?: string }

export default function Typography({ children, id, ...props }: TypographyParams) {
  return (
    <div id={id}>
      <MaterialTypography {...props}>
        {children}
        <LinkIcon />
      </MaterialTypography>
    </div>
  )
}
