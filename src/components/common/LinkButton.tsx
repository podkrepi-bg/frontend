import React, { forwardRef, Ref } from 'react'
import Link, { LinkProps } from 'next/link'
import { Button, ButtonProps } from '@mui/material'

export type LinkRef = HTMLButtonElement
export type NextLinkProps = ButtonProps & Pick<LinkProps, 'href' | 'as' | 'prefetch' | 'locale'>

const LinkButton = ({ href, as, prefetch, locale, ...props }: NextLinkProps, ref: Ref<LinkRef>) => (
  <Link href={href} as={as} prefetch={prefetch} locale={locale} passHref>
    <Button ref={ref} {...props} />
  </Link>
)

export default forwardRef(LinkButton)
