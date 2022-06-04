import { SvgIconProps, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import BoyIcon from '@mui/icons-material/Boy'

export type WhatUnitesUsItem = {
  title: string
  content: string
  icon?: OverridableComponent<SvgIconTypeMap<Record<string, SvgIconProps>, 'svg'>>
  iconColor?: string
}

export const data: WhatUnitesUsItem[] = [
  {
    title: 'index:what-unites-us-section.volunteering-title',
    content: 'index:what-unites-us-section.volunteering-content',
    icon: FavoriteIcon,
    iconColor: '#F44336',
  },
  {
    title: 'index:what-unites-us-section.respect-title',
    content: 'index:what-unites-us-section.respect-content',
    icon: SentimentVerySatisfiedIcon,
    iconColor: '#FFB613',
  },
  {
    title: 'index:what-unites-us-section.productivity-title',
    content: 'index:what-unites-us-section.productivity-content',
    icon: BoyIcon,
    iconColor: '#4AC3FF',
  },
]
