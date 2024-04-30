import { Button, ButtonProps } from '@mui/material'
import Link, { LinkProps } from 'next/link'
import { forwardRef, Ref } from 'react'

export type LinkRef = HTMLButtonElement
export type NextLinkProps = ButtonProps &
  Pick<LinkProps, 'href' | 'as' | 'prefetch' | 'locale' | 'legacyBehavior'>

const LinkButton = (
  { href, as, prefetch, legacyBehavior, locale, disabled, ...props }: NextLinkProps,
  ref: Ref<LinkRef>,
) => (
  <Link
    href={href}
    as={as}
    prefetch={prefetch}
    locale={locale}
    passHref
    tabIndex={disabled ? -1 : 0}
    legacyBehavior={legacyBehavior}
    style={{ pointerEvents: disabled ? 'none' : 'all' }}>
    <Button ref={ref} tabIndex={-1} disabled={disabled} {...props} />
  </Link>
)

export default forwardRef(LinkButton)
