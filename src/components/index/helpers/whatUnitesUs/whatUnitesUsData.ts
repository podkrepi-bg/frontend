import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import BoyIcon from '@mui/icons-material/Boy'

export type WhatUnitesUsItem = {
  title: string
  content: string
  icon?: OverridableComponent<SvgIconTypeMap<Record<string, never>, 'svg'>>
  iconColor?: string
}

export const data: WhatUnitesUsItem[] = [
  {
    title: 'Доброволно и про-боно',
    content:
      'Създадохме дарителска платформа в полза на нуждаещите се и организациите, които им помагат, без да търсим финансова или друга облага. Нашата награда е удовлетворението от приноса на Подкрепи.бг за отделните хора и обществото.',
    icon: FavoriteIcon,
    iconColor: '#F44336',
  },
  {
    title: 'Уважение',
    content:
      'Отнасяме се с уважение един към друг, както и с хората, с които се срещаме в работата си. Изслушваме, съдействаме, а мнението на всеки се взема предвид, защото има значение.',
    icon: SentimentVerySatisfiedIcon,
    iconColor: '#FFB613',
  },
  {
    title: 'Проактивност',
    content:
      'Всички доброволци отделят от собственото си свободно време, за да бъдат част от Подкрепи.бг. Те сами са инициирали включването си в Проекта.',
    icon: BoyIcon,
    iconColor: '#4AC3FF',
  },
]
