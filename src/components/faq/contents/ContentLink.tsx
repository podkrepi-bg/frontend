import { Link } from '@mui/material'
import React from 'react'

type Props = {
  href: string
  text: string
}

const ContentLink = ({ href, text }: Props) => {
  return (
    <Link target="_blank" href={href} underline="always">
      {text}
    </Link>
  )
}

export default ContentLink
