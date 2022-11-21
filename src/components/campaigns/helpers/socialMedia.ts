import React from 'react'
import { FacebookOutlined, LinkedIn, Twitter, WhatsApp } from '@mui/icons-material'

export type Social = {
  label: string
  icon: React.ElementType
  url?: string
}[]

export function socialMedia(url: string): Social {
  return [
    {
      label: 'Споделете във Facebook',
      icon: FacebookOutlined,
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      label: 'Споделете в Linkedin',
      icon: LinkedIn,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      label: 'Споделете в Whatsapp',
      icon: WhatsApp,
      url: `https://api.whatsapp.com/send/?text=${url}`,
    },
    {
      label: 'Споделете в Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${url}`,
    },
  ]
}
