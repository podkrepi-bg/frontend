import { Button, ButtonProps } from '@mui/material'
import Link, { LinkProps } from 'next/link'
import { type CSSProperties, forwardRef, Ref } from 'react'

export type LinkRef = HTMLButtonElement
export type NextLinkProps = ButtonProps &
  Pick<LinkProps, 'href' | 'as' | 'prefetch' | 'locale' | 'legacyBehavior'>

const LinkButton = (
  { href, as, prefetch, legacyBehavior, locale, disabled, ...props }: NextLinkProps,
  ref: Ref<LinkRef>,
) => {
  const style = { pointerEvents: disabled ? 'none' : 'all' } as CSSProperties

  return (
    <Link
      href={href}
      as={as}
      prefetch={prefetch}
      locale={locale}
      passHref
      tabIndex={disabled ? -1 : 0}
      legacyBehavior={legacyBehavior}
      style={style}>
      <Button tabIndex={-1} ref={ref} disabled={disabled} {...props} />
    </Link>
  )
}
export default forwardRef(LinkButton)
