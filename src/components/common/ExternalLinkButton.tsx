import { Button, ButtonProps } from '@mui/material'
import { PropsWithChildren } from 'react'

export default function ExternalLinkButton({
  children,
  href,
  ...props
}: PropsWithChildren<ButtonProps<'a'> & { href: string }>) {
  return (
    <Button href={href} target="_blank" rel="noreferrer noopener" {...props}>
      {children}
    </Button>
  )
}
