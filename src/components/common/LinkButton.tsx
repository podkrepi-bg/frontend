import { Button, ButtonProps } from '@mui/material'
import NextLink, { LinkProps } from 'next/link'
import { forwardRef, Ref } from 'react'
import Link from '@mui/material/Link'

export type LinkRef = HTMLButtonElement
export type NextLinkProps = ButtonProps &
  Pick<LinkProps, 'href' | 'as' | 'prefetch' | 'locale' | 'legacyBehavior'>

const LinkButton = (
  { href, as, prefetch, legacyBehavior, locale, disabled, ...props }: NextLinkProps,
  ref: Ref<LinkRef>,
) => {
  return (
    <Button
      component={NextLink}
      href={href}
      as={as}
      prefetch={prefetch}
      locale={locale}
      tabIndex={-1}
      ref={ref}
      disableElevation={false}
      disabled={disabled}
      {...props}>
      {props.children}
    </Button>
  )
}

export default forwardRef(LinkButton)
