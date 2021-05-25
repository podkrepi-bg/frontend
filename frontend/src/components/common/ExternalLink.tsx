import { PropsWithChildren } from 'react'

type ExternalLinkParams = PropsWithChildren<
  Partial<Pick<HTMLAnchorElement, 'href' | 'className' | 'title'>>
>

export default function ExternalLink({ children, ...props }: ExternalLinkParams) {
  return (
    <a target="_blank" rel="noreferrer noopener" {...props}>
      {children}
    </a>
  )
}
