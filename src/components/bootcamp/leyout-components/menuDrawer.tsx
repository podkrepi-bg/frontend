import { SvgIconProps } from '@mui/material'
import HighlightIcon from '@mui/icons-material/Highlight'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupAddIcon from '@mui/icons-material/GroupAdd'

const menuDrawer: {
  text: string
  icon: React.ReactElement<SvgIconProps>
  path: string
}[] = [
  {
    text: 'Кампании',
    icon: <HighlightIcon />,
    path: '#',
  },
  {
    text: 'Доброволци',
    icon: <InsertEmoticonIcon />,
    path: '#',
  },
  {
    text: 'Плащания',
    icon: <CreditCardIcon />,
    path: '#',
  },
  {
    text: 'Потребители',
    icon: <GroupAddIcon />,
    path: '#',
  },
  {
    text: 'Документи',
    icon: <TextFieldsIcon />,
    path: '#',
  },
  {
    text: 'Настройки',
    icon: <SettingsIcon />,
    path: '#',
  },
]

export { menuDrawer }
