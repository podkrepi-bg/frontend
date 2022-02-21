import {
  TaskAlt,
  AssignmentInd,
  People,
  ContactPhone,
  Payment,
  CoPresent,
  FolderShared,
} from '@mui/icons-material'
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded'
import { routes } from 'common/routes'

export const menuItems = [
  { label: 'Задачи', icon: TaskAlt, href: '#' },
  { label: 'Кампании', icon: AssignmentInd, href: '#' },
  { label: 'Доброволци', icon: People, href: routes.admin.supporters },
  { label: 'Контакти', icon: ContactPhone, href: routes.admin.infoRequests },
  { label: 'Плащания', icon: Payment, href: routes.admin.bankaccounts.index },
  { label: 'Потребители', icon: CoPresent, href: '#' },
  { label: 'Документи', icon: FolderShared, href: '#' },
  { label: 'Градове', icon: LocationCityRoundedIcon, href: routes.admin.cities.home },
]
