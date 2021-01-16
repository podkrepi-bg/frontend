import React, { forwardRef, Ref } from 'react'
import Link, { LinkProps } from 'next/link'
import { Button, ButtonProps } from '@material-ui/core'

export type LinkRef = HTMLAnchorElement
export type NextLinkProps = Omit<ButtonProps, 'href'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch' | 'locale'>

const NextLink = ({ href, as, prefetch, locale, ...props }: LinkProps, ref: Ref<LinkRef>) => (
  <Link href={href} as={as} prefetch={prefetch} locale={locale} passHref>
    <Button buttonRef={ref} {...props} />
  </Link>
)

export default forwardRef<LinkRef, NextLinkProps>(NextLink)
